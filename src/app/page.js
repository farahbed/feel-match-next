import React from 'react';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import SitePresentation from './components/home/SitePresentation';
import Pricing from './components/home/Pricing';
import UpcomingEvent from './components/home/UpcomingEvent';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SitePresentation />
        <UpcomingEvent />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
