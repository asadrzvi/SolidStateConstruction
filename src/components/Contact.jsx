import React, { useState, useEffect } from 'react'
import './Contact.css'

function Contact({ initialService }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Water Remediation',
    message: ''
  })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // GOOGLE FORMS INTEGRATION INSTRUCTIONS:
    // 1. Create a Google Form with fields: Name, Phone, Service, Message.
    // 2. Get the form's "Pre-filled link" to find the entry IDs.
    // 3. Replace the URL and entry IDs below.
    
    const googleFormUrl = "YOUR_GOOGLE_FORM_POST_URL"; // Ends in /formResponse
    
    const formDataBody = new FormData();
    formDataBody.append("entry.XXXXXX", formData.name);    // Replace with Name ID
    formDataBody.append("entry.XXXXXX", formData.phone);   // Replace with Phone ID
    formDataBody.append("entry.XXXXXX", formData.service); // Replace with Service ID
    formDataBody.append("entry.XXXXXX", formData.message); // Replace with Message ID

    fetch(googleFormUrl, {
      method: "POST",
      mode: "no-cors",
      body: formDataBody
    }).then(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', service: 'Water Remediation', message: '' });
    }).catch(() => {
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
        </div>
      </div>
    </section>
  )
}

export default Contact
