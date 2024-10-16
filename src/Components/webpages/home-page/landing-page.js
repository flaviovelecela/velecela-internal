import React from 'react';
import './landing-page.css'; // Assuming this contains all your landing page styles
import SkydivingSection from '../../Portable_Sections/Skydiving_July_9_2024/SkydivingSection';
import '../../Portable_Sections/Skydiving_July_9_2024/SkydivingSection.css'

function LandingPage() {
    return (
        <div className="lp-container">
            <h1 className="lp-heading">Welcome!</h1>
            <div className="lp-text-block">
                <p className="lp-paragraph">
                    This is a landing page for the Velecela family.
                </p>
            </div>
            <div className="lp-text-block">
                <p className="lp-paragraph">
                    Thank you for visiting our website!
                </p>
            </div>
            <SkydivingSection /> {/* Skydiving video section integrated here */}
        </div>
    );
}

export default LandingPage;
