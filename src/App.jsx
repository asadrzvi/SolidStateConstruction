import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'

function App() {
  const [selectedService, setSelectedService] = useState('')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

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
      <Contact initialService={selectedService} />
      <Footer />
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  )
}

export default App
