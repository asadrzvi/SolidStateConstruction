import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle2, User, Phone, Mail, Info, Droplets, Home, Hammer, Wrench, Trash2 } from 'lucide-react';
import './QuoteModal.css';

const pricingData = {
  'water-remediation': { 
    label: 'Water Remediation', 
    icon: Droplets,
    description: 'We calculate based on Square Footage, Contamination Class (1-3), and Moisture Depth Factor.'
  },
  'roofing': { 
    label: 'Roofing Services', 
    icon: Home,
    description: 'We calculate based on Total Squares (100 sq ft units), Material Grade, and Waste Factor (typically 25%).'
  },
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
};

export default function QuoteModal({ isOpen, onClose, initialService }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('water-remediation');
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
        'Water Remediation': 'water-remediation',
        'Foundation Repair': 'concrete',
        'Roofing Services': 'roofing',
        'Concrete Plumbing': 'plumbing'
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
      case 'water-remediation':
        // Base mobilization fee of $250 + realistic mitigation sqft cost * depth multiplier
        const baseWaterPrice = contamination === 1 ? 3.50 : contamination === 2 ? 5.50 : 9.00;
        const waterDepthMult = moistureDepth === 1 ? 1.0 : 1.4;
        return Math.floor(250 + sqFt * baseWaterPrice * waterDepthMult);
      
      case 'concrete':
        const yards = (length * width * thickness) / 27;
        const withWaste = yards * 1.1;
        // Installed concrete: $750/cu yd including excavation, framing, rebar, labor, and concrete material
        return Math.floor(withWaste * 750);

      case 'roofing':
        const squares = (length * width) / 100;
        const totalSquares = squares * 1.25; // waste factor
        // Asphalt shingle standard: $480/sq, Premium architectural: $620/sq, Metal: $1150/sq (labor + materials)
        const pricePerSquare = roofMaterial === 'standard' ? 480 : roofMaterial === 'architectural' ? 620 : 1150;
        return Math.floor(totalSquares * pricePerSquare);

      case 'plumbing':
        const labor = laborHours * laborRate;
        const overhead = (materialCost + labor) * overheadFactor;
        return Math.floor(materialCost + labor + overhead);

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
                          {projectType === 'water-remediation' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              <div className="quote-input-group">
                                <div className="quote-input-label-row">
                                  <span>Affected Area</span>
                                  <span className="quote-value-display">{sqFt.toLocaleString()} Sq Ft</span>
                                </div>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="5000" 
                                  step="1" 
                                  value={sqFt} 
                                  onChange={(e) => setSqFt(Number(e.target.value))} 
                                  className="quote-slider" 
                                />
                              </div>
                              <div className="quote-grid-2">
                                <div className="quote-input-group">
                                  <label className="quote-input-label-row" style={{ marginBottom: '0.35rem', display: 'block' }}>Contamination Level</label>
                                  <div className="quote-choices-grid">
                                    {['Clean', 'Grey', 'Black'].map((label, i) => (
                                      <button 
                                        key={label} 
                                        type="button"
                                        onClick={() => setContamination(i + 1)} 
                                        className={`quote-choice-btn ${contamination === i + 1 ? 'active' : ''}`}
                                      >
                                        {label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="quote-input-group">
                                  <label className="quote-input-label-row" style={{ marginBottom: '0.35rem', display: 'block' }}>Moisture Depth</label>
                                  <div className="quote-choices-grid">
                                    {['Surface', 'Deep'].map((label, i) => (
                                      <button 
                                        key={label} 
                                        type="button"
                                        onClick={() => setMoistureDepth(i + 1)} 
                                        className={`quote-choice-btn ${moistureDepth === i + 1 ? 'active' : ''}`}
                                      >
                                        {label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {(projectType === 'concrete' || projectType === 'roofing') && (
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
                                <span className="quote-side-card-title">
                                  {projectType === 'concrete' ? 'Total Volume' : 'Total Squares'}
                                </span>
                                <div className="quote-side-card-value">
                                  {projectType === 'concrete' 
                                    ? `${((length * width * thickness) / 27).toFixed(1)} CU YD` 
                                    : `${((length * width) / 100).toFixed(1)} SQ`}
                                </div>
                                
                                {projectType === 'concrete' && (
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
                                )}

                                {projectType === 'roofing' && (
                                  <div style={{ marginTop: '1rem', width: '100%' }}>
                                    <label className="quote-input-label-row" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>Material Grade</label>
                                    <div className="quote-choices-grid">
                                      {['Standard Shingle', 'Architectural', 'Metal'].map((label, i) => {
                                        const keys = ['standard', 'architectural', 'metal'];
                                        return (
                                          <button 
                                            key={label} 
                                            type="button"
                                            onClick={() => setRoofMaterial(keys[i])} 
                                            className={`quote-choice-btn ${roofMaterial === keys[i] ? 'active' : ''}`}
                                          >
                                            {label.split(' ')[0]}
                                          </button>
                                        );
                                      })}
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
                            <a 
                              href={`mailto:contact@solidstateconstruction.com?subject=Detailed Custom Quote Request - ${pricingData[projectType]?.label || 'Service'}&body=Hello Solid State Construction Team,%0A%0AI would like to request a detailed custom quote for the following project:%0A%0A- Service: ${pricingData[projectType]?.label || 'N/A'}%0A- Size: ${projectType === 'water-remediation' ? `${sqFt} sq ft` : (projectType === 'plumbing' ? 'Plumbing Job' : `${length}x${width} (${length * width} sq ft)`)}%0A%0APlease let me know what details you need from me to provide a binding proposal.%0A%0ABest regards,%0A[Your Name]`}
                              className="quote-btn-secondary"
                              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap' }}
                            >
                              Get a more detailed estimate
                            </a>
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


