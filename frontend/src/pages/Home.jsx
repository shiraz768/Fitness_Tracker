import React, { useEffect } from "react";
import HeroSection from "../components/websitecomponents/HeroSection";
import FeedbackForm from "../components/websitecomponents/FeedbackForm";
import AboutSection from "../components/websitecomponents/AboutSection";
import Slider from "../components/websitecomponents/Slider";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <>
      <div>
        <HeroSection />
        <AboutSection />
        <FeedbackForm />
        <Slider />
      </div>
    </>
  );
};

export default Home;
