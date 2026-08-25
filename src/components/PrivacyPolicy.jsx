import React, { useEffect } from 'react'
import './PrivacyPolicy.css'

function PrivacyPolicy({ onReturnHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="privacy-page">
      <div className="container privacy-container">
        <h1>Privacy Policy</h1>
        <p className="privacy-updated">Last updated: August 25, 2026</p>

        <p>
          Solid State Construction ("we," "us," or "our") operates
          solidstatesconstruction.com. This page explains what information we
          collect through this website, how we use it, and who we share it
          with.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you submit our contact form, request a quote, or use our
          project estimate calculator, we collect the information you enter,
          which may include your name, phone number, email address, project
          address, the service you're interested in, and any project details
          or notes you provide. We do not collect payment information through
          this site.
        </p>

        <h2>How Form Submissions Are Handled</h2>
        <p>
          Contact and quote form submissions are processed by{' '}
          <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer">
            Web3Forms
          </a>
          , a third-party form-delivery service, and are then delivered by
          email to Solid State Construction. We use this information only to
          respond to your inquiry, provide estimates, and schedule requested
          work. We do not sell your information to third parties.
        </p>
        <p>
          If you use our scheduling link to book a call, you'll be taken to{' '}
          <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
            Calendly
          </a>
          , a third-party scheduling service, which processes the
          information you provide there under its own privacy policy.
        </p>

        <h2>Analytics &amp; Advertising Cookies</h2>
        <p>
          This site uses Google Analytics (GA4) and Google Ads conversion
          tracking (via Google's gtag.js) to understand how visitors use the
          site and to measure the effectiveness of our advertising. These
          services use cookies and similar technologies to collect
          information such as pages visited, general location, device type,
          and whether a form was submitted. This data is aggregated and used
          for analytics and ad performance measurement — it is not used to
          personally identify you outside of these platforms. You can opt out
          of Google Analytics tracking using Google's{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            browser opt-out tool
          </a>
          , or block cookies entirely in your browser settings.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain contact and quote form submissions for as long as needed
          to respond to your request and for our business records, and
          delete them upon request.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may ask us to access, correct, or delete the personal
          information we hold about you by contacting us using the details
          below. You can also decline to submit a form and instead contact us
          directly by phone.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          This site is intended for adults seeking construction, plumbing,
          roofing, or related services and is not directed at children under
          13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be
          posted on this page with an updated "Last updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>
          Solid State Construction
          <br />
          1101 Halsey Drive, Leander, TX 78641
          <br />
          Phone: <a href="tel:512-595-2332">(512) 595-2332</a>
          <br />
          Email:{' '}
          <a href="mailto:contact@solidstatesconstruction.com">
            contact@solidstatesconstruction.com
          </a>
        </p>

        {onReturnHome && (
          <button className="btn btn-primary privacy-back-btn" onClick={onReturnHome}>
            Return to Home Page
          </button>
        )}
      </div>
    </div>
  )
}

export default PrivacyPolicy
