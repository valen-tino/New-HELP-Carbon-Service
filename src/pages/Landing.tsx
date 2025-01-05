import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CallToAction from '../components/landing/CallToAction';

const Landing = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Landing;