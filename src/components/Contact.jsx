import React, { useState, useEffect } from 'react'
import './Contact.css'

// CONFIGURATION FOR LEAD EMAILS:
// 1. Go to https://web3forms.com
// 2. Enter your business email: info@solidstatesconstruction.com
// 3. You will immediately receive a free Access Key in your inbox.
// 4. Paste that Access Key in the variable below:
const WEB3FORMS_ACCESS_KEY = "700a045a-9c7d-409d-ba90-8133f2c3b3a1";

function Contact({ initialService, initialMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: 'Concrete & Foundation',
    message: ''
  })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (initialService) {
      // Map service name to standard options if needed
      const standardServices = ["Water Remediation", "Concrete & Foundation", "Roofing Services", "Plumbing Services", "Excavation Services"];
      if (standardServices.includes(initialService)) {
        setFormData(prev => ({ ...prev, service: initialService }));
      }
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        service: formData.service,
        message: formData.message,
        subject: `New Lead: ${formData.service} from Shaans Website`
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', address: '', service: 'Concrete & Foundation', message: '' });
      } else {
        setStatus('error');
      }
    })
    .catch(() => {
      setStatus('error');
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Get a Free Estimate</h2>
        <p className="section-subtitle">Ready to start your project? Fill out the form below and our team will get back to you within 24 hours.</p>
        <div className="contact-card">
          {status === 'success' ? (
            <div className="success-message">
              <h3>Thank You!</h3>
              <p>Your request has been sent. Our team will contact you shortly.</p>
              <button className="btn btn-primary" onClick={() => setStatus('')}>Send Another Request</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(512) 000-0000" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, Austin, TX" 
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Service Needed</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option>Water Remediation</option>
                  <option>Concrete & Foundation</option>
                  <option>Roofing Services</option>
                  <option>Plumbing Services</option>
                  <option>Excavation Services</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or emergency..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Submit Request'}
              </button>
              {status === 'error' && <p className="error-text">Something went wrong. Please call us directly.</p>}
            </form>
          )}

          {status !== 'success' && (
            <>
              <div className="scheduler-separator">
                <span>OR</span>
              </div>
              <div className="scheduler-cta">
                <p>Prefer to pick your own time? Skip the form and book a walkthrough instantly.</p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Book Walkthrough Inspection
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
