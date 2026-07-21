import React, { useState } from 'react';
import './BeforeAfterSlider.css';

export default function BeforeAfterSlider({ 
  beforeImage = '/images/before_water.jpg', 
  afterImage = '/images/after_remodel.jpg', 
  beforeLabel = 'Before: Water Damage', 
  afterLabel = 'After: Solid State Restoration' 
}) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="ba-slider-section">
      <div className="ba-slider-container">
        {/* Before Image (Background) */}
        <div className="ba-image-wrapper before-image-wrapper">
          <img src={beforeImage} alt={beforeLabel} className="ba-image" />
          <span className="ba-label ba-label-before">{beforeLabel}</span>
        </div>

        {/* After Image (Clipped Overlay) */}
        <div 
          className="ba-image-wrapper after-image-wrapper"
          style={{ width: `${sliderPosition}%` }}
        >
          <img src={afterImage} alt={afterLabel} className="ba-image" />
          <span className="ba-label ba-label-after">{afterLabel}</span>
        </div>

        {/* Slider Line & Handle */}
        <div 
          className="ba-slider-handle-line" 
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="ba-slider-handle">
            <span className="ba-handle-arrows">&#8592;&#8594;</span>
          </div>
        </div>

        {/* Invisible Range Input Overlay for Drag Control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="ba-slider-input"
          aria-label="Before and After comparison slider"
        />
      </div>
    </div>
  );
}
