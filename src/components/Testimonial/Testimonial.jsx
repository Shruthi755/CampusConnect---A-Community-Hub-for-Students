import { useState } from 'react';
import './Testimonial.css';
import user1 from '../../assets/user-1.png';
import user2 from '../../assets/test1.jpg';
import user3 from '../../assets/user-3.png';
import user4 from '../../assets/user-4.png';
import test2 from '../../assets/test2.jpg';
import video1 from '../../assets/video.mp4';
import test3 from '../../assets/test3.jpg';
import Navbar1 from '../Navbar1/Navbar1';

const Testimonial = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);

  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      type: 'student',
      name: 'Priya Sharma',
      role: 'Computer Science, 2023',
      image: user1,
      quote: 'The hands-on projects and industry collaborations gave me the confidence to land my dream job at Google. The faculty goes above and beyond to support students.',
      video: video1 ,
      rating: 5,
      featured: true
    },
    {
      id: 2,
      type: 'alumni',
      name: 'Rahul Mehta',
      role: 'Mechanical Engineering, 2018',
      image: user2,
      quote: 'The strong alumni network helped me tremendously in my career. Even years after graduating, I still connect with professors for guidance.',
      company: 'Tata Motors',
      rating: 4,
      featured: true
    },
    {
      id: 3,
      type: 'faculty',
      name: 'Dr. Ananya Patel',
      role: 'Professor of Biotechnology',
      image: test3,
      quote: 'Teaching at CampusConnect has been incredibly rewarding. Our students bring such diverse perspectives that enrich the learning environment for everyone.',
      rating: 5
    },
    {
      id: 4,
      type: 'employer',
      name: 'Neha Kapoor',
      role: 'HR Director',
      image: user4,
      quote: 'We consistently hire from CampusConnect because their graduates arrive workplace-ready with both technical skills and strong problem-solving abilities.',
      company: 'Infosys',
      rating: 5
    },
    {
      id: 5,
      type: 'student',
      name: 'Arjun Singh',
      role: 'Business Administration, 2024',
      image: test2,
      quote: 'The international exchange program changed my perspective completely. The campus facilities are world-class, and there are always interesting events happening.',
      rating: 4
    },
    {
      id: 6,
      type: 'alumni',
      name: 'Deepika Reddy',
      role: 'Electronics, 2020',
      image: test3,
      quote: 'The entrepreneurship cell helped me launch my startup right after graduation. The mentorship I received was invaluable in navigating the challenges of being a first-time founder.',
      company: 'TechNova Solutions',
      rating: 5,
      featured: true
    }
  ];

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === activeFilter);

  const featuredTestimonials = testimonials.filter(t => t.featured);

  return (
    <>
    <Navbar1/>
    <div className="testimonials-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Voices of CampusConnect</h1>
          <p>Hear what our students, alumni, faculty, and employers say about their experiences</p>
        </div>
      </section>

      <section className="featured-testimonials">
        <h2>Featured Stories</h2>
        <div className="featured-grid">
          {featuredTestimonials.map(testimonial => (
            <div key={testimonial.id} className={`featured-card ${testimonial.type}`}>
              {testimonial.video ? (
                <div className="video-container">
                  <iframe 
                    src={testimonial.video} 
                    title={testimonial.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              ) : (
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
              )}
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <blockquote>
                  "{testimonial.quote}"
                </blockquote>
                <div className="author-info">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                  {testimonial.company && <p className="company">{testimonial.company}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="all-testimonials">
        <div className="filter-controls">
          <button 
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={activeFilter === 'student' ? 'active' : ''}
            onClick={() => setActiveFilter('student')}
          >
            Current Students
          </button>
          <button 
            className={activeFilter === 'alumni' ? 'active' : ''}
            onClick={() => setActiveFilter('alumni')}
          >
            Alumni
          </button>
          <button 
            className={activeFilter === 'faculty' ? 'active' : ''}
            onClick={() => setActiveFilter('faculty')}
          >
            Faculty
          </button>
          <button 
            className={activeFilter === 'employer' ? 'active' : ''}
            onClick={() => setActiveFilter('employer')}
          >
            Employers
          </button>
        </div>

        <div className="testimonials-grid">
          {filteredTestimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className={`testimonial-card ${testimonial.type} ${expandedTestimonial === testimonial.id ? 'expanded' : ''}`}
              onClick={() => setExpandedTestimonial(expandedTestimonial === testimonial.id ? null : testimonial.id)}
            >
              <div className="card-header">
                <div className="avatar">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="author">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                  {testimonial.company && <p className="company">{testimonial.company}</p>}
                </div>
              </div>
              <div className="card-content">
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <blockquote>
                  "{expandedTestimonial === testimonial.id || testimonial.quote.length < 150 
                    ? testimonial.quote 
                    : `${testimonial.quote.substring(0, 150)}...`}
                  {testimonial.quote.length > 150 && (
                    <span className="read-more">
                      {expandedTestimonial === testimonial.id ? ' Read less' : ' Read more'}
                    </span>
                  )}
                </blockquote>
              </div>
              <div className="card-footer">
                <div className="type-badge">{testimonial.type}</div>
                <div className="social-share">
                  <button className="share-btn">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="submit-testimonial">
        <div className="submit-container">
          <h2>Share Your Experience</h2>
          <p>Are you a student, alumni, faculty member, or employer? We'd love to hear your story!</p>
          <button className="submit-btn">Submit Your Testimonial</button>
        </div>
      </section>
    </div>
    </>
  );
};

export default Testimonial;