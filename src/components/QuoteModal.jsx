import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, User, Phone, Mail, Info, Hammer, Wrench, Trash2, Shovel } from 'lucide-react';
import './QuoteModal.css';

const pricingData = {
  'concrete': { 
    label: 'Concrete & Foundation', 
    icon: Hammer,
    description: 'We calculate based on Cubic Yardage (Length x Width x Thickness / 27) plus Rebar & Finishing labor.'
  },
  'plumbing': { 
    label: 'Plumbing Services', 
    icon: Wrench,
    description: 'We calculate based on Materials (pipes, valves, fixtures), Labor (hourly rate), Overhead (gas, insurance, tools), and Profit.'
  },
  'excavation': { 
    label: 'Excavation Services', 
    icon: Shovel,
    description: 'We calculate based on linear footage, excavation type (Trenching vs. Tunneling), and depth requirements.'
  },
};

export default function QuoteModal({ isOpen, onClose, initialService, onDetailedEstimate }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('concrete');
  const [excavationType, setExcavationType] = useState('trenching'); // 'trenching' or 'tunneling'
  const [trenchDepth, setTrenchDepth] = useState(2); // 2, 4, or 6 feet
  const [sqFt, setSqFt] = useState(500);
  const [contamination, setContamination] = useState(1);
  const [moistureDepth, setMoistureDepth] = useState(1);
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [thickness, setThickness] = useState(0.33); // 4 inches in feet
  const [roofMaterial, setRoofMaterial] = useState('architectural');
  const [materialCost, setMaterialCost] = useState(1200);
  const [laborHours, setLaborHours] = useState(16);
  const laborRate = 85;
  const overheadFactor = 0.20;
  const profitFactor = 0.15;

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [quoteHistory, setQuoteHistory] = useState([]);

  // Sync initial service
  useEffect(() => {
    if (isOpen && initialService) {
      const serviceMap = {
        'Concrete & Foundation': 'concrete',
        'Plumbing Services': 'plumbing',
        'Excavation Services': 'excavation'
      };
      const mapped = serviceMap[initialService];
      if (mapped) setProjectType(mapped);
      setStep(1);
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    const stored = localStorage.getItem('shaans_website_quotes');
    if (stored) {
      try { setQuoteHistory(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  // --- CALCULATION LOGIC ---
  const computeEstimate = () => {
    switch (projectType) {
      case 'concrete':
        const yards = (length * width * thickness) / 27;
        const withWaste = yards * 1.1;
        // Installed concrete: $750/cu yd including excavation, framing, rebar, labor, and concrete material
        return Math.floor(withWaste * 750);

      case 'plumbing':
        const labor = laborHours * laborRate;
        const overhead = (materialCost + labor) * overheadFactor;
        return Math.floor(materialCost + labor + overhead);

      case 'excavation':
        const isTrenching = excavationType === 'trenching';
        if (isTrenching) {
          // Trenching: length * depth factor * base rate ($35/linear foot)
          const depthMultiplier = trenchDepth === 2 ? 1.0 : trenchDepth === 4 ? 1.5 : 2.2;
          return Math.floor(length * 35 * depthMultiplier);
        } else {
          // Tunneling: length * base rate ($180/linear foot)
          return Math.floor(length * 180);
        }

      default:
        return 0;
    }
  };

  const activeEstimate = computeEstimate();

  const handleSaveQuote = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    const newQuote = {
      id: `Q-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      date: new Date().toLocaleDateString(),
      estimatedCost: activeEstimate,
      service: pricingData[projectType].label
    };

    const updatedHistory = [newQuote, ...quoteHistory];
    setQuoteHistory(updatedHistory);
    localStorage.setItem('shaans_website_quotes', JSON.stringify(updatedHistory));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setStep(3);
    }, 2000);
  };

  const handleDeleteHistoryItem = (id, e) => {
    e.stopPropagation();
    const updated = quoteHistory.filter(q => q.id !== id);
    setQuoteHistory(updated);
    localStorage.setItem('shaans_website_quotes', JSON.stringify(updated));
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
                  <h2>Instant Quote</h2>
                  <p>Professional Estimation Tool</p>
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
                    <h3>Details Saved!</h3>
                    <p>We will contact you within 24 hours.</p>
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
                                    <span>Length</span>
                                    <span className="quote-value-display">{length.toLocaleString()} Ft</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="5000" 
                                    step="1" 
                                    value={length} 
                                    onChange={(e) => setLength(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                                <div className="quote-input-group">
                                  <div className="quote-input-label-row">
                                    <span>Width</span>
                                    <span className="quote-value-display">{width.toLocaleString()} Ft</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="5000" 
                                    step="1" 
                                    value={width} 
                                    onChange={(e) => setWidth(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                              </div>
                              
                              <div className="quote-side-card">
                                <span className="quote-side-card-title">Total Volume</span>
                                <div className="quote-side-card-value">
                                  {`${((length * width * thickness) / 27).toFixed(1)} CU YD`}
                                </div>
                                
                                <div style={{ marginTop: '1rem', width: '100%' }}>
                                  <label className="quote-input-label-row" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>Thickness (Inches)</label>
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
                                    <span>Linear Length</span>
                                    <span className="quote-value-display">{length.toLocaleString()} Ft</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="1000" 
                                    step="1" 
                                    value={length} 
                                    onChange={(e) => setLength(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                                <div className="quote-input-group">
                                  <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>Excavation Type</label>
                                  <div className="quote-choices-grid">
                                    {['trenching', 'tunneling'].map((type) => (
                                      <button
                                        key={type}
                                        type="button"
                                        onClick={() => setExcavationType(type)}
                                        className={`quote-choice-btn ${excavationType === type ? 'active' : ''}`}
                                      >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="quote-side-card">
                                <span className="quote-side-card-title">Linear Footage</span>
                                <div className="quote-side-card-value">
                                  {`${length} LF`}
                                </div>

                                {excavationType === 'trenching' && (
                                  <div style={{ marginTop: '1rem', width: '100%' }}>
                                    <label className="quote-input-label-row" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>Trench Depth</label>
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
                                  <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>Materials Cost ($)</label>
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
                                    <span>Labor Hours</span>
                                    <span className="quote-value-display">{laborHours.toLocaleString()} HRS</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="500" 
                                    step="1" 
                                    value={laborHours} 
                                    onChange={(e) => setLaborHours(Number(e.target.value))} 
                                    className="quote-slider" 
                                  />
                                </div>
                              </div>
                              <div className="quote-side-card" style={{ padding: '1.25rem', justifyContent: 'center', alignItems: 'stretch' }}>
                                <div className="quote-side-card-detail-row">
                                  <span>Overhead (20%)</span>
                                  <span>+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span>
                                </div>
                                <div style={{ borderTop: '1px solid var(--modal-border)', marginTop: '0.75rem', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-light)', fontStyle: 'italic', textAlign: 'left', lineHeight: '1.4' }}>
                                  Includes professional-grade specialized tools.
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="quote-modal-footer">
                          <div className="quote-modal-price-display-wrapper">
                            <span className="quote-modal-price-label">Final Estimated Project Budget</span>
                            <span className="quote-modal-price-value">${activeEstimate.toLocaleString()}*</span>
                          </div>
                          <div className="quote-btn-group" style={{ maxWidth: '440px' }}>
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
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                            >
                              Get a more detailed estimate
                            </button>
                            <button onClick={() => setStep(2)} className="quote-btn-primary" style={{ flex: 1.2 }}>
                              Proceed to Details &rarr;
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSaveQuote} className="quote-modal-step-content" style={{ gap: '1.25rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                          <div className="quote-input-group">
                            <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>Full Client Name</label>
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
                              <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>Phone Number</label>
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
                              <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>Email Address</label>
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
                            <label className="quote-input-label-row" style={{ marginBottom: '0.25rem', display: 'block' }}>Project Requirements</label>
                            <textarea 
                              rows={3} 
                              placeholder="Describe details, access, or timing..." 
                              value={notes} 
                              onChange={(e) => setNotes(e.target.value)} 
                              className="quote-textarea" 
                            />
                          </div>
                        </div>

                        <div className="quote-btn-group" style={{ marginTop: '1rem' }}>
                          <button type="button" onClick={() => setStep(1)} className="quote-btn-secondary">Back</button>
                          <button type="submit" className="quote-btn-submit">Submit Request</button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="quote-modal-step-content" style={{ justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="quote-summary-sheet">
                          <div className="quote-summary-tag">Official Project Estimate Summary</div>
                          <div className="quote-summary-value">${activeEstimate.toLocaleString()}</div>
                          <div className="quote-summary-meta-row">
                            <span>Service: {pricingData[projectType].label}</span>
                            <span className="quote-summary-divider">|</span>
                            <span>Ref: {Math.floor(10000 + Math.random() * 90000)}</span>
                          </div>
                          <p className="quote-summary-disclaimer">
                            This preliminary estimate is based on regional averages. A final binding quote will be issued following a comprehensive evaluation.
                          </p>
                        </div>
                        <button onClick={onClose} className="quote-btn-primary" style={{ marginTop: '1.5rem', width: '100%', maxWidth: '360px' }}>
                          Return to Website Home
                        </button>
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


