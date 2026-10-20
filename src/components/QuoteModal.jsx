import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, User, Phone, Mail, Info, Hammer, Wrench, Shovel } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './QuoteModal.css';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "700a045a-9c7d-409d-ba90-8133f2c3b3a1";

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
  const { t, language } = useLanguage();

  const laborRate = 85;
  const overheadFactor = 0.20;

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const closeBtnRef = useRef(null);

  const pricingData = {
    'concrete': {
      label: t('quoteServiceConcrete'),
      // The service name the form/CRM expects stays in English on purpose.
      serviceName: 'Concrete & Foundation',
      icon: Hammer,
      description: t('quoteConcreteDesc')
    },
    'plumbing': {
      label: t('quoteServicePlumbing'),
      serviceName: 'Plumbing Services',
      icon: Wrench,
      description: t('quotePlumbingDesc')
    },
    'excavation': {
      label: t('quoteServiceExcavation'),
      serviceName: 'Excavation Services',
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

  // Escape closes; focus lands on the close button when opened.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = setTimeout(() => closeBtnRef.current && closeBtnRef.current.focus(), 50);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(id);
    };
  }, [isOpen, onClose]);

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
      case 'concrete': {
        const cuYards = (length * width * thickness) / 27;
        const baseConcreteCost = cuYards * 165;
        const rebarMeshCost = (length * width) * 1.75;
        const laborCost = cuYards * 190;
        return Math.round(baseConcreteCost + rebarMeshCost + laborCost);
      }
      case 'plumbing': {
        const rawLabor = laborHours * laborRate;
        const subtotal = materialCost + rawLabor;
        const overhead = subtotal * overheadFactor;
        return Math.round(subtotal + overhead);
      }
      case 'excavation': {
        if (excavationType === 'trenching') {
          const depthMultiplier = trenchDepth === 2 ? 1 : trenchDepth === 4 ? 1.4 : 1.8;
          return Math.floor(length * 35 * depthMultiplier);
        }
        return Math.floor(length * 180);
      }
      default:
        return 0;
    }
  };

  const activeEstimate = computeEstimate();
  const isEn = language === 'en';

  const handlePrintQuote = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const content = `
      <html>
        <head>
          <title>Solid State Construction - ${t('quoteSummaryTitle')}</title>
          <style>
            body { font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; padding: 40px; color: #141f2c; line-height: 1.6; }
            .header { border-bottom: 2px solid #1e3f63; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 20px; font-weight: 700; color: #1e3f63; letter-spacing: 0.04em; text-transform: uppercase; }
            .title { font-size: 28px; font-weight: 700; margin: 0; }
            .meta { font-size: 14px; color: #6b7684; }
            .estimate-box { background: #f5f2ed; border: 1px solid #ddd6cb; border-radius: 10px; padding: 30px; text-align: center; margin: 30px 0; }
            .price-val { font-size: 42px; font-weight: 700; color: #141f2c; margin: 10px 0; }
            .specs-list { margin: 20px 0; padding-left: 20px; }
            .specs-list li { margin: 10px 0; font-size: 16px; }
            .disclaimer { font-size: 12px; color: #6b7684; margin-top: 50px; border-top: 1px solid #ddd6cb; padding-top: 20px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">Solid State Construction</h1>
              <div class="meta">${t('quoteDateLabel')}: ${new Date().toLocaleDateString()}</div>
            </div>
            <div class="logo">Solid State</div>
          </div>

          <h2>${t('quoteSummaryTitle')}</h2>
          <p>${t('quotePrintIntro')}</p>

          <div class="estimate-box">
            <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: #c4582a; font-weight: 700;">${t('quoteFinalEstimate')}</div>
            <div class="price-val">$${activeEstimate.toLocaleString()}*</div>
            <div style="font-size: 14px; color: #3f4b59;">${t('formService')}: ${pricingData[projectType].label}</div>
          </div>

          <h3>${t('quoteSpecsTitle')}</h3>
          <ul class="specs-list">
            ${projectType === 'concrete' ? `
              <li><strong>${t('quoteLength')}:</strong> ${length.toLocaleString()} ft</li>
              <li><strong>${t('quoteWidth')}:</strong> ${width.toLocaleString()} ft</li>
              <li><strong>${t('quoteThickness')}:</strong> ${Math.round(thickness * 12)} in</li>
              <li><strong>${t('quoteTotalVolume')}:</strong> ${((length * width * thickness) / 27).toFixed(1)} cu yd</li>
            ` : ''}
            ${projectType === 'plumbing' ? `
              <li><strong>${t('quoteMaterialsCost')}:</strong> $${materialCost.toLocaleString()}</li>
              <li><strong>${t('quoteLaborHours')}:</strong> ${laborHours} h</li>
              <li><strong>${t('quoteOverhead')}:</strong> ${isEn ? 'Included' : 'Incluido'}</li>
            ` : ''}
            ${projectType === 'excavation' ? `
              <li><strong>${t('quoteExcType')}:</strong> ${excavationType === 'trenching' ? t('quoteTrenching') : t('quoteTunneling')}</li>
              <li><strong>${t('quoteLinearFootage')}:</strong> ${length} lf</li>
              ${excavationType === 'trenching' ? `<li><strong>${t('quoteTrenchDepth')}:</strong> ${trenchDepth} ft</li>` : ''}
            ` : ''}
          </ul>

          <div class="disclaimer">*${t('quoteSummaryDesc')}</div>

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
      setValidationError(t('quoteValidation'));
      return;
    }
    setValidationError('');

    const serviceName = pricingData[projectType].serviceName;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
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

  const buildDetailedRequest = () => {
    let details = `Detailed Custom Estimate Request for ${pricingData[projectType].serviceName}.\n\n`;
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
    onDetailedEstimate(pricingData[projectType].serviceName, details);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="quote-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.9 }}
            className="quote-modal-container"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quote-modal-main">
              <div className="quote-modal-header">
                <div className="quote-modal-title-group">
                  <p className="eyebrow">{t('quoteSub')}</p>
                  <h2 id="quote-modal-title">{t('quoteTitle')}</h2>
                </div>
                <button ref={closeBtnRef} type="button" onClick={onClose} className="quote-modal-close-btn" aria-label={t('quoteClose')}>
                  <X size={22} strokeWidth={1.75} />
                </button>
              </div>

              <div className="quote-modal-step-content">
                {savedSuccess ? (
                  <div className="quote-modal-success" role="status">
                    <div className="quote-modal-success-icon">
                      <CheckCircle2 size={28} strokeWidth={1.75} />
                    </div>
                    <h3>{t('quoteSuccessTitle')}</h3>
                    <p>{t('quoteSuccessDesc')}</p>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div className="quote-step">
                        <div className="quote-service-grid" role="tablist">
                          {Object.keys(pricingData).map((key) => {
                            const Icon = pricingData[key].icon;
                            return (
                              <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={projectType === key}
                                onClick={() => setProjectType(key)}
                                className={`quote-service-btn ${projectType === key ? 'active' : ''}`}
                              >
                                <Icon size={20} strokeWidth={1.75} />
                                <span className="quote-service-btn-label">{pricingData[key].label}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="quote-info-box">
                          <Info size={16} strokeWidth={1.75} />
                          <p className="quote-info-text">{pricingData[projectType].description}</p>
                        </div>

                        <div className="quote-inputs-container">
                          {projectType === 'concrete' && (
                            <div className="quote-grid-2">
                              <div className="quote-stack">
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteLength')}</span>
                                    <span className="quote-value-display num">{length.toLocaleString()} ft</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="5"
                                    max="150"
                                    step="1"
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                    className="quote-slider"
                                    aria-label={t('quoteLength')}
                                  />
                                </div>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteWidth')}</span>
                                    <span className="quote-value-display num">{width.toLocaleString()} ft</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="1"
                                    value={width}
                                    onChange={(e) => setWidth(Number(e.target.value))}
                                    className="quote-slider"
                                    aria-label={t('quoteWidth')}
                                  />
                                </div>
                              </div>

                              <div className="quote-side-card">
                                <span className="quote-side-card-title">{t('quoteTotalVolume')}</span>
                                <div className="quote-side-card-value num">
                                  {`${((length * width * thickness) / 27).toFixed(1)} cu yd`}
                                </div>
                                <div className="quote-side-card-block">
                                  <span className="quote-input-label-row">{t('quoteThickness')}</span>
                                  <div className="quote-choices-grid">
                                    {[0.33, 0.5, 0.66].map((val) => (
                                      <button
                                        key={val}
                                        type="button"
                                        onClick={() => setThickness(val)}
                                        className={`quote-choice-btn ${thickness === val ? 'active' : ''}`}
                                        aria-pressed={thickness === val}
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
                              <div className="quote-stack">
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteLinearLength')}</span>
                                    <span className="quote-value-display num">{length.toLocaleString()} ft</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="5"
                                    max="300"
                                    step="1"
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                    className="quote-slider"
                                    aria-label={t('quoteLinearLength')}
                                  />
                                </div>
                                <div className="quote-input-group">
                                  <span className="quote-input-label-row">{t('quoteExcType')}</span>
                                  <div className="quote-choices-grid">
                                    {['trenching', 'tunneling'].map((type) => (
                                      <button
                                        key={type}
                                        type="button"
                                        onClick={() => setExcavationType(type)}
                                        className={`quote-choice-btn ${excavationType === type ? 'active' : ''}`}
                                        aria-pressed={excavationType === type}
                                      >
                                        {type === 'trenching' ? t('quoteTrenching') : t('quoteTunneling')}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="quote-side-card">
                                <span className="quote-side-card-title">{t('quoteLinearFootage')}</span>
                                <div className="quote-side-card-value num">{`${length} lf`}</div>
                                {excavationType === 'trenching' && (
                                  <div className="quote-side-card-block">
                                    <span className="quote-input-label-row">{t('quoteTrenchDepth')}</span>
                                    <div className="quote-choices-grid">
                                      {[2, 4, 6].map((depth) => (
                                        <button
                                          key={depth}
                                          type="button"
                                          onClick={() => setTrenchDepth(depth)}
                                          className={`quote-choice-btn ${trenchDepth === depth ? 'active' : ''}`}
                                          aria-pressed={trenchDepth === depth}
                                        >
                                          {depth} ft
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
                              <div className="quote-stack">
                                <div className="quote-input-group">
                                  <label className="quote-input-label-row" htmlFor="q-materials">{t('quoteMaterialsCost')}</label>
                                  <div className="quote-input-icon-wrapper">
                                    <input
                                      id="q-materials"
                                      type="number"
                                      min="0"
                                      value={materialCost}
                                      onChange={(e) => setMaterialCost(Number(e.target.value))}
                                      className="quote-text-input"
                                    />
                                    <span className="quote-input-icon quote-input-icon-text">$</span>
                                  </div>
                                </div>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>{t('quoteLaborHours')}</span>
                                    <span className="quote-value-display num">{laborHours.toLocaleString()} h</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="1"
                                    max="80"
                                    step="1"
                                    value={laborHours}
                                    onChange={(e) => setLaborHours(Number(e.target.value))}
                                    className="quote-slider"
                                    aria-label={t('quoteLaborHours')}
                                  />
                                </div>
                              </div>
                              <div className="quote-side-card quote-side-card-rows">
                                <div className="quote-side-card-detail-row">
                                  <span>{t('quoteOverhead')}</span>
                                  <span className="num">+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span>
                                </div>
                                <p className="quote-side-card-note">{t('quoteToolsNote')}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="quote-modal-footer">
                          <div className="quote-modal-price-display-wrapper">
                            <span className="quote-modal-price-label">{t('quoteFinalEstimate')}</span>
                            <span className="quote-modal-price-value num">${activeEstimate.toLocaleString()}*</span>
                          </div>
                          <div className="quote-btn-group">
                            <button type="button" onClick={handlePrintQuote} className="quote-btn-secondary">
                              {t('quoteBtnPrint')}
                            </button>
                            <button type="button" onClick={buildDetailedRequest} className="quote-btn-secondary">
                              {t('quoteBtnGetDetailed')}
                            </button>
                            <button type="button" onClick={() => setStep(2)} className="quote-btn-primary">
                              {t('quoteBtnNext')} &rarr;
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSaveQuote} className="quote-step" noValidate>
                        <div className="quote-stack">
                          <div className="quote-input-group">
                            <label className="quote-input-label-row" htmlFor="q-name">{t('formName')}</label>
                            <div className="quote-input-icon-wrapper">
                              <input
                                id="q-name"
                                type="text"
                                required
                                autoComplete="name"
                                placeholder={t('formNamePh')}
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="quote-text-input"
                              />
                              <User className="quote-input-icon" size={18} strokeWidth={1.75} />
                            </div>
                          </div>
                          <div className="quote-grid-2">
                            <div className="quote-input-group">
                              <label className="quote-input-label-row" htmlFor="q-phone">{t('formPhone')}</label>
                              <div className="quote-input-icon-wrapper">
                                <input
                                  id="q-phone"
                                  type="tel"
                                  required
                                  autoComplete="tel"
                                  placeholder={t('formPhonePh')}
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="quote-text-input"
                                />
                                <Phone className="quote-input-icon" size={18} strokeWidth={1.75} />
                              </div>
                            </div>
                            <div className="quote-input-group">
                              <label className="quote-input-label-row" htmlFor="q-email">{t('formEmail')}</label>
                              <div className="quote-input-icon-wrapper">
                                <input
                                  id="q-email"
                                  type="email"
                                  autoComplete="email"
                                  placeholder={t('formEmailPh')}
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="quote-text-input"
                                />
                                <Mail className="quote-input-icon" size={18} strokeWidth={1.75} />
                              </div>
                            </div>
                          </div>
                          <div className="quote-input-group">
                            <label className="quote-input-label-row" htmlFor="q-notes">{t('formMsg')}</label>
                            <textarea
                              id="q-notes"
                              rows={3}
                              placeholder={t('formMsgPlaceholder')}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="quote-textarea"
                            />
                          </div>
                          {validationError && <p className="quote-error" role="alert">{validationError}</p>}
                        </div>

                        <div className="quote-btn-group quote-btn-group-end">
                          <button type="button" onClick={() => setStep(1)} className="quote-btn-secondary">{t('quoteBtnBack')}</button>
                          <button type="submit" className="quote-btn-primary">{t('quoteBtnSubmit')}</button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="quote-step quote-step-center">
                        <div className="quote-summary-sheet">
                          <div className="quote-summary-tag">{t('quoteSummaryTitle')}</div>
                          <div className="quote-summary-value num">${activeEstimate.toLocaleString()}</div>
                          <div className="quote-summary-meta-row">
                            <span>{t('formService')}: {pricingData[projectType].label}</span>
                          </div>
                          <p className="quote-summary-disclaimer">{t('quoteSummaryDesc')}</p>
                        </div>
                        <div className="quote-btn-group quote-summary-actions">
                          <button type="button" onClick={handlePrintQuote} className="quote-btn-secondary">
                            {t('quoteBtnPrint')}
                          </button>
                          <button type="button" onClick={onClose} className="quote-btn-primary">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
