import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GalleryPage from './components/GalleryPage'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import ProcessTimeline from './components/ProcessTimeline'
import ServiceAreas from './components/ServiceAreas'
import FAQSection from './components/FAQSection'
import Contact from './components/Contact'
import MapSection from './components/MapSection'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import ThankYouPage from './components/ThankYouPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedService, setSelectedService] = useState('')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [prefilledMessage, setPrefilledMessage] = useState('')
  const [submittedService, setSubmittedService] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('thank-you') || hash.includes('thank-you')) {
        setCurrentPage('thank-you');
      } else if (path.includes('gallery') || hash.includes('gallery')) {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  useEffect(() => {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    let ogUrlMeta = document.querySelector('meta[property="og:url"]');
    let twitterUrlMeta = document.querySelector('meta[property="twitter:url"]');

    if (currentPage === 'gallery') {
      const galleryUrl = 'https://solidstatesconstruction.com/gallery';
      canonicalLink.setAttribute('href', galleryUrl);
      if (ogUrlMeta) ogUrlMeta.setAttribute('content', galleryUrl);
      if (twitterUrlMeta) twitterUrlMeta.setAttribute('content', galleryUrl);
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      document.title = 'Project Gallery | Solid State Construction - Leander & Austin TX';
    } else if (currentPage === 'thank-you') {
      const thankYouUrl = 'https://solidstatesconstruction.com/thank-you';
      canonicalLink.setAttribute('href', thankYouUrl);
      robotsMeta.setAttribute('content', 'noindex, follow');
      document.title = 'Thank You | Solid State Construction';
    } else {
      const homeUrl = 'https://solidstatesconstruction.com/';
      canonicalLink.setAttribute('href', homeUrl);
      if (ogUrlMeta) ogUrlMeta.setAttribute('content', homeUrl);
      if (twitterUrlMeta) twitterUrlMeta.setAttribute('content', homeUrl);
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      document.title = 'Solid State Construction | #1 General Contractor, Plumber & Ready Mix Concrete in Leander & Austin TX';
    }
  }, [currentPage]);

  const handleInquirySubmitted = (service, name) => {
    setSubmittedService(service || '');
    setSubmittedName(name || '');
    setIsQuoteModalOpen(false);
    setCurrentPage('thank-you');
    
    // Trigger Google Ads Conversion Event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18245643754'
      });
    }

    try {
      window.history.pushState({}, '', '/thank-you');
    } catch (e) {
      window.location.hash = '#/thank-you';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    try {
      if (page === 'thank-you') {
        window.history.pushState({}, '', '/thank-you');
      } else if (page === 'gallery') {
        window.history.pushState({}, '', '/gallery');
      } else {
        window.history.pushState({}, '', '/');
      }
    } catch (e) {
      window.location.hash = page === 'home' ? '#/' : `#/${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar 
        onOpenQuote={() => setIsQuoteModalOpen(true)} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      {currentPage === 'home' ? (
        <>
          <Hero onOpenQuote={() => setIsQuoteModalOpen(true)} />
          <About />
          <Services 
            onServiceSelect={setSelectedService} 
            onPrefillMessage={setPrefilledMessage}
            onOpenQuote={() => setIsQuoteModalOpen(true)}
          />
          <ProcessTimeline />
          <ServiceAreas />
          <Testimonials />
          <FAQSection />
          <Contact 
            initialService={selectedService} 
            initialMessage={prefilledMessage} 
            onInquirySubmitted={handleInquirySubmitted}
          />
          {/* MapSection moved to the end per user request */}
          <MapSection />
        </>
      ) : currentPage === 'gallery' ? (
        <GalleryPage />
      ) : (
        <ThankYouPage 
          submittedService={submittedService}
          submittedName={submittedName}
          onReturnHome={() => handlePageChange('home')}
          onGoGallery={() => handlePageChange('gallery')}
        />
      )}
      
      <Footer />
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        initialService={selectedService}
        onInquirySubmitted={handleInquirySubmitted}
        onDetailedEstimate={(service, message) => {
          setSelectedService(service);
          setPrefilledMessage(message);
          setIsQuoteModalOpen(false);
          setCurrentPage('home');
          // Scroll to contact form
          setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }}
      />
    </div>
  )
}

export default App
