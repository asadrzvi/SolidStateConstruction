import React, { useState } from 'react'
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
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('thank-you')) {
        setCurrentPage('thank-you');
      } else if (hash.includes('gallery')) {
        setCurrentPage('gallery');
      } else if (hash.includes('home') || hash === '' || hash === '#') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleInquirySubmitted = (service, name) => {
    setSubmittedService(service || '');
    setSubmittedName(name || '');
    setIsQuoteModalOpen(false);
    setCurrentPage('thank-you');
    window.location.hash = '#/thank-you';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 'thank-you') {
      window.location.hash = '#/thank-you';
    } else if (page === 'gallery') {
      window.location.hash = '#/gallery';
    } else {
      if (window.location.hash.includes('thank-you') || window.location.hash.includes('gallery')) {
        window.location.hash = '#/';
      }
    }
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
