import React from 'react';
import './landing-page.css'; // Make sure the path is correct

function LandingPage() {
  return (
    <div className="lp-container">
      <h1 className="lp-heading">Welcome!</h1>
      <div className="lp-text-block">
        <p className="lp-paragraph">
          This is a landing page for the Velecela family
        </p>
      </div>
      <div className="lp-text-block">
        <p className="lp-paragraph">
          Thank you for visiting our website!
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
