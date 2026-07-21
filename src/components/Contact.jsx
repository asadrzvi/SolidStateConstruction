import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

const WEB3FORMS_ACCESS_KEY = "700a045a-9c7d-409d-ba90-8133f2c3b3a1";

function Contact({ initialService, initialMessage }) {
  const { t } = useLanguage();
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
      const standardServices = [
        "Water Remediation", "Concrete & Foundation", "Roofing Services", "Plumbing Services", "Excavation Services",
        "Residential Water Mitigation", "Home Plumbing Services", "Residential Roofing", "Driveways & Patios",
        "Commercial Water Restoration", "Commercial Concrete & Foundations", "Commercial Roofing", "Site Prep & Heavy Excavation"
      ];
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
        <h2 className="section-title">{t('contactTitle')}</h2>
        <p className="section-subtitle">{t('contactSubtitle')}</p>
        <div className="contact-card">
          {status === 'success' ? (
            <div className="success-message">
              <h3>{t('formSuccessTitle')}</h3>
              <p>{t('formSuccessMsg')}</p>
              <button className="btn btn-primary" onClick={() => setStatus('')}>{t('formSuccessBtn')}</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t('formName')}</label>
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
                <label>{t('formPhone')}</label>
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
                <label>{t('formEmail')}</label>
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
                <label>{t('formAddress')}</label>
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
                <label>{t('formService')}</label>
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
                <label>{t('formMsg')}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('formMsgPlaceholder')}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? t('formSending') : t('formSubmit')}
              </button>
              {status === 'error' && <p className="error-text">{t('formError')}</p>}
            </form>
          )}

          {status !== 'success' && (
            <>
              <div className="scheduler-separator">
                <span>{t('schedSeparator')}</span>
              </div>
              <div className="scheduler-cta">
                <p>{t('schedCtaText')}</p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  {t('schedCtaBtn')}
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
