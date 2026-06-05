import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [selectedService, setSelectedService] = useState('')

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Services onServiceSelect={setSelectedService} />
      <Contact initialService={selectedService} />
      <Footer />
    </div>
  )
}

export default App
