import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Contact from './components/Contact'
import MapSection from './components/MapSection'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'

function App() {
  const [selectedService, setSelectedService] = useState('')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [prefilledMessage, setPrefilledMessage] = useState('')

  return (
    <div className="app">
      <Navbar onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <Hero onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <About />
      <Gallery />
      <Testimonials />
      <Services 
        onServiceSelect={setSelectedService} 
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />
      <Contact initialService={selectedService} initialMessage={prefilledMessage} />
      {/* MapSection moved to the end per user request */}
      <MapSection />
      <Footer />
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        initialService={selectedService}
        onDetailedEstimate={(service, message) => {
          setSelectedService(service);
          setPrefilledMessage(message);
          setIsQuoteModalOpen(false);
          // Scroll to contact form
          setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
      />
    </div>
  )
}

export default App
