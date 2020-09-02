import React from 'react';
import Head from 'next/head';

import Link from 'next/link';
import linkhubLogo from '../assets/link-hub-logo.png';
import { Header, Navigation } from '../styles/pages/Home';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Link Hub</title>
    </Head>

    <main>
      <Header>
        <h1>link-hub</h1>
        <Navigation>
          <Link href="/register">
            <a>Register</a>
          </Link>

          <Link href="/login">
            <a>Login</a>
          </Link>
        </Navigation>
      </Header>
    </main>
  </div>
);

export default Home;
