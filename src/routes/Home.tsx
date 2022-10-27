import React, { useState } from 'react';

function Home() {
  const [loggedIn] = useState(false);
  return loggedIn ? (
    <div>INDICATE ALREADY LOGGED IN</div>
  ) : (
    <div>SHOW LOGIN/REGISTRATION FORM</div>
  );
}

export default Home;
