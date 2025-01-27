import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SpeedDatingHomePage from './components/home/SpeedDatingHomePage';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SpeedDatingHomePage/>
      </main>
      <Footer />
    </>
  );
}
