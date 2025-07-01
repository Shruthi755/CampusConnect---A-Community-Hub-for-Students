import React from 'react';
import './Announce.css';

const Announce = () => {
  const announcements = [
    {
      id: 1,
      title: "Final Exam Schedule Released",
      date: "October 15, 2023",
      category: "ACADEMICS",
      content: "The final exam schedule for Fall 2023 is now available on the student portal. Please check your assigned timings and report any conflicts by October 20th.",
      icon: "📚"
    },
    {
      id: 2,
      title: "Career Fair 2023",
      date: "October 20, 2023",
      category: "EVENTS",
      content: "Register for the annual Career Fair on November 5th. Over 50 leading companies including Google, Microsoft, and local employers will be recruiting for internships and full-time roles.",
      icon: "🎯"
    },
    {
      id: 3,
      title: "Campus Wi-Fi Upgrade Scheduled",
      date: "November 1, 2023",
      category: "TECHNOLOGY",
      content: "Network maintenance will occur November 5-6 from 2 AM to 5 AM. Expect brief interruptions to campus Wi-Fi services during this period.",
      icon: "📶" // Wi-Fi bars icon
    },
    {
      id: 4,
      title: "Scholarship Application Deadline",
      date: "November 10, 2023",
      category: "FINANCIAL AID",
      content: "Deadline for Spring 2024 merit-based scholarships is December 1st. Submit your applications through the student portal.",
      icon: "💰" // Money bag icon
    },
    {
      id: 5,
      title: "New Research Lab Opening",
      date: "November 15, 2023",
      category: "RESEARCH",
      content: "The new STEM Innovation Lab will open January 2024. Faculty and students can schedule tours starting December 1st.",
      icon: "🔬" // Microscope icon
    },
    {
      id: 6,
      title: "Winter Break Housing Information",
      date: "November 20, 2023",
      category: "HOUSING",
      content: "Students remaining on campus during winter break must register by December 5th. Limited dining options will be available.",
      icon: "🏠" // House icon
    },
    {
      id: 7,
      title: "Graduation Cap & Gown Orders",
      date: "November 25, 2023",
      category: "ACADEMICS",
      content: "Order your commencement regalia by February 1st to guarantee delivery. Measurements will be taken in the Student Union.",
      icon: "🎓" // Graduation cap icon
    }
  ];

  return (
    
    <div className="announcements-container">
      <h1 className="announcements-header">Campus Announcements</h1>
      
      <div className="announcements-list">
        {announcements.map((item) => (
          <div key={item.id} className="announcement-card">
            <div className="card-icon">{item.icon}</div>
            <div className="card-content">
              <h2>{item.title}</h2>
              <div className="card-meta">
                <span className="date">{item.date}</span>
                <span className="category">{item.category}</span>
              </div>
              <p>{item.content}</p>
              <button className="read-more">
                READ MORE
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default Announce;