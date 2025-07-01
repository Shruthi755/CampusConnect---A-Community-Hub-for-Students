import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/hero/hero'
import Programs from './components/Programs/Programs'
import Title from './components/Title/Title'
import About from './components/About/About'
import Campus from './components/Campus/Campus'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import Announcements from './components/Announcements/Announcements'
import Testimonial from './components/Testimonial/Testimonial';
import EventCalendar from './components/EventCalendar/EventCalendar';
import LoginPortal from './components/LoginPortal/LoginPortal';
import StudentBlog from './components/StudentBlog/StudentBlog';
import Announce from './components/Announce/Announce';
import JobPortal from './components/JobPortal/JobPortal';
import { useState } from 'react';
import DiscussionForum from './components/DiscussionForum/DiscussionForum';
import Home from './Home';

const AppContent = () => {
  const [playState, setPlayState] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/Testimonial"element={<Testimonial/>}/>
        <Route path="/Discussion"element={<DiscussionForum/>}/>
        <Route path="/JobPortal" element={<JobPortal/>} />
        <Route path="/Hero" element={<Hero/>} />
        <Route path="/EventCalendar" element={<EventCalendar/>} />
        <Route path="/StudentBlog" element={<StudentBlog/>} />
        <Route path="/Announce" element={<Announce/>} />
        <Route path="/" element={<LoginPortal />} />
        <Route path='/home' element={<Home/>}/>
        
      </Routes>
    </>
  );
}
function App() {
  return (
    <Router>
      <AppContent/>
    </Router>
  );
}
export default App