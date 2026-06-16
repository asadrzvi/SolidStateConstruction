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
            className="relative w-full max-w-[98vw] h-[98vh] bg-white text-slate-900 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar / History */}
            <div className="hidden md:flex w-96 bg-slate-50 border-r border-slate-100 p-10 flex-col">
              <div className="flex items-center gap-3 text-[#004aad] mb-10">
                <FileText size={28} />
                <h3 className="font-bold uppercase tracking-widest text-sm">Quote History</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {quoteHistory.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">No history yet</p>
                ) : (
                  quoteHistory.map((q) => (
                    <div key={q.id} className="bg-white border border-slate-200 p-5 rounded-3xl group relative shadow-sm hover:border-[#004aad]/20 transition-all">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-[#004aad]">{q.id}</span>
                        <button onClick={(e) => handleDeleteHistoryItem(q.id, e)} className="text-slate-300 hover:text-[#dc3545]">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="font-bold text-base mt-2">{q.clientName}</div>
                      <div className="flex justify-between items-end mt-3">
                        <span className="text-[10px] text-slate-400">{q.date}</span>
                        <span className="text-[#dc3545] font-black text-lg">${q.estimatedCost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 md:p-16 overflow-y-auto">
              <div className="flex justify-between items-start mb-14">
                <div>
                  <h2 className="text-6xl font-black text-[#004aad] uppercase tracking-tighter leading-none">Instant Quote</h2>
                  <p className="text-slate-500 text-lg font-medium mt-4">Professional Grade Estimation Tool</p>
                </div>
                <button onClick={onClose} className="p-4 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-[#004aad]">
                  <X size={36} />
                </button>
              </div>

              {savedSuccess ? (
                <div className="py-24 text-center flex flex-col items-center">
                  <div className="h-28 w-28 bg-[#004aad]/10 text-[#004aad] rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={56} />
                  </div>
                  <h3 className="text-4xl font-black uppercase text-[#004aad]">Details Saved!</h3>
                  <p className="text-slate-500 text-lg mt-4">We will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div className="space-y-12">
                      {/* Service Selection */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.keys(pricingData).map((key) => {
                          const Icon = pricingData[key].icon;
                          return (
                            <button
                              key={key}
                              onClick={() => setProjectType(key)}
                              className={`p-8 rounded-[2rem] border-2 flex flex-col items-center gap-4 transition-all ${
                                projectType === key 
                                  ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl shadow-blue-200 -translate-y-2' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                              }`}
                            >
                              <Icon size={32} />
                              <span className="text-xs font-black uppercase tracking-widest text-center">{pricingData[key].label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Calculation Method Description */}
                      <div className="bg-[#004aad]/5 border border-[#004aad]/10 p-8 rounded-[2rem] flex items-start gap-6">
                        <div className="bg-[#004aad] text-white p-3 rounded-2xl shadow-lg shadow-blue-100">
                          <Info size={28} />
                        </div>
                        <p className="text-xl text-slate-700 font-bold leading-relaxed">
                          {pricingData[projectType].description}
                        </p>
                      </div>

                      {/* Dynamic Inputs */}
                      <div className="bg-slate-50 rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-inner">
                        {projectType === 'water-remediation' && (
                          <div className="space-y-12">
                            <div className="space-y-6">
                              <div className="flex justify-between font-bold text-sm uppercase text-[#004aad]">
                                <span>Affected Area</span>
                                <span className="text-3xl">{sqFt} Sq Ft</span>
                              </div>
                              <input type="range" min="1" max="5000" step="1" value={sqFt} onChange={(e) => setSqFt(Number(e.target.value))} className="w-full h-4" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div className="space-y-4">
                                <label className="text-xs font-black uppercase text-slate-400">Contamination Level</label>
                                <div className="flex gap-4">
                                  {['Clean', 'Grey', 'Black'].map((label, i) => (
                                    <button key={label} onClick={() => setContamination(i + 1)} className={`flex-1 py-5 text-sm font-black uppercase rounded-2xl border-2 transition-all ${contamination === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <label className="text-xs font-black uppercase text-slate-400">Moisture Depth</label>
                                <div className="flex gap-4">
                                  {['Surface', 'Deep'].map((label, i) => (
                                    <button key={label} onClick={() => setMoistureDepth(i + 1)} className={`flex-1 py-5 text-sm font-black uppercase rounded-2xl border-2 transition-all ${moistureDepth === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {(projectType === 'concrete' || projectType === 'roofing') && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-12">
                              <div className="space-y-6">
                                <div className="flex justify-between font-bold text-sm uppercase text-[#004aad]"><span>Length</span><span className="text-3xl">{length} Ft</span></div>
                                <input type="range" min="1" max="5000" step="1" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-4" />
                              </div>
                              <div className="space-y-6">
                                <div className="flex justify-between font-bold text-sm uppercase text-[#004aad]"><span>Width</span><span className="text-3xl">{width} Ft</span></div>
                                <input type="range" min="1" max="5000" step="1" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full h-4" />
                              </div>
                            </div>
                            <div className="flex flex-col justify-center bg-white border border-slate-100 rounded-[3rem] p-12 text-center shadow-md">
                              <div className="text-slate-400 text-xs font-black uppercase mb-3">{projectType === 'concrete' ? 'Total Volume' : 'Total Squares'}</div>
                              <div className="text-6xl font-black text-[#004aad] tracking-tighter">
                                {projectType === 'concrete' 
                                  ? `${((length * width * thickness) / 27).toFixed(1)} CU YD` 
                                  : `${((length * width) / 100).toFixed(1)} SQ`}
                              </div>
                              {projectType === 'concrete' && (
                                <div className="mt-10 pt-10 border-t border-slate-50 space-y-5">
                                  <label className="text-xs font-black uppercase text-slate-400">Thickness (Inches)</label>
                                  <div className="flex gap-4">
                                    {[0.33, 0.5, 0.66].map((val) => (
                                      <button key={val} onClick={() => setThickness(val)} className={`flex-1 py-5 text-sm font-black rounded-2xl border-2 ${thickness === val ? 'bg-[#004aad] border-[#004aad] text-white shadow-lg' : 'bg-white border-slate-200'}`}>{Math.round(val * 12)}"</button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {projectType === 'plumbing' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-10">
                              <div className="space-y-4">
                                <label className="text-xs font-black uppercase text-slate-400 ml-2">Materials Cost ($)</label>
                                <input type="number" value={materialCost} onChange={(e) => setMaterialCost(Number(e.target.value))} className="w-full p-8 rounded-[2rem] border-2 border-slate-200 focus:border-[#004aad] outline-none font-black text-3xl shadow-sm" />
                              </div>
                              <div className="space-y-6">
                                <div className="flex justify-between font-bold text-sm uppercase text-[#004aad]"><span>Labor Hours</span><span className="text-3xl">{laborHours} HRS</span></div>
                                <input type="range" min="1" max="5000" step="1" value={laborHours} onChange={(e) => setLaborHours(Number(e.target.value))} className="w-full h-4" />
                              </div>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-[3rem] p-12 space-y-8 shadow-md">
                              <div className="flex justify-between text-xl font-bold text-slate-500"><span>Overhead (20%)</span><span className="text-[#004aad]">+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span></div>
                              <div className="flex justify-between text-xl font-bold text-slate-500"><span>Profit (15%)</span><span className="text-[#004aad]">+${((materialCost + laborHours * laborRate) * 1.2 * profitFactor).toLocaleString()}</span></div>
                              <div className="pt-8 border-t border-slate-50 text-sm text-slate-400 italic">Includes gas, insurance, and professional-grade tools.</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 pt-12 border-t border-slate-100">
                        <div className="text-center lg:text-left">
                          <span className="text-sm text-slate-400 uppercase font-black tracking-[0.3em] block mb-3">Estimated Project Budget</span>
                          <span className="text-8xl font-black text-[#dc3545] tracking-tighter">${activeEstimate.toLocaleString()}*</span>
                        </div>
                        <button onClick={() => setStep(2)} className="w-full lg:w-auto bg-[#004aad] hover:bg-[#003882] text-white px-20 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-xl transition-all shadow-2xl shadow-blue-100 scale-105 hover:scale-110">
                          Next: Client Details &rarr;
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <form onSubmit={handleSaveQuote} className="space-y-12">
                      <div className="grid grid-cols-1 gap-10">
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase text-slate-400 ml-4">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={32} />
                            <input type="text" required placeholder="John Doe" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-8 pl-20 rounded-[2.5rem] border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold text-xl shadow-sm" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-xs font-black uppercase text-slate-400 ml-4">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={32} />
                              <input type="tel" required placeholder="(512) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-8 pl-20 rounded-[2.5rem] border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold text-xl shadow-sm" />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label className="text-xs font-black uppercase text-slate-400 ml-4">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300" size={32} />
                              <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-8 pl-20 rounded-[2.5rem] border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold text-xl shadow-sm" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-black uppercase text-slate-400 ml-4">Project Details & Requirements</label>
                          <textarea rows={6} placeholder="Describe any specific requirements or property details..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-10 rounded-[3rem] border-2 border-slate-100 focus:border-[#004aad] outline-none font-bold text-xl shadow-sm resize-none" />
                        </div>
                      </div>

                      <div className="flex gap-8 pt-8">
                        <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-500 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-sm hover:bg-slate-200 transition-all">Back to calculation</button>
                        <button type="submit" className="flex-[2] bg-[#004aad] text-white py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-xl shadow-2xl shadow-blue-100 hover:bg-[#003882] transition-all">Submit Quote Request</button>
                      </div>
                    </form>
                  )}

                  {step === 3 && (
                    <div className="space-y-16">
                      <div className="bg-[#004aad]/5 border-2 border-[#004aad]/10 p-20 rounded-[5rem] text-center space-y-10 shadow-inner">
                        <div className="text-sm font-black uppercase tracking-[0.4em] text-[#004aad]">Official Estimate Summary</div>
                        <div className="text-[10rem] font-black text-[#dc3545] tracking-tighter leading-none">${activeEstimate.toLocaleString()}</div>
                        <div className="flex justify-center gap-12 text-lg font-black text-slate-500 uppercase">
                          <span>Service: {pricingData[projectType].label}</span>
                          <span className="text-slate-200">|</span>
                          <span>Ref: {Math.floor(10000 + Math.random() * 90000)}</span>
                        </div>
                        <p className="max-w-3xl mx-auto text-xl text-slate-600 font-bold leading-relaxed italic pt-10">
                          This estimate is based on current material and labor rates. A final binding quote will be issued following a comprehensive structural evaluation by our specialized engineering team.
                        </p>
                      </div>
                      <button onClick={onClose} className="w-full bg-[#004aad] text-white py-10 rounded-[3rem] font-black uppercase tracking-[0.3em] text-xl shadow-2xl hover:bg-[#003882] transition-all">Return to Website</button>
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
