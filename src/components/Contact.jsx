import React, { useState, useEffect } from 'react'
import './Contact.css'

function Contact({ initialService, initialMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Concrete & Foundation',
    message: ''
  })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (initialService) {
      // Map service name to standard options if needed
      const standardServices = ["Concrete & Foundation", "Plumbing Services", "Excavation Services"];
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

    // We use Web3Forms to email the submission directly to the site owner.
    // Replace 'YOUR_ACCESS_KEY_HERE' with your Web3Forms Access Key.
    // Get a free key instantly by entering your email at: https://web3forms.com
    const accessKey = "YOUR_ACCESS_KEY_HERE"; 

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        subject: `New Lead: ${formData.service} from Shaans Website`
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', service: 'Water Remediation', message: '' });
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
              <div className="form-group full-width">
                <label>Service Needed</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option>Concrete & Foundation</option>
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
        </div>
      </div>
    </section>
  )
}

export default Contact
