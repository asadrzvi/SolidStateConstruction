import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, FileText, Trash2, Phone, Mail, User, Maximize } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialService }) {
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('water-remediation');
  const [sqFt, setSqFt] = useState(1500); 
  const [notes, setNotes] = useState('');
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // PRICING FRAMEWORK
  const pricingData = {
    'water-remediation': { min: 2500, max: 250000, label: 'Water Remediation', baseSqFt: 500 },
    'foundation-repair': { min: 5000, max: 500000, label: 'Foundation Repair', baseSqFt: 1000 },
    'remodeling': { min: 10000, max: 750000, label: 'Home Remodeling', baseSqFt: 1500 },
    'painting': { min: 1500, max: 50000, label: 'Painting & Drywall', baseSqFt: 500 },
    'roofing': { min: 4000, max: 300000, label: 'Roofing Services', baseSqFt: 2000 },
    'flooring': { min: 2000, max: 150000, label: 'Flooring & Tile', baseSqFt: 500 },
    'plumbing': { min: 2000, max: 150000, label: 'Concrete Plumbing', baseSqFt: 500 }
  };

  // Sync initial service when modal opens
  useEffect(() => {
    if (isOpen && initialService) {
      const serviceMap = {
        'Water Remediation': 'water-remediation',
        'Foundation Repair': 'foundation-repair',
        'Full Home Remodeling': 'remodeling',
        'Painting & Drywall': 'painting',
        'Roofing Services': 'roofing',
        'Flooring & Tile': 'flooring'
      };
      
      const mapped = serviceMap[initialService];
      if (mapped) {
        setProjectType(mapped);
      }
      setStep(1); // Reset to step 1 when opening
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    const stored = localStorage.getItem('solid_state_construction_quotes');
    if (stored) {
      try {
        setQuoteHistory(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const computeEstimate = () => {
    const range = pricingData[projectType] || { min: 0, max: 0, baseSqFt: 1000 };
    const scaleFactor = Math.min(sqFt / 10000, 1.0);
    const computed = range.min + (range.max - range.min) * scaleFactor;
    return Math.floor(computed);
  };

  const activeEstimate = computeEstimate();

  const handleSaveQuote = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    const newQuote = {
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      email,
      projectType,
      dimensions: `${sqFt.toLocaleString()} SQ. FT.`,
      materialGrade: 'Standard',
      safetyLevel: 'Standard',
      notes: notes || 'N/A',
      estimatedCost: activeEstimate,
      date: new Date().toLocaleDateString(),
      status: 'PENDING'
    };

    const updatedHistory = [newQuote, ...quoteHistory];
    setQuoteHistory(updatedHistory);
    localStorage.setItem('solid_state_construction_quotes', JSON.stringify(updatedHistory));
    
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setStep(3);
    }, 1500);
  };

  const handleDeleteHistoryItem = (id, e) => {
    e.stopPropagation();
    const updated = quoteHistory.filter(q => q.id !== id);
    setQuoteHistory(updated);
    localStorage.setItem('solid_state_construction_quotes', JSON.stringify(updated));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl border border-slate-800 bg-slate-900 p-6 sm:p-10 shadow-2xl text-slate-100 rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight leading-none">
                  Free Estimate
                </h2>
                <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest font-bold mt-1">
                  Drag the slider to adjust Square Footage
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-emerald-500">
                <X className="h-7 w-7" />
              </button>
            </div>

            {savedSuccess ? (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="h-20 w-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Request Sent!</h3>
                <p className="text-slate-400 max-w-xs mx-auto">We'll review your details and contact you shortly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-4">1. Select Service</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {Object.keys(pricingData).map((key) => (
                            <button
                              key={key}
                              onClick={() => setProjectType(key)}
                              className={`py-3 px-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-tight transition-all text-center ${
                                projectType === key 
                                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40 translate-y-[-2px]' 
                                  : 'bg-slate-800/50 border-slate-800 text-slate-500 hover:border-slate-700'
                              }`}
                            >
                              {pricingData[key].label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-end">
                          <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block">2. Project Size (Sq Ft)</label>
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Maximize className="h-4 w-4" />
                            <span className="font-display text-2xl font-black">{sqFt.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="relative pt-2">
                          <input 
                            type="range"
                            min="0"
                            max="10000"
                            step="50"
                            value={sqFt}
                            onChange={(e) => setSqFt(Number(e.target.value))}
                            className="w-full cursor-pointer"
                          />
                          <div className="flex justify-between mt-2 font-mono text-[9px] text-slate-600 uppercase font-bold">
                            <span>0 FT</span>
                            <span>5,000 FT</span>
                            <span>10,000 FT</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Estimated Range</span>
                          <span className="text-3xl font-black text-emerald-400">${activeEstimate.toLocaleString()}*</span>
                        </div>
                        <button
                          onClick={() => setStep(2)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-display font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-emerald-900/30"
                        >
                          Next Step &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleSaveQuote} className="space-y-6">
                      <div className="space-y-5">
                        <div className="relative">
                          <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-600" />
                            <input
                              type="text" required placeholder="Your Name" value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-600" />
                              <input
                                type="tel" required placeholder="(512) 000-0000" value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">Email (Optional)</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-600" />
                              <input
                                type="email" placeholder="email@address.com" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest block mb-2 ml-1">Project Details</label>
                          <textarea
                            placeholder="Tell us about the issue or project..." rows={3} value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-sm text-white focus:border-emerald-500 outline-none resize-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all">
                          Back
                        </button>
                        <button type="submit" className="flex-[2] bg-emerald-600 text-white hover:bg-emerald-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-900/30 transition-all">
                          Confirm Quote
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <div className="bg-emerald-900/20 border-2 border-emerald-500/20 p-8 rounded-3xl space-y-6">
                        <div className="flex justify-between items-end border-b border-emerald-500/10 pb-6">
                          <div>
                            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest block mb-1">Generated Budget Range</span>
                            <span className="text-4xl font-black text-white">${activeEstimate.toLocaleString()}*</span>
                          </div>
                          <span className="bg-emerald-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-1">Official Draft</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 py-2">
                          <div>
                            <span className="text-slate-500 text-[10px] font-black uppercase block mb-1">Service Node</span>
                            <span className="text-white font-bold text-lg uppercase">{pricingData[projectType].label}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] font-black uppercase block mb-1">Area Factor</span>
                            <span className="text-white font-bold text-lg uppercase">{sqFt.toLocaleString()} FT</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed italic pt-4">
                          *This estimate is generated for planning. A final price is provided after onsite structural inspection by our team.
                        </p>
                      </div>

                      <button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl transition-all">
                        Finish Survey
                      </button>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4 border-l border-slate-800 pl-8 hidden lg:flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-emerald-500 mb-2">
                      <FileText className="h-5 w-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Quote History</span>
                    </div>
                    
                    {quoteHistory.length === 0 ? (
                      <p className="text-slate-600 text-xs italic">No local quote history detected.</p>
                    ) : (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {quoteHistory.map((q) => (
                          <div key={q.id} className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl group hover:border-emerald-500/30 transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[9px] font-black text-emerald-500">{q.id}</span>
                              <button onClick={(e) => handleDeleteHistoryItem(q.id, e)} className="text-slate-700 hover:text-red-400 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-sm font-bold text-white mb-1 truncate">{q.clientName}</div>
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] text-slate-500 font-mono">{q.date}</span>
                              <span className="text-emerald-400 font-black">${q.estimatedCost.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-600 mt-10">Real-time local labor rates applied.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
