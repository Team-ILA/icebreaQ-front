import React from 'react';
import ServiceOverview from '../components/ServiceOverview';
import ServiceFeatures from '../components/ServiceFeatures';
import MainLayout from '../layouts/MainLayout';

function Landing() {
  return (
    <MainLayout>
      <ServiceOverview />
      <ServiceFeatures />
    </MainLayout>
  );
}

export default Landing;