import React from 'react';
import ServiceOverview from '../components/ServiceOverview';
import ServiceFeatures from '../components/ServiceFeatures';
import MainLayout from '../layouts/MainLayout';

function Landing() {
  return (
    <MainLayout>
      <div className="pt-[58px]">
        <ServiceOverview />
        <ServiceFeatures />
      </div>
    </MainLayout>
  );
}

export default Landing;
