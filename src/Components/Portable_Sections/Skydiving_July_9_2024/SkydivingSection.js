import React, { useState } from 'react';
import DynamicBitratePlayer from '../../DynamicBitratePlayer/DynamicBitratePlayer'; // Assuming the component is in the same directory
import './SkydivingSection.css'; // Add some styles for the carousel

function SkydivingCarousel() {
    const [activeIndex, setActiveIndex] = useState(0); // Track the active video index
    const videoSources = [
        "/Videos/Skydiving_July_9_2024/Flavio's Skydiving Jump/master.m3u8",
        "/Videos/Skydiving_July_9_2024/Flavio Sr's Sky Diving/master.m3u8",
        "/Videos/Skydiving_July_9_2024/Rafael's Jump/master.m3u8"
    ];

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + videoSources.length) % videoSources.length);
    };

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="carousel-container">
            <hr className="section-divider" /> {/* Top divider */}
            <h2 className="skydiving-title">Skydiving Time!</h2>
            <div className="carousel">
                {/* Left Arrow */}
                <button className="carousel-arrow left-arrow" onClick={handlePrev}>
                    &lt;
                </button>

                {/* Dynamic Video Player for the Active Video */}
                <div className="carousel-video">
                    <DynamicBitratePlayer videoSource={videoSources[activeIndex]} selectedLevel="auto" />
                </div>

                {/* Right Arrow */}
                <button className="carousel-arrow right-arrow" onClick={handleNext}>
                    &gt;
                </button>
            </div>

            {/* Dots (Indicators) */}
            <div className="carousel-dots">
                {videoSources.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
            <hr className="section-divider" /> {/* Bottom divider */}
        </div>
    );
}

export default SkydivingCarousel;
