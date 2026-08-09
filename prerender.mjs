/**
 * Build-time prerenderer.
 *
 * WHY THIS EXISTS
 * ---------------
 * This site shipped as a pure client-rendered SPA on GitHub Pages, so the HTML
 * Googlebot fetched contained exactly one piece of content: the <title>. The
 * body was `<div id="root"></div>`. Google defers JS rendering to a separate,
 * resource-rationed pass, so the page's actual copy was never reliably indexed.
 * That is an indexation failure, not a ranking one - no amount of on-page
 * tuning matters while the crawler sees an empty div.
 *
 * This script renders each route to static HTML at build time and bakes it into
 * the shipped files. React still boots normally on top; the prerendered markup
 * is purely what the crawler (and the user's first paint) gets.
 *
 * It also writes the per-route <head> tags. App.jsx sets title/canonical inside
 * a useEffect, which is client-only - so before this script, /gallery/ shipped
 * with the homepage's canonical baked in, actively telling Google the two pages
 * were the same. Now each file ships correct from the first byte.
 *
 * Runs from `postbuild`, after Vite has written dist/ and the route copies.
 */
import { build } from 'vite'
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const SSR_OUT = resolve(ROOT, '.ssr-build')
const ORIGIN = 'https://solidstatesconstruction.com'

const INDEXABLE = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

// One entry per HTML file the build emits. `page` is what App.jsx switches on.
const ROUTES = [
  {
    page: 'home',
    file: 'dist/index.html',
    canonical: `${ORIGIN}/`,
    title: 'Plumber & Foundation Repair in Leander & Austin TX | Solid State Construction',
    robots: INDEXABLE,
  },
  {
    page: 'gallery',
    file: 'dist/gallery/index.html',
    canonical: `${ORIGIN}/gallery/`,
    title: 'Project Gallery | Solid State Construction - Leander & Austin TX',
    robots: INDEXABLE,
  },
  {
    page: 'thank-you',
    file: 'dist/thank-you/index.html',
    canonical: `${ORIGIN}/thank-you`,
    title: 'Thank You | Solid State Construction',
    robots: 'noindex, follow',
  },
  // GitHub Pages serves 404.html for unmatched paths with a 404 status, so it is
  // never indexed. It still needs the home markup to work as the SPA fallback.
  {
    page: 'home',
    file: 'dist/404.html',
    canonical: `${ORIGIN}/`,
    title: 'Plumber & Foundation Repair in Leander & Austin TX | Solid State Construction',
    robots: 'noindex, follow',
  },
]

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replace an attribute value on a tag matched by `match`, if the tag exists. */
function setAttr(html, match, attr, value) {
  const re = new RegExp(`(${match}[^>]*${attr}=")[^"]*(")`)
  return re.test(html) ? html.replace(re, `$1${escapeHtml(value)}$2`) : html
}

async function main() {
  // 1. Bundle the app for Node. Vite reads vite.config.js, so the React and
  //    Tailwind plugins apply and CSS imports resolve without blowing up.
  await build({
    build: { ssr: 'src/entry-server.jsx', outDir: '.ssr-build', emptyOutDir: true },
    logLevel: 'warn',
  })

  const entry = resolve(SSR_OUT, 'entry-server.js')
  if (!existsSync(entry)) throw new Error(`SSR bundle missing at ${entry}`)
  const { render } = await import(pathToFileURL(entry).href)

  // 2. Render each route and bake it in.
  for (const route of ROUTES) {
    const file = resolve(ROOT, route.file)
    if (!existsSync(file)) {
      console.warn(`  ! skipped ${route.file} (not emitted by the build)`)
      continue
    }

    const markup = render(route.page)
    if (!markup || markup.length < 500) {
      throw new Error(`Prerender of "${route.page}" produced ${markup.length} chars - refusing to ship an empty page.`)
    }

    let html = readFileSync(file, 'utf8')
    if (!html.includes('<div id="root"></div>')) {
      throw new Error(`${route.file} has no empty #root to fill - did the build output change?`)
    }

    html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    html = setAttr(html, '<meta name="title"', 'content', route.title)
    html = setAttr(html, '<meta name="robots"', 'content', route.robots)
    html = setAttr(html, '<link rel="canonical"', 'href', route.canonical)
    html = setAttr(html, '<meta property="og:url"', 'content', route.canonical)
    html = setAttr(html, '<meta property="twitter:url"', 'content', route.canonical)

    writeFileSync(file, html)
    console.log(`  ✓ ${route.file.padEnd(28)} ${(markup.length / 1024).toFixed(1)} KB of crawlable HTML`)
  }

  rmSync(SSR_OUT, { recursive: true, force: true })
}

main().catch((err) => {
  console.error('\nPrerender failed:', err.message)
  process.exit(1) // fail the build rather than silently shipping empty pages
})
