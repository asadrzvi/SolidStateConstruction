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

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedService, setSelectedService] = useState('')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [prefilledMessage, setPrefilledMessage] = useState('')

  return (
    <div className="app">
      <Navbar 
        onOpenQuote={() => setIsQuoteModalOpen(true)} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
          <Contact initialService={selectedService} initialMessage={prefilledMessage} />
          {/* MapSection moved to the end per user request */}
          <MapSection />
        </>
      ) : (
        <GalleryPage />
      )}
      
      <Footer />
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        initialService={selectedService}
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
