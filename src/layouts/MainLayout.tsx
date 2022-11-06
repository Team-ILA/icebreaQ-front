import React from 'react';

import NavBar from './NavBar';

type MainLayoutProps = {
  hideNavBar?: boolean;
  children: React.ReactNode;
};

const MainLayout = ({ hideNavBar, children }: MainLayoutProps) => {
  return (
    <>
      {hideNavBar || <NavBar />}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
