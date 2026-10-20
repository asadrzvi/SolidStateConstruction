import React, { useState } from 'react';
// Referenced by URL rather than imported. Files under public/ are already
// copied verbatim into dist; importing them made Vite emit a SECOND hashed
// copy, so every one of these assets was shipping twice.
// Same property, shot before the sod went in and after it was finished. The
// framing differs between the two, so the wipe does not line up edge to edge.
const beforeBg = '/images/before_lawn.webp';
const afterBg = '/images/after_lawn.webp';
import './BeforeAfterSlider.css';

export default function BeforeAfterSlider({
  beforeImage = beforeBg,
  afterImage = afterBg,
  beforeLabel = 'Before: Yard Stripped & Graded',
  afterLabel = 'After: Full Sod Install'
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
