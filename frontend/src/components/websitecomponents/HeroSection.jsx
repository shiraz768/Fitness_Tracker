import React from "react";

const HeroSection = ({ aosType }) => {
  return (
    <div
      className="hero-section bg-cover bg-center min-h-screen flex items-center"
      style={{ backgroundImage: "url('./hero.png')" }}
    >
      <div className="hero-text w-full text-center p-8 sm:p-12 md:p-16">
        <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl" data-aos={aosType}>
          Start Your Fitness Journey
        </p>
        <p className="text-white font-bold text-4xl sm:text-5xl md:text-6xl my-4" data-aos={aosType}>
          Your Fitness Journey Begins!
        </p>
        <p className="text-white font-semibold text-base sm:text-lg md:text-xl" data-aos={aosType}>
          “The body achieves what the mind believes.”
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
