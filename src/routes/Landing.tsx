import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceOverview from '../components/ServiceOverview';
import MainLayout from '../layouts/MainLayout';

function Landing() {
  const { state } = useLocation();
  useEffect(() => console.log(state));
  return (
    <MainLayout>
      <div className="pt-[58px]">
        <ServiceOverview />
      </div>
    </MainLayout>
  );
}

export default Landing;
