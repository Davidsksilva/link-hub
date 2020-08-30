import React from 'react';
import Head from 'next/head';

import linkhubLogo from '../assets/link-hub-logo.png';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Link Hub</title>
    </Head>

    <main>
      <img src={linkhubLogo} alt="Link Hub" />
      <h1>Hello World</h1>
    </main>
  </div>
);

export default Home;
