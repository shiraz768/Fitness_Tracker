import React from "react";

const HeroSection = ({ aosType }) => {
  return (
    <div className="hero-section">
      <div className="hero-text p-50 text-center">
        <p className="text-white font-semibold" data-aos={aosType}>
          Start Your Fitness Journey
        </p>
        <p className="text-white text-6xl" data-aos={aosType}>
          Your Fitness Journey Begins!
        </p>
        <p className="text-white font-semibold" data-aos={aosType}>
          “The body achieves what the mind believes.”
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
