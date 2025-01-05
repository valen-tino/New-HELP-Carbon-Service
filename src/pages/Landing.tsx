import React from 'react';
import PublicLayout from '../components/layout/public/PublicLayout';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CallToAction from '../components/landing/CallToAction';

const Landing = () => {
  return (
    <PublicLayout>
      <Hero />
      <Features />
      <CallToAction />
    </PublicLayout>
  );
};

export default Landing;