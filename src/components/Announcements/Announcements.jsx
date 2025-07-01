import React from 'react';
import './Announcement.css';

const Announcements = () => {
  const announcements = [
    {
      date: 'April 5',
      title: 'Campus',
      year: '2025,',
      content: 'Get ready for an exciting campus fest with cultural events, competitions, and fun activities on April 25.'
    },
    {
      date: 'April 3',
      title: 'Library',
      year: '2025,',
      content: 'During exam season, the library will remain open until 11 PM from April 15 to May 5.'
    },
    {
      date: 'April 8',
      title: 'Workshop',
      year: '2025,',
      content: 'Join our expert-led workshop on Artificial Intelligence and Machine Learning.'
    },
    {
      date: 'April 10',
      title: 'Exams',
      year: '2025,',
      content: 'Mid-semester exams begin April 20. Check schedule on student portal.'
    }
  ];

  // Duplicate for seamless looping
  const scrollingAnnouncements = [...announcements, ...announcements];

  return (
    <div className="announcement-container">
      <div className="announcement-track">
        {scrollingAnnouncements.map((item, index) => (
          <div className="announcement-card" key={index}>
            <div className="card-date">{item.date}</div>
            <div className="card-title">{item.title}</div>
            <div className="card-content">
              <span className="card-year">{item.year}</span> {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;