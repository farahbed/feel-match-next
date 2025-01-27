import React from 'react';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import UpcomingEvent from './components/home/UpcomingEvent';
import SpeedDatingHomePage from './components/home/SpeedDatingHomePage';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SpeedDatingHomePage/>
        <UpcomingEvent />
      </main>
      <Footer />
    </>
  );
}
