import React, { useEffect } from 'react'
import Website_Navbar from '../components/websitecomponents/Website_Navbar'
import HeroSection from '../components/websitecomponents/HeroSection'
import FeedbackForm from '../components/websitecomponents/FeedbackForm'
import About from './About'
import AboutSection from '../components/websitecomponents/AboutSection'
import Slider from '../components/websitecomponents/Slider'
import Website_Footer from '../components/websitecomponents/Website_Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
      easing: "ease-in-out", // Animation easing
    });
  }, []);
  return (
    <>
    <div >
      
        <HeroSection />
        <AboutSection  />
        <FeedbackForm/>
        <Slider/>
   
        </div>
    </>
  )
}

export default Home
