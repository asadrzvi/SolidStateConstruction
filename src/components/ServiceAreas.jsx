import React from 'react';
import { MapPin } from 'lucide-react';
import './ServiceAreas.css';

const cities = [
  { name: "Leander", label: "HQ / Central Hub" },
  { name: "Cedar Park", label: "Immediate Dispatch" },
  { name: "Liberty Hill", label: "Northern Service Loop" },
  { name: "Georgetown", label: "Eastern Service Loop" },
  { name: "Round Rock", label: "Rapid Emergency Response" },
  { name: "North Austin", label: "Metro Coverage" }
];

export default function ServiceAreas() {
  return (
    <section className="service-areas-section" id="areas">
      <div className="container">
        <h2 className="section-title">Our Service Areas</h2>
        <p className="section-subtitle">We proudly serve Leander and surrounding North Austin communities with 24/7 emergency response.</p>
        
        <div className="areas-grid">
          {cities.map((city, idx) => (
            <div key={idx} className="area-card">
              <div className="area-icon-wrapper">
                <MapPin size={24} />
              </div>
              <div className="area-info">
                <h3>{city.name}</h3>
                <span className="area-tag">{city.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
