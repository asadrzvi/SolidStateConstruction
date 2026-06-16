import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, FileText, Trash2, Phone, Mail, User, Maximize, Ruler, Droplets, HardHat, Wrench, Info } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialService }) {
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('water-remediation');
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notes, setNotes] = useState('');

  // --- SERVICE SPECIFIC STATES ---
  // Water Remediation
  const [sqFt, setSqFt] = useState(500);
  const [contamination, setContamination] = useState(1); // 1: Clean, 2: Grey, 3: Black
  const [moistureDepth, setMoistureDepth] = useState(1); // 1: Surface, 2: Deep

  // Concrete & Roofing
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(20);
  const [thickness, setThickness] = useState(0.33); // in feet (4 inches)

  // Plumbing
  const [materialCost, setMaterialCost] = useState(500);
  const [laborHours, setLaborHours] = useState(4);
  const laborRate = 125;
  const overheadFactor = 0.20; // 20%
  const profitFactor = 0.15; // 15%

  const pricingData = {
    'water-remediation': { 
      label: 'Water Remediation', 
      icon: Droplets,
      description: 'We calculate your quote by measuring the affected square footage, the water’s contamination level, and how deeply materials absorbed moisture.'
    },
    'concrete': { 
      label: 'Concrete & Foundation', 
      icon: HardHat,
      description: 'Calculation: Multiply Length times Width times Thickness (in feet). Divide that total number by 27. Add 10% extra for waste.'
    },
    'roofing': { 
      label: 'Roofing Services', 
      icon: Ruler,
      description: 'Calculation: Multiply house length by house width. Divide that number by 100. Multiply by 1.25 (this safely adds extra for the slant and waste).'
    },
    'plumbing': { 
      label: 'Plumbing Services', 
      icon: Wrench,
      description: 'We calculate based on Materials (pipes, valves, fixtures), Labor (hourly rate), Overhead (gas, insurance, tools), and Profit.'
    },
  };

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
        return Math.floor(sqFt * 5 * contamination * moistureDepth);
      
      case 'concrete':
        const yards = (length * width * thickness) / 27;
        const withWaste = yards * 1.1;
        return Math.floor(withWaste * 150);

      case 'roofing':
        const squares = (length * width) / 100;
        const totalSquares = squares * 1.25;
        return Math.floor(totalSquares * 450);

      case 'plumbing':
        const labor = laborHours * laborRate;
        const overhead = (materialCost + labor) * overheadFactor;
        const profit = (materialCost + labor + overhead) * profitFactor;
        return Math.floor(materialCost + labor + overhead + profit);

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
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      email,
      projectType,
      estimatedCost: activeEstimate,
      date: new Date().toLocaleDateString(),
    };

    const updatedHistory = [newQuote, ...quoteHistory];
    setQuoteHistory(updatedHistory);
    localStorage.setItem('shaans_website_quotes', JSON.stringify(updatedHistory));
    
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
    localStorage.setItem('shaans_website_quotes', JSON.stringify(updated));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl bg-white text-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Sidebar / History */}
            <div className="hidden md:flex w-72 bg-slate-50 border-r border-slate-100 p-8 flex-col">
              <div className="flex items-center gap-3 text-[#004aad] mb-8">
                <FileText size={24} />
                <h3 className="font-bold uppercase tracking-widest text-xs">Recent Quotes</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {quoteHistory.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">No history yet</p>
                ) : (
                  quoteHistory.map((q) => (
                    <div key={q.id} className="bg-white border border-slate-200 p-4 rounded-2xl group relative shadow-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-[#004aad]">{q.id}</span>
                        <button onClick={(e) => handleDeleteHistoryItem(q.id, e)} className="text-slate-300 hover:text-[#dc3545]">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="font-bold text-sm mt-1">{q.clientName}</div>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-[10px] text-slate-400">{q.date}</span>
                        <span className="text-[#dc3545] font-black">${q.estimatedCost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-4xl font-black text-[#004aad] uppercase tracking-tighter leading-none">Instant Quote</h2>
                  <p className="text-slate-500 font-medium mt-2">Professional Grade Estimation Tool</p>
                </div>
                <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-[#004aad]">
                  <X size={28} />
                </button>
              </div>

              {savedSuccess ? (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="h-24 w-24 bg-[#004aad]/10 text-[#004aad] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-[#004aad]">Details Saved!</h3>
                  <p className="text-slate-500 mt-2">We will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div className="space-y-8">
                      {/* Service Selection */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.keys(pricingData).map((key) => {
                          const Icon = pricingData[key].icon;
                          return (
                            <button
                              key={key}
                              onClick={() => setProjectType(key)}
                              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                                projectType === key 
                                  ? 'bg-[#004aad] border-[#004aad] text-white shadow-xl shadow-blue-200 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                              }`}
                            >
                              <Icon size={24} />
                              <span className="text-[10px] font-black uppercase tracking-tight">{pricingData[key].label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Calculation Method Description */}
                      <div className="bg-[#004aad]/5 border border-[#004aad]/10 p-5 rounded-2xl flex items-start gap-4">
                        <Info className="text-[#004aad] shrink-0 mt-0.5" size={20} />
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          {pricingData[projectType].description}
                        </p>
                      </div>

                      {/* Dynamic Inputs */}
                      <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100">
                        {projectType === 'water-remediation' && (
                          <div className="space-y-8">
                            <div className="space-y-4">
                              <div className="flex justify-between font-bold text-xs uppercase text-[#004aad]">
                                <span>Affected Area</span>
                                <span>{sqFt} Sq Ft</span>
                              </div>
                              <input type="range" min="1" max="5000" step="1" value={sqFt} onChange={(e) => setSqFt(Number(e.target.value))} className="w-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400">Contamination Level</label>
                                <div className="flex gap-2">
                                  {['Clean', 'Grey', 'Black'].map((label, i) => (
                                    <button key={label} onClick={() => setContamination(i + 1)} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg border-2 transition-all ${contamination === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400">Moisture Depth</label>
                                <div className="flex gap-2">
                                  {['Surface', 'Deep'].map((label, i) => (
                                    <button key={label} onClick={() => setMoistureDepth(i + 1)} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg border-2 transition-all ${moistureDepth === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {(projectType === 'concrete' || projectType === 'roofing') && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-8">
                              <div className="space-y-4">
                                <div className="flex justify-between font-bold text-xs uppercase text-[#004aad]"><span>Length</span><span>{length} Ft</span></div>
                                <input type="range" min="1" max="5000" step="1" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
                              </div>
                              <div className="space-y-4">
                                <div className="flex justify-between font-bold text-xs uppercase text-[#004aad]"><span>Width</span><span>{width} Ft</span></div>
                                <input type="range" min="1" max="5000" step="1" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full" />
                              </div>
                            </div>
                            <div className="flex flex-col justify-center bg-white border border-slate-100 rounded-3xl p-6 text-center">
                              <div className="text-slate-400 text-[10px] font-black uppercase mb-1">{projectType === 'concrete' ? 'Total Volume' : 'Total Squares'}</div>
                              <div className="text-3xl font-black text-[#004aad]">
                                {projectType === 'concrete' 
                                  ? `${((length * width * thickness) / 27).toFixed(1)} CU YD` 
                                  : `${((length * width) / 100).toFixed(1)} SQ`}
                              </div>
                              {projectType === 'concrete' && (
                                <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
                                  <label className="text-[10px] font-black uppercase text-slate-400">Thickness (Inches)</label>
                                  <div className="flex gap-2">
                                    {[0.33, 0.5, 0.66].map((val) => (
                                      <button key={val} onClick={() => setThickness(val)} className={`flex-1 py-2 text-[10px] font-bold rounded-lg border-2 ${thickness === val ? 'bg-[#004aad] border-[#004aad] text-white' : 'bg-white border-slate-200'}`}>{Math.round(val * 12)}"</button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {projectType === 'plumbing' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400">Materials Cost ($)</label>
                                <input type="number" value={materialCost} onChange={(e) => setMaterialCost(Number(e.target.value))} className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-[#004aad] outline-none font-bold" />
                              </div>
                              <div className="space-y-4">
                                <div className="flex justify-between font-bold text-xs uppercase text-[#004aad]"><span>Labor Hours</span><span>{laborHours} HRS</span></div>
                                <input type="range" min="1" max="5000" step="1" value={laborHours} onChange={(e) => setLaborHours(Number(e.target.value))} className="w-full" />
                              </div>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-3">
                              <div className="flex justify-between text-xs font-bold text-slate-500"><span>Overhead (20%)</span><span>+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span></div>
                              <div className="flex justify-between text-xs font-bold text-slate-500"><span>Profit (15%)</span><span>+${((materialCost + laborHours * laborRate) * 1.2 * profitFactor).toLocaleString()}</span></div>
                              <div className="pt-3 border-t border-slate-50 text-[10px] text-slate-400 italic">Includes gas, insurance, and tools.</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-100">
                        <div className="text-center md:text-left">
                          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Estimated Project Budget</span>
                          <span className="text-5xl font-black text-[#dc3545]">${activeEstimate.toLocaleString()}*</span>
                        </div>
                        <button onClick={() => setStep(2)} className="w-full md:w-auto bg-[#004aad] hover:bg-[#003882] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-blue-200">
                          Next: Client Details &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleSaveQuote} className="space-y-8">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input type="text" required placeholder="John Doe" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-5 pl-12 rounded-2xl border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input type="tel" required placeholder="(512) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-5 pl-12 rounded-2xl border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email (Optional)</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                              <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-5 pl-12 rounded-2xl border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Additional Project Notes</label>
                          <textarea rows={4} placeholder="Describe any specific requirements..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-5 rounded-2xl border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold resize-none" />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-200 transition-all">Back</button>
                        <button type="submit" className="flex-[2] bg-[#004aad] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-100 hover:bg-[#003882] transition-all">Generate & Save Quote</button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <div className="space-y-10">
                      <div className="bg-[#004aad]/5 border-2 border-[#004aad]/10 p-10 rounded-[3rem] text-center space-y-6">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#004aad]">Official Estimate Summary</div>
                        <div className="text-6xl font-black text-[#dc3545]">${activeEstimate.toLocaleString()}</div>
                        <div className="flex justify-center gap-8 text-xs font-bold text-slate-500 uppercase">
                          <span>Service: {pricingData[projectType].label}</span>
                          <span>|</span>
                          <span>Ref: {Math.floor(10000 + Math.random() * 90000)}</span>
                        </div>
                        <p className="max-w-lg mx-auto text-sm text-slate-500 font-medium leading-relaxed italic pt-4">
                          This budget estimate is for planning purposes. A final binding quote will be issued after a structural inspection by our site engineers.
                        </p>
                      </div>
                      <button onClick={onClose} className="w-full bg-[#004aad] text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-[#003882] transition-all">Complete Quote Request</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
