import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from './components/hero/hero'
import Programs from './components/Programs/Programs'
import Title from './components/Title/Title'
import About from './components/About/About'
import Campus from './components/Campus/Campus'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'


import { useState } from 'react';

const AppContent = () => {
  const [playState, setPlayState] = useState(false);
  return (
    <>
    <Navbar />
          <>
            <Hero />
            <div className="container">
              <Title subTitle="Our PROGRAM" title="What We Offer" />
              <Programs />
              <About setPlayState={setPlayState} />
              <Title subTitle="Gallery" title="Campus Photos" />
              <Campus />
              <Title subTitle="TESTIMONIALS" title="What Student Says" />
              <Testimonials />
              <Title subTitle="ANNOUNCEMENTS" title="Your Campus, Your Updates" />
              <Announcements />
              <Title subTitle="CONTACT US" title="Get in Touch" />
              <Contact />
              <Footer />
            </div>
            <VideoPlayer playState={playState} setPlayState={setPlayState} />
          </>
    </>
  );
}
function Home() {
  return (
      <AppContent/>
  );
}
export default Home
