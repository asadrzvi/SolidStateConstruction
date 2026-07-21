import React from 'react';
import { PhoneCall, ShieldAlert, FileSearch, HardHat, Sparkles } from 'lucide-react';
import './ProcessTimeline.css';

const steps = [
  {
    icon: <PhoneCall size={24} />,
    title: "1. 24/7 Dispatch & Rapid Response",
    subtitle: "Emergency Callout within Leander & Austin Metro",
    desc: "When disaster strikes or emergency repair is needed, our technicians are on-site within 1 hour. We immediately stabilize safety conditions."
  },
  {
    icon: <ShieldAlert size={24} />,
    title: "2. Immediate Damage Containment",
    subtitle: "Mitigate Loss & Prevent Secondary Damage",
    desc: "We perform fast water extraction, set up commercial air dehumidifiers, and apply temporary board-up or roof tarps to secure the envelope."
  },
  {
    icon: <FileSearch size={24} />,
    title: "3. Structural Inspection & Planning",
    subtitle: "Precision Engineering Evaluation",
    desc: "Under Shaan's leadership, we perform engineering assessments, map moisture deep in drywall, check foundation leveling, and issue a clear roadmap."
  },
  {
    icon: <HardHat size={24} />,
    title: "4. Legacy-Grade Rebuilding & Remodeling",
    subtitle: "Structural Reconstruction & Master Tiling",
    desc: "Our craftsmen rebuild framing, install flawless drywall and trim, replace roofing, run professional plumbing, and complete luxury custom remodeling."
  },
  {
    icon: <Sparkles size={24} />,
    title: "5. Handover & Direct Insurance Billing",
    subtitle: "Final Structural Sign-Off",
    desc: "We perform rigorous quality control checks and coordinate directly with your homeowners' insurance provider to handle documentation and billing."
  }
];

export default function ProcessTimeline() {
  return (
    <section className="process-section" id="process">
      <div className="container">
        <h2 className="section-title">Our Professional Restoration Process</h2>
        <p className="section-subtitle">How we return your home to pristine structural integrity—from emergency callout to final handover.</p>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {steps.map((step, idx) => (
            <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot">
                {step.icon}
              </div>
              <div className="timeline-card">
                <h3>{step.title}</h3>
                <h4>{step.subtitle}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
