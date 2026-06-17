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
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 backdrop-blur-md p-2 md:p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-[99vw] h-[99vh] max-h-[99vh] bg-white text-slate-900 rounded-[2.5rem] border-2 md:border-4 border-[#004aad]/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar / History */}
            <div className="hidden lg:flex w-56 xl:w-60 bg-slate-50 border-r border-slate-100 p-4 flex-col overflow-hidden shrink-0">
              <div className="flex items-center gap-2 text-[#004aad]/70 mb-6 shrink-0">
                <FileText size={16} />
                <h3 className="font-bold uppercase tracking-widest text-[10px]">Quote History</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {quoteHistory.length === 0 ? (
                  <p className="text-slate-400 text-[9px] italic text-center mt-10">No history yet</p>
                ) : (
                  quoteHistory.map((q) => (
                    <div key={q.id} className="bg-white border border-slate-100 p-3 rounded-lg group relative shadow-sm hover:border-[#004aad]/20 transition-all shrink-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[8px] font-bold text-[#004aad]/50 uppercase tracking-tighter">{q.id}</span>
                        <button onClick={(e) => handleDeleteHistoryItem(q.id, e)} className="text-slate-200 hover:text-[#dc3545] transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="font-bold text-xs text-slate-700 leading-tight truncate" title={q.clientName}>{q.clientName}</div>
                      <div className="flex justify-between items-end mt-1.5">
                        <span className="text-[8px] text-slate-400 font-medium">{q.date}</span>
                        <span className="text-[#dc3545] font-black text-sm">${q.estimatedCost.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <p className="text-[8px] text-slate-400 mt-4 text-center">Local rates applied</p>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 xl:p-20 overflow-y-auto flex flex-col">
              <div className="flex justify-between items-start mb-10 md:mb-16 shrink-0">
                <div>
                  <h2 className="text-4xl md:text-6xl xl:text-7xl font-black text-[#004aad] uppercase tracking-tighter leading-none">Instant Quote</h2>
                  <p className="text-slate-500 text-base md:text-xl font-medium mt-3 md:mt-6">Professional Grade Estimation Tool</p>
                </div>
                <button onClick={onClose} className="p-3 md:p-5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-[#004aad]">
                  <X size={32} className="md:w-12 md:h-12" />
                </button>
              </div>

              <div className="flex-1">
                {savedSuccess ? (
                  <div className="py-20 md:py-24 text-center flex flex-col items-center">
                    <div className="h-20 w-20 md:h-28 md:w-28 bg-[#004aad]/10 text-[#004aad] rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={48} className="md:w-14 md:h-14" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase text-[#004aad]">Details Saved!</h3>
                    <p className="text-slate-500 text-lg mt-4">We will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div className="space-y-10 md:space-y-16 pb-12">
                        {/* Service Selection */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 shrink-0">
                          {Object.keys(pricingData).map((key) => {
                            const Icon = pricingData[key].icon;
                            return (
                              <button
                                key={key}
                                onClick={() => setProjectType(key)}
                                className={`p-6 md:p-8 xl:p-10 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 flex flex-col items-center gap-4 md:gap-6 transition-all ${
                                  projectType === key 
                                    ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl shadow-blue-200 -translate-y-2' 
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                              >
                                <Icon size={32} className="md:w-12 md:h-12" />
                                <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-center leading-tight">{pricingData[key].label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Calculation Method Description */}
                        <div className="bg-[#004aad]/5 border-2 border-[#004aad]/10 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] flex items-start gap-4 md:gap-8 shrink-0">
                          <div className="bg-[#004aad] text-white p-3 md:p-5 rounded-xl md:rounded-3xl shadow-2xl shadow-blue-100 shrink-0">
                            <Info size={24} className="md:w-10 md:h-10" />
                          </div>
                          <p className="text-base md:text-xl xl:text-2xl text-slate-700 font-bold leading-relaxed">
                            {pricingData[projectType].description}
                          </p>
                        </div>

                        {/* Dynamic Inputs */}
                        <div className="bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 xl:p-20 border-2 border-slate-100 shadow-inner">
                          {projectType === 'water-remediation' && (
                            <div className="space-y-12 md:space-y-16">
                              <div className="space-y-6 md:space-y-8">
                                <div className="flex justify-between font-black text-sm md:text-lg uppercase text-[#004aad]">
                                  <span>Affected Area</span>
                                  <span className="text-3xl md:text-5xl">{sqFt.toLocaleString()} Sq Ft</span>
                                </div>
                                <input type="range" min="1" max="5000" step="1" value={sqFt} onChange={(e) => setSqFt(Number(e.target.value))} className="w-full h-4 md:h-6" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                                <div className="space-y-4 md:space-y-6">
                                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Contamination Level</label>
                                  <div className="flex gap-4">
                                    {['Clean', 'Grey', 'Black'].map((label, i) => (
                                      <button key={label} onClick={() => setContamination(i + 1)} className={`flex-1 py-4 md:py-8 text-base md:text-lg font-black uppercase rounded-xl md:rounded-[2rem] border-2 md:border-4 transition-all ${contamination === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Moisture Depth</label>
                                  <div className="flex gap-4">
                                    {['Surface', 'Deep'].map((label, i) => (
                                      <button key={label} onClick={() => setMoistureDepth(i + 1)} className={`flex-1 py-4 md:py-8 text-base md:text-lg font-black uppercase rounded-xl md:rounded-[2rem] border-2 md:border-4 transition-all ${moistureDepth === i + 1 ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-500'}`}>{label}</button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {(projectType === 'concrete' || projectType === 'roofing') && (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:gap-20">
                              <div className="space-y-12 md:space-y-16">
                                <div className="space-y-6 md:space-y-8">
                                  <div className="flex justify-between font-black text-sm md:text-lg uppercase text-[#004aad]"><span>Length</span><span className="text-3xl md:text-5xl">{length.toLocaleString()} Ft</span></div>
                                  <input type="range" min="1" max="5000" step="1" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full h-4 md:h-6" />
                                </div>
                                <div className="space-y-6 md:space-y-8">
                                  <div className="flex justify-between font-black text-sm md:text-lg uppercase text-[#004aad]"><span>Width</span><span className="text-3xl md:text-5xl">{width.toLocaleString()} Ft</span></div>
                                  <input type="range" min="1" max="5000" step="1" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full h-4 md:h-6" />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center bg-white border-2 md:border-4 border-slate-100 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-center shadow-2xl">
                                <div className="text-slate-400 text-xs font-black uppercase mb-4 tracking-[0.2em]">{projectType === 'concrete' ? 'Total Volume' : 'Total Squares'}</div>
                                <div className="text-5xl md:text-7xl xl:text-8xl font-black text-[#004aad] tracking-tighter leading-none">
                                  {projectType === 'concrete' 
                                    ? `${((length * width * thickness) / 27).toFixed(1)} CU YD` 
                                    : `${((length * width) / 100).toFixed(1)} SQ`}
                                </div>
                                {projectType === 'concrete' && (
                                  <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t-2 border-slate-50 space-y-6 md:space-y-8">
                                    <label className="text-xs md:text-sm font-black uppercase text-slate-400 tracking-widest">Thickness (Inches)</label>
                                    <div className="flex gap-4 md:gap-6">
                                      {[0.33, 0.5, 0.66].map((val) => (
                                        <button key={val} onClick={() => setThickness(val)} className={`flex-1 py-4 md:py-8 text-base md:text-lg font-black rounded-xl md:rounded-[2rem] border-2 md:border-4 ${thickness === val ? 'bg-[#004aad] border-[#004aad] text-white shadow-2xl' : 'bg-white border-slate-200'}`}>{Math.round(val * 12)}"</button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {projectType === 'plumbing' && (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:gap-16">
                              <div className="space-y-10 xl:space-y-12">
                                <div className="space-y-4 md:space-y-6">
                                  <label className="text-xs md:text-sm font-black uppercase text-slate-400 ml-4 tracking-widest">Materials Cost ($)</label>
                                  <input type="number" value={materialCost} onChange={(e) => setMaterialCost(Number(e.target.value))} className="w-full p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-slate-200 focus:border-[#004aad] outline-none font-black text-2xl md:text-5xl shadow-inner" />
                                </div>
                                <div className="space-y-6 md:space-y-8">
                                  <div className="flex justify-between font-black text-sm md:text-lg uppercase text-[#004aad]"><span>Labor Hours</span><span className="text-3xl md:text-5xl">{laborHours.toLocaleString()} HRS</span></div>
                                  <input type="range" min="1" max="5000" step="1" value={laborHours} onChange={(e) => setLaborHours(Number(e.target.value))} className="w-full h-4 md:h-6" />
                                </div>
                              </div>
                              <div className="bg-white border-2 md:border-4 border-slate-100 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 space-y-6 md:space-y-10 shadow-2xl flex flex-col justify-center">
                                <div className="flex justify-between text-xl md:text-3xl font-black text-slate-500 leading-tight"><span>Overhead (20%)</span><span className="text-[#004aad]">+${((materialCost + laborHours * laborRate) * overheadFactor).toLocaleString()}</span></div>
                                <div className="flex justify-between text-xl md:text-3xl font-black text-slate-500 leading-tight"><span>Profit (15%)</span><span className="text-[#004aad]">+${((materialCost + laborHours * laborRate) * 1.2 * profitFactor).toLocaleString()}</span></div>
                                <div className="pt-6 md:pt-10 border-t-2 border-slate-50 text-sm md:text-base text-slate-400 font-bold italic leading-relaxed">Includes gas, insurance, and professional-grade specialized tools.</div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col xl:flex-row justify-between items-center gap-10 md:gap-16 pt-10 md:pt-16 border-t-2 md:border-t-4 border-slate-100 shrink-0">
                          <div className="text-center xl:text-left">
                            <span className="text-xs md:text-sm text-slate-400 uppercase font-black tracking-[0.4em] block mb-3 md:mb-4">Final Estimated Project Budget</span>
                            <span className="text-6xl md:text-8xl xl:text-9xl font-black text-[#dc3545] tracking-tighter leading-none">${activeEstimate.toLocaleString()}*</span>
                          </div>
                          <button onClick={() => setStep(2)} className="w-full xl:w-auto bg-[#004aad] hover:bg-[#003882] text-white px-12 md:px-24 py-6 md:py-10 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-[0.2em] text-lg md:text-2xl transition-all shadow-2xl shadow-blue-100 hover:scale-105">
                            Proceed: Client Details &rarr;
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSaveQuote} className="space-y-12 md:space-y-16 pb-12 flex-1">
                        <div className="grid grid-cols-1 gap-10 md:gap-12">
                          <div className="space-y-4 md:space-y-6">
                            <label className="text-xs md:text-sm font-black uppercase text-slate-400 ml-6 md:ml-8 tracking-widest">Full Client Name</label>
                            <div className="relative">
                              <User className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-slate-300 w-8 h-8 md:w-10 md:h-10" />
                              <input type="text" required placeholder="John Doe" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full p-6 md:p-10 pl-16 md:pl-24 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-xl md:text-2xl shadow-inner" />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                            <div className="space-y-4 md:space-y-6">
                              <label className="text-xs md:text-sm font-black uppercase text-slate-400 ml-6 md:ml-8 tracking-widest">Phone Number</label>
                              <div className="relative">
                                <Phone className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-slate-300 w-8 h-8 md:w-10 md:h-10" />
                                <input type="tel" required placeholder="(512) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-6 md:p-10 pl-16 md:pl-24 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-xl md:text-2xl shadow-inner" />
                              </div>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                              <label className="text-xs md:text-sm font-black uppercase text-slate-400 ml-6 md:ml-8 tracking-widest">Email Address</label>
                              <div className="relative">
                                <Mail className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-slate-300 w-8 h-8 md:w-10 md:h-10" />
                                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-6 md:p-10 pl-16 md:pl-24 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-xl md:text-2xl shadow-inner" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4 md:space-y-6">
                            <label className="text-xs md:text-sm font-black uppercase text-slate-400 ml-6 md:ml-8 tracking-widest">Project Details & Requirements</label>
                            <textarea rows={5} placeholder="Describe any specific requirements, property access details, or timing..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-2 md:border-4 border-slate-100 focus:border-[#004aad] outline-none font-black text-xl md:text-2xl shadow-inner resize-none" />
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-10 shrink-0">
                          <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-500 py-6 md:py-10 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-widest text-base md:text-lg hover:bg-slate-200 transition-all">Back to calculation</button>
                          <button type="submit" className="flex-[2] bg-[#004aad] text-white py-6 md:py-10 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-[0.2em] text-lg md:text-2xl shadow-2xl shadow-blue-100 hover:bg-[#003882] transition-all">Submit Quote Request</button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="space-y-16 md:space-y-20 pb-12 text-center flex-1 flex flex-col justify-center items-center">
                        <div className="bg-[#004aad]/5 border-2 md:border-4 border-[#004aad]/10 p-12 md:p-24 rounded-[3rem] md:rounded-[6rem] space-y-10 md:space-y-12 shadow-inner w-full">
                          <div className="text-xs md:text-sm font-black uppercase tracking-[0.5em] text-[#004aad]">Official Project Estimate Summary</div>
                          <div className="text-7xl md:text-9xl xl:text-[10rem] font-black text-[#dc3545] tracking-tighter leading-none shadow-sm">${activeEstimate.toLocaleString()}</div>
                          <div className="flex flex-wrap justify-center gap-6 md:gap-16 text-lg md:text-2xl font-black text-slate-500 uppercase">
                            <span>Service: {pricingData[projectType].label}</span>
                            <span className="hidden md:inline text-slate-200">|</span>
                            <span>Ref: {Math.floor(10000 + Math.random() * 90000)}</span>
                          </div>
                          <p className="max-w-4xl mx-auto text-lg md:text-2xl text-slate-600 font-bold leading-relaxed italic pt-6 md:pt-12">
                            This preliminary estimate is based on regional material and labor averages. A final binding quote will be issued following a comprehensive structural evaluation.
                          </p>
                        </div>
                        <button onClick={onClose} className="w-full max-w-2xl bg-[#004aad] text-white py-8 md:py-12 rounded-[2rem] md:rounded-[4rem] font-black uppercase tracking-[0.4em] text-xl md:text-2xl shadow-2xl hover:bg-[#003882] transition-all mt-10">Return to Website Home</button>
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
