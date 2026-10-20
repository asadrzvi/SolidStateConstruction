import React, { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import './Contact.css'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "700a045a-9c7d-409d-ba90-8133f2c3b3a1";

const STANDARD_SERVICES = [
  "Water Remediation", "Concrete & Foundation", "Roofing Services", "Plumbing Services", "Excavation Services",
  "Residential Water Mitigation", "Home Plumbing Services", "Residential Roofing", "Driveways & Patios",
  "Commercial Water Restoration", "Commercial Concrete & Foundations", "Commercial Roofing", "Site Prep & Heavy Excavation"
];

function Contact({ initialService, initialMessage, onInquirySubmitted }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: 'Concrete & Foundation',
    message: '',
    botcheck: '' // Honeypot anti-spam field
  })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (initialService && STANDARD_SERVICES.includes(initialService)) {
      setFormData(prev => ({ ...prev, service: initialService }));
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

    // Honeypot check: if a bot filled the hidden field, pretend it worked.
    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    setStatus('sending');

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        service: formData.service,
        message: formData.message.trim(),
        subject: `New Lead: ${formData.service} from Shaans Website`
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        if (onInquirySubmitted) {
          onInquirySubmitted(formData.service, formData.name);
        }
        setFormData({ name: '', phone: '', email: '', address: '', service: 'Concrete & Foundation', message: '', botcheck: '' });
      } else {
        setStatus('error');
      }
    })
    .catch(() => {
      setStatus('error');
    });
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <Reveal>
            <p className="eyebrow">{t('contactEyebrow')}</p>
            <h2 id="contact-title">{t('contactTitle')}</h2>
            <p className="lede">{t('contactSubtitle')}</p>
          </Reveal>

          <Reveal as="dl" className="contact-details" delay={80}>
            <div className="contact-detail">
              <dt><Phone size={18} strokeWidth={1.75} />{t('contactPhoneLabel')}</dt>
              <dd><a href="tel:512-595-2332" className="contact-phone num">(512) 595-2332</a></dd>
            </div>
            <div className="contact-detail">
              <dt><Mail size={18} strokeWidth={1.75} />{t('contactEmailLabel')}</dt>
              <dd><a href="mailto:contact@solidstatesconstruction.com">contact@solidstatesconstruction.com</a></dd>
            </div>
            <div className="contact-detail">
              <dt><MapPin size={18} strokeWidth={1.75} />{t('contactAddressLabel')}</dt>
              <dd>1101 Halsey Drive, Leander, TX 78641</dd>
            </div>
            <div className="contact-detail">
              <dt><Clock size={18} strokeWidth={1.75} />{t('contactHoursLabel')}</dt>
              <dd>{t('contactHours')}</dd>
            </div>
          </Reveal>

          <Reveal className="contact-sched" delay={120}>
            <span>{t('schedCtaText')}</span>
            <a href="https://calendly.com/solidstatesconstruction-info" target="_blank" rel="noopener noreferrer" className="link-arrow">
              {t('schedCtaBtn')}
              <ArrowUpRight size={18} strokeWidth={1.75} />
            </a>
          </Reveal>
        </div>

        <Reveal className="contact-card" delay={100}>
          {status === 'success' ? (
            <div className="contact-success" role="status">
              <h3>{t('formSuccessTitle')}</h3>
              <p>{t('formSuccessMsg')}</p>
              <button type="button" className="btn btn-outline" onClick={() => setStatus('')}>{t('formSuccessBtn')}</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
              {/* Honeypot field for anti-spam. Must stay a checkbox named botcheck. */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
                onChange={(e) => setFormData(prev => ({ ...prev, botcheck: e.target.checked }))}
              />
              <div className="field">
                <label htmlFor="c-name">{t('formName')}</label>
                <input
                  id="c-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('formNamePh')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">{t('formPhone')}</label>
                <input
                  id="c-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('formPhonePh')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-email">{t('formEmail')}</label>
                <input
                  id="c-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('formEmailPh')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-address">{t('formAddress')}</label>
                <input
                  id="c-address"
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t('formAddressPh')}
                  required
                />
              </div>
              <div className="field full-width">
                <label htmlFor="c-service">{t('formService')}</label>
                <select
                  id="c-service"
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
              <div className="field full-width">
                <label htmlFor="c-message">{t('formMsg')}</label>
                <textarea
                  id="c-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('formMsgPlaceholder')}
                  required
                ></textarea>
              </div>
              <div className="contact-actions full-width">
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                  {status === 'sending' ? t('formSending') : t('formSubmit')}
                </button>
                <span className="contact-privacy">{t('formPrivacy')}</span>
              </div>
              {status === 'error' && <p className="contact-error full-width" role="alert">{t('formError')}</p>}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
