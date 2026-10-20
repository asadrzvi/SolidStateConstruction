import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, User, Phone, Mail, Info, Hammer, Wrench, Trash2, Shovel } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './QuoteModal.css';

export default function QuoteModal({ isOpen, onClose, initialService, onDetailedEstimate, onInquirySubmitted }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('concrete');
  const [excavationType, setExcavationType] = useState('trenching'); // 'trenching' or 'tunneling'
  const [trenchDepth, setTrenchDepth] = useState(2); // 2, 4, or 6 feet
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [thickness, setThickness] = useState(0.33); // 4 inches in feet
  const [materialCost, setMaterialCost] = useState(1200);
  const [laborHours, setLaborHours] = useState(16);
  const { t } = useLanguage();

  const laborRate = 85;
  const overheadFactor = 0.20;

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [quoteHistory, setQuoteHistory] = useState([]);

  const pricingData = {
    'concrete': { 
      label: t('navAbout') === 'About' ? 'Concrete & Foundation' : 'Concreto y Cimientos', 
      icon: Hammer,
      description: t('quoteConcreteDesc')
    },
    'plumbing': { 
      label: t('navAbout') === 'About' ? 'Plumbing Services' : 'Servicios de Plomería', 
      icon: Wrench,
      description: t('quotePlumbingDesc')
    },
    'excavation': { 
      label: t('navAbout') === 'About' ? 'Excavation Services' : 'Servicios de Excavación', 
      icon: Shovel,
      description: t('quoteExcavationDesc')
    },
  };

  // Sync initial service
  useEffect(() => {
    if (isOpen && initialService) {
      const serviceMap = {
        'Concrete & Foundation': 'concrete',
        'Plumbing Services': 'plumbing',
        'Excavation Services': 'excavation'
      };
      if (serviceMap[initialService]) {
        setProjectType(serviceMap[initialService]);
      }
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    const stored = localStorage.getItem('shaans_website_quotes');
    if (stored) {
      try { setQuoteHistory(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  // Clamp slider values when project type changes to prevent out-of-bounds inputs
  useEffect(() => {
    if (projectType === 'concrete') {
      if (length > 150) setLength(150);
      if (width > 100) setWidth(100);
    } else if (projectType === 'excavation') {
      if (length > 300) setLength(300);
    }
  }, [projectType, length, width]);

  // --- CALCULATION LOGIC ---
  const computeEstimate = () => {
    switch (projectType) {
      case 'concrete':
        const cuYards = (length * width * thickness) / 27;
        const baseConcreteCost = cuYards * 165;
        const rebarMeshCost = (length * width) * 1.75;
        const laborCost = cuYards * 190;
        return Math.round(baseConcreteCost + rebarMeshCost + laborCost);

      case 'plumbing':
        const rawLabor = laborHours * laborRate;
        const subtotal = materialCost + rawLabor;
        const overhead = subtotal * overheadFactor;
        return Math.round(subtotal + overhead);

      case 'excavation':
        if (excavationType === 'trenching') {
          const depthMultiplier = trenchDepth === 2 ? 1 : trenchDepth === 4 ? 1.4 : 1.8;
          return Math.floor(length * 35 * depthMultiplier);
        } else {
          return Math.floor(length * 180);
        }

      default:
        return 0;
    }
  };

  const activeEstimate = computeEstimate();

  const handlePrintQuote = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Solid State Construction - Estimate Summary</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1f2124; line-height: 1.6; }
            .header { border-bottom: 2px solid #708269; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 24px; font-weight: bold; color: #708269; }
            .title { font-size: 28px; font-weight: 900; margin: 0; }
            .meta { font-size: 14px; color: #7f7f7f; }
            .estimate-box { background: #fafaf9; border: 1px solid #e5e5e0; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
            .price-val { font-size: 42px; font-weight: 900; color: #1f2124; margin: 10px 0; }
            .specs-list { margin: 20px 0; padding-left: 20px; }
            .specs-list li { margin: 10px 0; font-size: 16px; }
            .disclaimer { font-size: 12px; color: #7f7f7f; font-style: italic; margin-top: 50px; border-top: 1px solid #e5e5e0; padding-top: 20px; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">Solid State Construction</h1>
              <div class="meta">${t('navAbout') === 'About' ? 'Date' : 'Fecha'}: ${new Date().toLocaleDateString()} | Reference: EST-${Math.floor(10000 + Math.random() * 90000)}</div>
            </div>
            <div class="logo">Solid State</div>
          </div>
          
          <h2>${t('quoteSummaryTitle')}</h2>
          <p>${t('navAbout') === 'About' ? 'Thank you for requesting an estimate from Solid State Construction. Below are the preliminary specifications and budget generated by our estimation tool.' : 'Gracias por solicitar un presupuesto de Solid State Construction. A continuación se presentan las especificaciones preliminares y el presupuesto generado por nuestra herramienta.'}</p>
          
          <div class="estimate-box">
            <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #708269; font-weight: bold;">${t('quoteFinalEstimate')}</div>
            <div class="price-val">$${activeEstimate.toLocaleString()}*</div>
            <div style="font-size: 14px; color: #5c5c5c;">${t('formService')}: ${pricingData[projectType].label}</div>
          </div>
          
          <h3>${t('navAbout') === 'About' ? 'Project Specifications:' : 'Especificaciones del Proyecto:'}</h3>
          <ul class="specs-list">
            ${projectType === 'concrete' ? `
              <li><strong>${t('quoteLength')}:</strong> ${length.toLocaleString()} FT</li>
              <li><strong>${t('quoteWidth')}:</strong> ${width.toLocaleString()} FT</li>
              <li><strong>${t('quoteThickness')}:</strong> ${Math.round(thickness * 12)} Inches</li>
              <li><strong>${t('quoteTotalVolume')}:</strong> ${((length * width * thickness) / 27).toFixed(1)} CU YD</li>
            ` : ''}
            ${projectType === 'plumbing' ? `
              <li><strong>${t('quoteMaterialsCost')}:</strong> $${materialCost.toLocaleString()}</li>
              <li><strong>${t('quoteLaborHours')}:</strong> ${laborHours} HRS</li>
              <li><strong>${t('quoteOverhead')}:</strong> Included</li>
            ` : ''}
            ${projectType === 'excavation' ? `
              <li><strong>${t('quoteExcType')}:</strong> ${excavationType.charAt(0).toUpperCase() + excavationType.slice(1)}</li>
              <li><strong>${t('quoteLinearFootage')}:</strong> ${length} LF</li>
              ${excavationType === 'trenching' ? `<li><strong>${t('quoteTrenchDepth')}:</strong> ${trenchDepth} FT</li>` : ''}
            ` : ''}
          </ul>
          
          <div class="disclaimer">
            *${t('quoteSummaryDesc')}
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  const handleSaveQuote = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    const serviceName = pricingData[projectType].label;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "700a045a-9c7d-409d-ba90-8133f2c3b3a1",
        name: clientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: serviceName,
        message: `Calculator Estimate: $${activeEstimate.toLocaleString()}\nNotes: ${notes.trim()}`,
        subject: `New Lead: ${serviceName} ($${activeEstimate.toLocaleString()})`
      })
    }).catch(() => {});

    if (onInquirySubmitted) {
      onInquirySubmitted(serviceName, clientName);
    } else {
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setStep(3);
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="quote-modal-overlay">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="quote-modal-container"
          >
            {/* Main Content */}
            <div className="quote-modal-main">
              <div className="quote-modal-header">
                <div className="quote-modal-title-group">
                  <h2>{t('quoteTitle')}</h2>
                  <p>{t('quoteSub')}</p>
                </div>
                <button onClick={onClose} className="quote-modal-close-btn" title="Close Modal">
                  <X size={24} />
                </button>
              </div>

              <div className="quote-modal-step-content">
                {savedSuccess ? (
                  <div className="quote-modal-success">
                    <div className="quote-modal-success-icon">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3>{t('quoteSuccessTitle')}</h3>
                    <p>{t('quoteSuccessDesc')}</p>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                        {/* Service Selection */}
                        <div className="quote-service-grid">
                          {Object.keys(pricingData).map((key) => {
                            const Icon = pricingData[key].icon;
                            return (
                              <button
                                key={key}
                                onClick={() => setProjectType(key)}
                                className={`quote-service-btn ${projectType === key ? 'active' : ''}`}
                              >
                                <Icon size={20} />
                                <span className="quote-service-btn-label">{pricingData[key].label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Calculation Method Description */}
                        <div className="quote-info-box">
                          <div className="quote-info-icon-wrapper">
                            <Info size={16} />
                          </div>
                          <p className="quote-info-text">
                            {pricingData[projectType].description}
                          </p>
                        </div>

                        {/* Dynamic Inputs */}
                        <div className="quote-inputs-container">
                          {projectType === 'concrete' && (
                            <div className="quote-grid-2">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteLength')}</span>
                                    <span className="quote-value-display">{length.toLocaleString()} Ft</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="5" 
                                    max="150" 
                                    step="1" 
                                    value={length} 
                                    onChange={(e) => setLength(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteWidth')}</span>
                                    <span className="quote-value-display">{width.toLocaleString()} Ft</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="5" 
                                    max="100" 
                                    step="1" 
                                    value={width} 
                                    onChange={(e) => setWidth(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                              </div>
                              
                              <div className="quote-side-card">
                                <span className="quote-side-card-title">{t('quoteTotalVolume')}</span>
                                <div className="quote-side-card-value">
                                  {`${((length * width * thickness) / 27).toFixed(1)} CU YD`}
                                </div>
                                
                                <div style={{ marginTop: '1rem', width: '100%' }}>
                                  <label className="quote-input-label-row" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>{t('quoteThickness')}</label>
                                  <div className="quote-choices-grid">
                                    {[0.33, 0.5, 0.66].map((val) => (
                                      <button 
                                        key={val} 
                                        type="button"
                                        onClick={() => setThickness(val)} 
                                        className={`quote-choice-btn ${thickness === val ? 'active' : ''}`}
                                      >
                                        {Math.round(val * 12)}"
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {projectType === 'excavation' && (
                            <div className="quote-grid-2">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteLinearLength')}</span>
                                    <span className="quote-value-display">{length.toLocaleString()} Ft</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="5" 
                                    max="300" 
                                    step="1" 
                                    value={length} 
                                    onChange={(e) => setLength(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                                <div className="quote-input-group">
                                  <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>{t('quoteExcType')}</label>
                                  <div className="quote-choices-grid">
                                    {['trenching', 'tunneling'].map((type) => (
                                      <button
                                        key={type}
                                        type="button"
                                        onClick={() => setExcavationType(type)}
                                        className={`quote-choice-btn ${excavationType === type ? 'active' : ''}`}
                                      >
                                        {t('navAbout') === 'About' ? (type === 'trenching' ? 'Trenching' : 'Tunneling') : (type === 'trenching' ? 'Zanjas' : 'Túneles')}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="quote-side-card">
                                <span className="quote-side-card-title">{t('quoteLinearFootage')}</span>
                                <div className="quote-side-card-value">
                                  {`${length} LF`}
                                </div>

                                {excavationType === 'trenching' && (
                                  <div style={{ marginTop: '1rem', width: '100%' }}>
                                    <label className="quote-input-label-row" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>{t('quoteTrenchDepth')}</label>
                                    <div className="quote-choices-grid">
                                      {[2, 4, 6].map((depth) => (
                                        <button 
                                          key={depth} 
                                          type="button"
                                          onClick={() => setTrenchDepth(depth)} 
                                          className={`quote-choice-btn ${trenchDepth === depth ? 'active' : ''}`}
                                        >
                                          {depth} Ft
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {projectType === 'plumbing' && (
                            <div className="quote-grid-2">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div className="quote-input-group">
                                  <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>{t('quoteMaterialsCost')}</label>
                                  <div className="quote-input-icon-wrapper">
                                    <input 
                                      type="number" 
                                      value={materialCost} 
                                      onChange={(e) => setMaterialCost(Number(e.target.value))} 
                                      className="quote-text-input" 
                                      style={{ paddingLeft: '2.5rem' }}
                                    />
                                    <span className="quote-input-icon" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$</span>
                                  </div>
                                </div>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteLaborHours')}</span>
                                    <span className="quote-value-display">{laborHours.toLocaleString()} HRS</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="80" 
                                    step="1" 
                                    value={laborHours} 
                                    onChange={(e) => setLaborHours(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                              </div>
                              <div className="quote-side-card" style={{ padding: '1.25rem', justifyContent: 'center', alignItems: 'stretch' }}>
                                <div className="quote-side-card-detail-row">
                                  <span>{t('quoteOverhead')}</span>
                                  <span>+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span>
                                </div>
                                <div style={{ borderTop: '1px solid var(--modal-border)', marginTop: '0.75rem', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-light)', fontStyle: 'italic', textAlign: 'left', lineHeight: '1.4' }}>
                                  {t('navAbout') === 'About' ? 'Includes professional-grade specialized tools.' : 'Incluye herramientas especializadas de grado profesional.'}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="quote-modal-footer">
                          <div className="quote-modal-price-display-wrapper">
                            <span className="quote-modal-price-label">{t('quoteFinalEstimate')}</span>
                            <span className="quote-modal-price-value">${activeEstimate.toLocaleString()}*</span>
                          </div>
                          <div className="quote-btn-group" style={{ maxWidth: '440px', gap: '0.75rem' }}>
                            <button 
                              type="button"
                              onClick={handlePrintQuote}
                              className="quote-btn-secondary"
                              style={{ flex: 0.8 }}
                            >
                              {t('quoteBtnPrint')}
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                let details = `Detailed Custom Estimate Request for ${pricingData[projectType].label}.\n\n`;
                                details += `Project Specifications:\n`;
                                if (projectType === 'concrete') {
                                  details += `- Length: ${length.toLocaleString()} Ft\n`;
                                  details += `- Width: ${width.toLocaleString()} Ft\n`;
                                  details += `- Thickness: ${Math.round(thickness * 12)} inches\n`;
                                  details += `- Calculated Volume: ${((length * width * thickness) / 27).toFixed(1)} CU YD\n`;
                                } else if (projectType === 'plumbing') {
                                  details += `- Materials Cost: $${materialCost.toLocaleString()}\n`;
                                  details += `- Labor Hours: ${laborHours} HRS\n`;
                                  details += `- Estimated Overhead (20%): $${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}\n`;
                                } else if (projectType === 'excavation') {
                                  details += `- Excavation Type: ${excavationType.charAt(0).toUpperCase() + excavationType.slice(1)}\n`;
                                  details += `- Linear Length: ${length.toLocaleString()} Ft\n`;
                                  if (excavationType === 'trenching') {
                                    details += `- Trench Depth: ${trenchDepth} Ft\n`;
                                  }
                                }
                                details += `\nPreliminary Estimated Budget: $${activeEstimate.toLocaleString()}*\n\n`;
                                details += `Please contact me to finalize this estimate.`;
                                
                                onDetailedEstimate(pricingData[projectType].label, details);
                              }}
                              className="quote-btn-secondary"
                              style={{ flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                            >
                              {t('quoteBtnGetDetailed')}
                            </button>
                            <button onClick={() => setStep(2)} className="quote-btn-primary" style={{ flex: 1.5 }}>
                              {t('quoteBtnNext')} &rarr;
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSaveQuote} className="quote-modal-step-content" style={{ gap: '1.25rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                          <div className="quote-input-group">
                            <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>{t('formName')}</label>
                            <div className="quote-input-icon-wrapper">
                              <input 
                                type="text" 
                                required 
                                placeholder="John Doe" 
                                value={clientName} 
                                onChange={(e) => setClientName(e.target.value)} 
                                className="quote-text-input" 
                              />
                              <User className="quote-input-icon" size={18} />
                            </div>
                          </div>
                          <div className="quote-grid-2">
                            <div className="quote-input-group">
                              <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>{t('formPhone')}</label>
                              <div className="quote-input-icon-wrapper">
                                <input 
                                  type="tel" 
                                  required 
                                  placeholder="(512) 000-0000" 
                                  value={phone} 
                                  onChange={(e) => setPhone(e.target.value)} 
                                  className="quote-text-input" 
                                />
                                <Phone className="quote-input-icon" size={18} />
                              </div>
                            </div>
                            <div className="quote-input-group">
                              <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>{t('formEmail')}</label>
                              <div className="quote-input-icon-wrapper">
                                <input 
                                  type="email" 
                                  placeholder="john@example.com" 
                                  value={email} 
                                  onChange={(e) => setEmail(e.target.value)} 
                                  className="quote-text-input" 
                                />
                                <Mail className="quote-input-icon" size={18} />
                              </div>
                            </div>
                          </div>
                          <div className="quote-input-group">
                            <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>{t('formMsgPlaceholder')}</label>
                            <textarea 
                              rows={3} 
                              placeholder={t('formMsgPlaceholder')} 
                              value={notes} 
                              onChange={(e) => setNotes(e.target.value)} 
                              className="quote-textarea" 
                            />
                          </div>
                        </div>

                        <div className="quote-btn-group" style={{ marginTop: '1rem' }}>
                          <button type="button" onClick={() => setStep(1)} className="quote-btn-secondary">{t('quoteBtnBack')}</button>
                          <button type="submit" className="quote-btn-submit">{t('quoteBtnSubmit')}</button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="quote-modal-step-content" style={{ justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="quote-summary-sheet">
                          <div className="quote-summary-tag">{t('quoteSummaryTitle')}</div>
                          <div className="quote-summary-value">${activeEstimate.toLocaleString()}</div>
                          <div className="quote-summary-meta-row">
                            <span>{t('formService')}: {pricingData[projectType].label}</span>
                            <span className="quote-summary-divider">|</span>
                            <span>Ref: {Math.floor(10000 + Math.random() * 90000)}</span>
                          </div>
                          <p className="quote-summary-disclaimer">
                            {t('quoteSummaryDesc')}
                          </p>
                        </div>
                        <div className="quote-summary-actions" style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '360px', marginTop: '1.5rem' }}>
                          <button onClick={handlePrintQuote} className="quote-btn-secondary" style={{ flex: 1 }}>
                            {t('quoteBtnPrint')}
                          </button>
                          <button onClick={onClose} className="quote-btn-primary" style={{ flex: 1.2 }}>
                            {t('quoteBtnReturn')}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
