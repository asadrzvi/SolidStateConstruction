import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'

// Build-time only. prerender.mjs calls this once per route and bakes the result
// into the shipped HTML, so Googlebot receives real body copy on the first fetch
// instead of an empty <div id="root">. Nothing here runs in the browser.
//
// Every browser API in this app sits inside useEffect (which renderToString
// never runs), and IntroOverlay guards on `typeof window === 'undefined'`, so
// the tree renders cleanly with no DOM present.
export function render(initialPage) {
  return renderToString(
    <LanguageProvider>
      <App initialPage={initialPage} />
    </LanguageProvider>
  )
}
