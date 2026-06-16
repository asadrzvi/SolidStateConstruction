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
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 backdrop-blur-md p-2">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-[99vw] h-[99vh] bg-white text-slate-900 rounded-[2.5rem] border-4 border-[#004aad]/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar / History */}
            <div className="hidden md:flex w-[450px] bg-slate-50 border-r-2 border-slate-100 p-12 flex-col overflow-hidden">
              <div className="flex items-center gap-4 text-[#004aad] mb-12 shrink-0">
                <FileText size={32} />
                <h3 className="font-bold uppercase tracking-widest text-lg">Quote History</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                {quoteHistory.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">No history yet</p>
                ) : (
                  quoteHistory.map((q) => (
                    <div key={q.id} className="bg-white border-2 border-slate-100 p-6 rounded-[2rem] group relative shadow-sm hover:border-[#004aad]/30 transition-all shrink-0">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-black text-[#004aad]">{q.id}</span>
                        <button onClick={(e) => handleDeleteHistoryItem(q.id, e)} className="text-slate-300 hover:text-[#dc3545]">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="font-black text-xl mt-3">{q.clientName}</div>
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-xs text-slate-400 font-bold">{q.date}</span>
                        <span className="text-[#dc3545] font-black text-2xl">${q.estimatedCost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-12 md:p-20 overflow-y-auto">
              <div className="flex justify-between items-start mb-16 shrink-0">
                <div>
                  <h2 className="text-8xl font-black text-[#004aad] uppercase tracking-tighter leading-none">Instant Quote</h2>
                  <p className="text-slate-500 text-2xl font-medium mt-6">Professional Grade Estimation Tool</p>
                </div>
                <button onClick={onClose} className="p-5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-[#004aad]">
                  <X size={48} />
                </button>
              </div>

              <div className="min-h-0">
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
                      <div className="space-y-16 pb-12">
                        {/* Service Selection */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 shrink-0">
                          {Object.keys(pricingData).map((key) => {
                            const Icon = pricingData[key].icon;
                            return (
                              <button
                                key={key}
                                onClick={() => setProjectType(key)}
                                className={`p-10 rounded-[2.5rem] border-4 flex flex-col items-center gap-6 transition-all ${
                                  projectType === key 
                                    ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl shadow-blue-200 -translate-y-3' 
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                              >
                                <Icon size={48} />
                                <span className="text-sm font-black uppercase tracking-[0.2em] text-center">{pricingData[key].label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Calculation Method Description */}
                        <div className="bg-[#004aad]/5 border-2 border-[#004aad]/10 p-10 rounded-[2.5rem] flex items-start gap-8 shrink-0">
                          <div className="bg-[#004aad] text-white p-5 rounded-3xl shadow-2xl shadow-blue-100">
                            <Info size={40} />
                          </div>
                          <p className="text-2xl text-slate-700 font-black leading-relaxed">
                            {pricingData[projectType].description}
                          </p>
                        </div>

                        {/* Dynamic Inputs */}
                        <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 border-2 border-slate-100 shadow-inner">
                          {projectType === 'water-remediation' && (
                            <div className="space-y-16">
                              <div className="space-y-8">
                                <div className="flex justify-between font-black text-lg uppercase text-[#004aad]">
                                  <span>Affected Area</span>
                                  <span className="text-5xl">{sqFt} Sq Ft</span>
                                </div>
                                <input type="range" min="1" max="5000" step="1" value={sqFt} onChange={(e) => setSqFt(Number(e.target.value))} className="w-full h-6" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                  <label className="text-sm font-black uppercase text-slate-400 tracking-widest">Contamination Level</label>
                                  <div className="flex gap-6">
                                    {['Clean', 'Grey', 'Black'].map((label, i) => (
                                      <button key={label} onClick={() => setContamination(i + 1)} className={`flex-1 py-8 text-lg font-black uppercase rounded-[2rem] border-4 transition-all ${contamination === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <label className="text-sm font-black uppercase text-slate-400 tracking-widest">Moisture Depth</label>
                                  <div className="flex gap-6">
                                    {['Surface', 'Deep'].map((label, i) => (
                                      <button key={label} onClick={() => setMoistureDepth(i + 1)} className={`flex-1 py-8 text-lg font-black uppercase rounded-[2rem] border-4 transition-all ${moistureDepth === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {(projectType === 'concrete' || projectType === 'roofing') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                              <div className="space-y-16">
                                <div className="space-y-8">
                                  <div className="flex justify-between font-black text-lg uppercase text-[#004aad]"><span>Length</span><span className="text-5xl">{length} Ft</span></div>
                                  <input type="range" min="1" max="5000" step="1" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-6" />
                                </div>
                                <div className="space-y-8">
                                  <div className="flex justify-between font-black text-lg uppercase text-[#004aad]"><span>Width</span><span className="text-5xl">{width} Ft</span></div>
                                  <input type="range" min="1" max="5000" step="1" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full h-6" />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center bg-white border-4 border-slate-100 rounded-[4rem] p-16 text-center shadow-2xl">
                                <div className="text-slate-400 text-sm font-black uppercase mb-4 tracking-[0.2em]">{projectType === 'concrete' ? 'Total Volume' : 'Total Squares'}</div>
                                <div className="text-8xl font-black text-[#004aad] tracking-tighter leading-none">
                                  {projectType === 'concrete' 
                                    ? `${((length * width * thickness) / 27).toFixed(1)} CU YD` 
                                    : `${((length * width) / 100).toFixed(1)} SQ`}
                                </div>
                                {projectType === 'concrete' && (
                                  <div className="mt-12 pt-12 border-t-2 border-slate-50 space-y-8">
                                    <label className="text-sm font-black uppercase text-slate-400 tracking-widest">Thickness (Inches)</label>
                                    <div className="flex gap-6">
                                      {[0.33, 0.5, 0.66].map((val) => (
                                        <button key={val} onClick={() => setThickness(val)} className={`flex-1 py-8 text-lg font-black rounded-[2rem] border-4 ${thickness === val ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl' : 'bg-white border-slate-200'}`}>{Math.round(val * 12)}"</button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {projectType === 'plumbing' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                              <div className="space-y-12">
                                <div className="space-y-6">
                                  <label className="text-sm font-black uppercase text-slate-400 ml-4 tracking-widest">Materials Cost ($)</label>
                                  <input type="number" value={materialCost} onChange={(e) => setMaterialCost(Number(e.target.value))} className="w-full p-10 rounded-[2.5rem] border-4 border-slate-200 focus:border-[#004aad] outline-none font-black text-5xl shadow-inner" />
                                </div>
                                <div className="space-y-8">
                                  <div className="flex justify-between font-black text-lg uppercase text-[#004aad]"><span>Labor Hours</span><span className="text-5xl">{laborHours} HRS</span></div>
                                  <input type="range" min="1" max="5000" step="1" value={laborHours} onChange={(e) => setLaborHours(Number(e.target.value))} className="w-full h-6" />
                                </div>
                              </div>
                              <div className="bg-white border-4 border-slate-100 rounded-[4rem] p-16 space-y-10 shadow-2xl">
                                <div className="flex justify-between text-3xl font-black text-slate-500"><span>Overhead (20%)</span><span className="text-[#004aad]">+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span></div>
                                <div className="flex justify-between text-3xl font-black text-slate-500"><span>Profit (15%)</span><span className="text-[#004aad]">+${((materialCost + laborHours * laborRate) * 1.2 * profitFactor).toLocaleString()}</span></div>
                                <div className="pt-10 border-t-2 border-slate-50 text-base text-slate-400 font-bold italic">Includes gas, insurance, and professional-grade specialized tools.</div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 pt-16 border-t-4 border-slate-100">
                          <div className="text-center lg:text-left">
                            <span className="text-sm text-slate-400 uppercase font-black tracking-[0.4em] block mb-4">Final Estimated Project Budget</span>
                            <span className="text-9xl font-black text-[#dc3545] tracking-tighter leading-none">${activeEstimate.toLocaleString()}*</span>
                          </div>
                          <button onClick={() => setStep(2)} className="w-full lg:w-auto bg-[#004aad] hover:bg-[#003882] text-white px-24 py-10 rounded-[3rem] font-black uppercase tracking-[0.2em] text-2xl transition-all shadow-2xl shadow-blue-100 scale-105 hover:scale-110">
                            Proceed: Client Details &rarr;
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSaveQuote} className="space-y-16 pb-12">
                        <div className="grid grid-cols-1 gap-12">
                          <div className="space-y-6">
                            <label className="text-sm font-black uppercase text-slate-400 ml-8 tracking-widest">Full Client Name</label>
                            <div className="relative">
                              <User className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300" size={40} />
                              <input type="text" required placeholder="John Doe" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-10 pl-24 rounded-[3rem] border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-2xl shadow-inner" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                              <label className="text-sm font-black uppercase text-slate-400 ml-8 tracking-widest">Phone Number</label>
                              <div className="relative">
                                <Phone className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300" size={40} />
                                <input type="tel" required placeholder="(512) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-10 pl-24 rounded-[3rem] border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-2xl shadow-inner" />
                              </div>
                            </div>
                            <div className="space-y-6">
                              <label className="text-sm font-black uppercase text-slate-400 ml-8 tracking-widest">Email Address</label>
                              <div className="relative">
                                <Mail className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300" size={40} />
                                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-10 pl-24 rounded-[3rem] border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-2xl shadow-inner" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <label className="text-sm font-black uppercase text-slate-400 ml-8 tracking-widest">Project Details & Property Requirements</label>
                            <textarea rows={6} placeholder="Describe any specific requirements, property access details, or timing..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-12 rounded-[4rem] border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-2xl shadow-inner resize-none" />
                          </div>
                        </div>

                        <div className="flex gap-10 pt-10">
                          <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-500 py-10 rounded-[3rem] font-black uppercase tracking-widest text-lg hover:bg-slate-200 transition-all">Back to calculation</button>
                          <button type="submit" className="flex-[2] bg-[#004aad] text-white py-10 rounded-[3rem] font-black uppercase tracking-[0.2em] text-2xl shadow-2xl shadow-blue-100 hover:bg-[#003882] transition-all">Submit Quote Request</button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="space-y-20 pb-12 text-center">
                        <div className="bg-[#004aad]/5 border-4 border-[#004aad]/10 p-24 rounded-[6rem] space-y-12 shadow-inner">
                          <div className="text-sm font-black uppercase tracking-[0.5em] text-[#004aad]">Official Project Estimate Summary</div>
                          <div className="text-[12rem] font-black text-[#dc3545] tracking-tighter leading-none shadow-sm">${activeEstimate.toLocaleString()}</div>
                          <div className="flex justify-center gap-16 text-2xl font-black text-slate-500 uppercase">
                            <span>Service: {pricingData[projectType].label}</span>
                            <span className="text-slate-200">|</span>
                            <span>Ref: {Math.floor(10000 + Math.random() * 90000)}</span>
                          </div>
                          <p className="max-w-4xl mx-auto text-2xl text-slate-600 font-bold leading-relaxed italic pt-12">
                            This preliminary estimate is based on regional material and labor averages. A final binding quote will be issued following a comprehensive structural evaluation by our specialized master engineering team.
                          </p>
                        </div>
                        <button onClick={onClose} className="w-full bg-[#004aad] text-white py-12 rounded-[4rem] font-black uppercase tracking-[0.4em] text-2xl shadow-2xl hover:bg-[#003882] transition-all">Return to Website Home</button>
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
