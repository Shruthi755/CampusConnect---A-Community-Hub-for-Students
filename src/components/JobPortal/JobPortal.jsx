import React, { useState } from 'react';
import google from '../../assets/google.jpg';
import apple from '../../assets/apple.jpg';
import facebook from '../../assets/facebook.jpg';
import meta from '../../assets/meta.jpg';
import hexaware from '../../assets/hexaware.jpg';
import wipro from '../../assets/wipro.jpg';
import amazon from '../../assets/amazon.jpg';
import microsoft from '../../assets/microsoft.jpg'
import tcs from '../../assets/tcs.jpg';
import zoho from '../../assets/zoho.jpg';
import {
  FiSearch, FiBriefcase, FiBookmark, FiFilter,
  FiClock, FiDollarSign, FiMapPin, FiBook,
  FiAward, FiUsers, FiLayers, FiMic, FiVideo,
  FiCode, FiBarChart2, FiMail, FiStar,FiX,FiUser,FiPhone,
  FiLinkedin ,FiGithub, FiUpload
} from 'react-icons/fi';
import './JobPortal.css'
import Navbar1 from '../Navbar1/Navbar1';
const JobPortal = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [filters, setFilters] = useState({
    opportunityType: '',
    location: '',
    duration: ''
  });
   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [applyForm, setApplyForm] = useState({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      resume: null,
      coverLetter: '',
    });




  // Sample data for all opportunity types
  const opportunities = [
    // INTERNSHIPS
    {
      id: 1,
      title: 'Summer Software Engineering Intern',
      company: 'Wipro',
      location: 'Remote',
      type: 'Internship',
      subtype: 'Paid Summer Internship',
      salary: ' ₹2,500/month',
      posted: '2 days ago',
      description: 'Develop new features for our flagship product using React and Node.js. Mentorship provided.',
      logo: 'https://yt3.googleusercontent.com/gCHepjodxvjcAXhiHzvNa5l_h7Xn5ghVeKGE6rTBy_XcyXDe-yEhyAK74HolUOmh-jVdp-NaeVE=s900-c-k-c0x00ffffff-no-rj',
      category: 'freshers',
      duration: '3 months',
      skills: ['React', 'JavaScript', 'Node.js']
    },
    {
      id: 2,
      title: 'Winter Marketing Intern',
      company: 'GrowthHackers',
      location: 'Chicago, IL',
      type: 'Internship',
      subtype: 'Unpaid Winter Internship',
      salary: 'Unpaid (Academic Credit Available)',
      posted: '5 days ago',
      description: 'Support digital marketing campaigns and social media strategy.',
      logo: google,
      category: 'freshers',
      duration: '2 months',
      skills: ['Marketing', 'Social Media', 'Content Creation']
    },
   
    // PART-TIME JOBS
    {
      id: 3,
      title: 'Freelance UI Designer',
      company: 'Tata Consultancy Services',
      location: 'Remote',
      type: 'Part-time',
      subtype: 'Freelance Project',
      salary: ' ₹4500/hour',
      posted: '3 days ago',
      description: 'Design interfaces for mobile apps. Flexible hours perfect for students.',
      logo: tcs,
      category: 'freshers',
      duration: 'Ongoing',
      skills: ['UI Design', 'Figma', 'Prototyping']
    },
    {
      id: 4,
      title: 'Campus IT Support Assistant',
      company: 'Hexaware',
      location: 'On-campus',
      type: 'Part-time',
      subtype: 'On-campus Job',
      salary: ' ₹15/hour',
      posted: '1 week ago',
      description: 'Provide tech support to students and faculty. Work around class schedule.',
      logo: hexaware,
      category: 'freshers',
      duration: 'Academic Year',
      skills: ['Technical Support', 'Troubleshooting']
    },
   
    // ENTRY-LEVEL JOBS
    {
      id: 5,
      title: 'Junior Data Analyst',
      company: 'Apple',
      location: 'New York, NY',
      type: 'Full-time',
      subtype: 'Entry-level Position',
      salary: '$60,000/year',
      posted: '1 week ago',
      description: 'Recent graduates welcome! Analyze data and create reports for clients.',
      logo: apple,
      category: 'graduates',
      duration: 'Full-time',
      skills: ['SQL', 'Excel', 'Data Visualization']
    },
   
    // WORK-STUDY PROGRAMS
    {
      id: 6,
      title: 'CS Research Assistant',
      company: 'Zoho',
      location: 'On-campus',
      type: 'Work-Study',
      subtype: 'Research Program',
      salary: '$18/hour',
      posted: '2 days ago',
      description: 'Assist with machine learning research. Federal work-study eligible.',
      logo: zoho,
      category: 'freshers',
      duration: 'Semester-based',
      skills: ['Python', 'Machine Learning']
    },
   
    // CAMPUS AMBASSADOR PROGRAMS
    {
      id: 7,
      title: 'Brand Ambassador',
      company: 'Facebook',
      location: 'Your Campus',
      type: 'Ambassador',
      subtype: 'Leadership Program',
      salary: 'Stipend + Perks',
      posted: 'Just now',
      description: 'Represent TechStart on campus. Organize events and build your network.',
      logo: facebook,
      category: 'freshers',
      duration: '1 year',
      skills: ['Leadership', 'Public Speaking']
    },
   
    // APPRENTICESHIPS
    {
      id: 8,
      title: 'Software Development Apprentice',
      company: 'Amazon',
      location: 'Remote',
      type: 'Apprenticeship',
      subtype: 'Earn-While-You-Learn',
      salary: '$3,000/month',
      posted: '3 days ago',
      description: '12-month program with mentorship and hands-on projects.',
      logo: amazon,
      category: 'freshers',
      duration: '12 months',
      skills: ['JavaScript', 'Full-stack Development']
    },
   
    // SKILL DEVELOPMENT (Online Courses)
    {
      id: 9,
      title: 'AI/ML Nanodegree',
      company: 'Microsoft',
      location: 'Online',
      type: 'Learning',
      subtype: 'Nanodegree Program',
      duration: '6 months',
      cost: '$999 (Scholarships Available)',
      posted: '1 week ago',
      description: 'Comprehensive program covering ML fundamentals to advanced concepts.',
      logo: microsoft,
      category: 'learning',
      skills: ['Python', 'TensorFlow', 'Neural Networks']
    },
   
    // SKILL DEVELOPMENT (Bootcamps)
    {
      id: 10,
      title: 'Full-Stack Web Development',
      company: 'IBM',
      location: 'Online',
      type: 'Learning',
      subtype: 'Bootcamp',
      duration: '12 weeks',
      cost: 'Free',
      posted: '2 days ago',
      description: 'Intensive training with portfolio projects and career support.',
      logo: 'https://avatars.githubusercontent.com/u/1459110?s=280&v=4',
      category: 'learning',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js']
    },
   
    // SKILL DEVELOPMENT (Webinars)
    {
      id: 11,
      title: 'Career Growth Webinar Series',
      company: 'Meta',
      location: 'Online',
      type: 'Learning',
      subtype: 'Live Webinar',
      duration: '3 sessions',
      cost: 'Free',
      posted: 'Just now',
      description: 'Learn resume building, interview skills, and career planning.',
      logo: meta,
      category: 'learning',
      skills: ['Career Development', 'Interviewing']
    },
   
    // SKILL DEVELOPMENT (Workshops)
    {
      id: 12,
      title: 'Data Science Workshop',
      company: 'Google',
      location: 'Campus Computer Lab',
      type: 'Learning',
      subtype: 'Hands-on Workshop',
      duration: '2 days',
      cost: '$50',
      posted: '1 day ago',
      description: 'Practical introduction to data analysis with Python.',
      logo: google,
      category: 'learning',
      skills: ['Python', 'Pandas', 'Data Analysis']
    }
  ];


  const filteredOpportunities = opportunities.filter(opp => {
    // Search term filter
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
   
    // Tab filter
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'freshers' && opp.category === 'freshers') ||
      (activeTab === 'graduates' && opp.category === 'graduates') ||
      (activeTab === 'learning' && opp.category === 'learning') ||
      (activeTab === 'internships' && opp.type === 'Internship') ||
      (activeTab === 'parttime' && opp.type === 'Part-time') ||
      (activeTab === 'workstudy' && opp.type === 'Work-Study') ||
      (activeTab === 'ambassador' && opp.type === 'Ambassador') ||
      (activeTab === 'apprenticeship' && opp.type === 'Apprenticeship') ||
      (activeTab === 'courses' && opp.subtype.includes('Program')) ||
      (activeTab === 'webinars' && opp.subtype.includes('Webinar')) ||
      (activeTab === 'workshops' && opp.subtype.includes('Workshop')) ||
      (activeTab === 'saved' && savedItems.includes(opp.id));
   
    // Additional filters
    const matchesOpportunityType = !filters.opportunityType || opp.type === filters.opportunityType;
    const matchesLocation = !filters.location || opp.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDuration = !filters.duration || (opp.duration && opp.duration.toLowerCase().includes(filters.duration.toLowerCase()));
   
    return matchesSearch && matchesTab && matchesOpportunityType && matchesLocation && matchesDuration;
  });


  const toggleSaveItem = (itemId) => {
    if (savedItems.includes(itemId)) {
      setSavedItems(savedItems.filter(id => id !== itemId));
    } else {
      setSavedItems([...savedItems, itemId]);
    }
  };


  const getIconForType = (type) => {
    switch(type) {
      case 'Internship': return <FiBriefcase />;
      case 'Part-time': return <FiClock />;
      case 'Full-time': return <FiBriefcase />;
      case 'Work-Study': return <FiBook />;
      case 'Ambassador': return <FiUsers />;
      case 'Apprenticeship': return <FiLayers />;
      case 'Learning':
        return <FiAward />;
      default: return <FiBriefcase />;
    }
  };


  const getSubtypeIcon = (subtype) => {
    if (subtype.includes('Webinar')) return <FiMic />;
    if (subtype.includes('Workshop')) return <FiCode />;
    if (subtype.includes('Program') || subtype.includes('Degree')) return <FiBarChart2 />;
    return <FiStar />;
  };
  const handleApplyClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowApplyModal(true);
    setApplyForm({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      resume: null,
      coverLetter: '',
    });
};


  const handleDetailsClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowDetailsModal(true);
  };




  const handleApplySubmit = (e) => {
    e.preventDefault();
    console.log('Applying for:', selectedOpportunity.title);
    console.log('Application data:', applyForm);
    setShowApplyModal(false);
    alert(`Application submitted for ${selectedOpportunity.title}!`);
  };




  const handleFileChange = (e) => {
    setApplyForm({
      ...applyForm,
      resume: e.target.files[0]
    });
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplyForm({
      ...applyForm,
      [name]: value
    });
  };


  return (
    <>
    <Navbar1/>
    <div className="opportunities-container">
      <div className="opportunities-hero">
        <h1>Launch Your Career</h1>
        <p>Discover internships, jobs, and skill-building opportunities tailored for students</p>
        <div className="hero-highlights">
          <span><FiBriefcase /> 500+ Opportunities</span>
          <span><FiUsers /> 200+ Companies</span>
          <span><FiAward /> 100+ Learning Programs</span>
        </div>
      </div>
     
      <div className="search-filter-container">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by role, skill, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
       
        <div className="filter-group">
          <div className="filter-dropdown">
            <FiFilter className="filter-icon" />
            <select
              value={filters.opportunityType}
              onChange={(e) => setFilters({...filters, opportunityType: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="Internship">Internships</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Work-Study">Work-Study</option>
              <option value="Ambassador">Ambassador</option>
              <option value="Apprenticeship">Apprenticeships</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
         
          <div className="filter-dropdown">
            <FiMapPin className="filter-icon" />
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="On-campus">On-campus</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>
         
          <div className="filter-dropdown">
            <FiClock className="filter-icon" />
            <select
              value={filters.duration}
              onChange={(e) => setFilters({...filters, duration: e.target.value})}
            >
              <option value="">Any Duration</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Semester">Semester</option>
              <option value="month">1-3 months</option>
              <option value="year">1 year</option>
            </select>
          </div>
        </div>
      </div>
     
      <div className="opportunities-tabs-container">
        <div className="opportunities-tabs">
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Opportunities
          </button>
          <button
            className={activeTab === 'freshers' ? 'active' : ''}
            onClick={() => setActiveTab('freshers')}
          >
            <FiUsers /> For Freshers
          </button>
          <button
            className={activeTab === 'graduates' ? 'active' : ''}
            onClick={() => setActiveTab('graduates')}
          >
            <FiBriefcase /> For Graduates
          </button>
          <button
            className={activeTab === 'internships' ? 'active' : ''}
            onClick={() => setActiveTab('internships')}
          >
            <FiClock /> Internships
          </button>
          <button
            className={activeTab === 'parttime' ? 'active' : ''}
            onClick={() => setActiveTab('parttime')}
          >
            <FiClock /> Part-time
          </button>
          <button
            className={activeTab === 'learning' ? 'active' : ''}
            onClick={() => setActiveTab('learning')}
          >
            <FiAward /> Skill Development
          </button>
          <button
            className={activeTab === 'saved' ? 'active' : ''}
            onClick={() => setActiveTab('saved')}
          >
            <FiBookmark /> Saved ({savedItems.length})
          </button>
        </div>
       
        <div className="view-toggle">
          <button className="active">Grid View</button>
          <button>List View</button>
        </div>
      </div>
     
      {activeTab === 'learning' && (
        <div className="learning-subtabs">
          <button onClick={() => setActiveTab('courses')}>
            <FiBarChart2 /> Courses
          </button>
          <button onClick={() => setActiveTab('webinars')}>
            <FiMic /> Webinars
          </button>
          <button onClick={() => setActiveTab('workshops')}>
            <FiCode /> Workshops
          </button>
        </div>
      )}
     
      <div className="opportunity-listings">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map(opp => (
            <div key={opp.id} className={`opportunity-card ${opp.type.toLowerCase()}-card`}>
              <div className="opportunity-card-header">
                <img src={opp.logo} alt={opp.company} className="company-logo" />
                <div className="opportunity-title-company">
                  <h3>{opp.title}</h3>
                  <p className="company-name">{opp.company}</p>
                  <div className="opportunity-type">
                    {opp.type === 'Learning' ? getSubtypeIcon(opp.subtype) : getIconForType(opp.type)}
                    <span>{opp.type}{opp.subtype ? ` • ${opp.subtype}` : ''}</span>
                  </div>
                </div>
                <button
                  className={`save-btn ${savedItems.includes(opp.id) ? 'saved' : ''}`}
                  onClick={() => toggleSaveItem(opp.id)}
                >
                  <FiBookmark />
                </button>
              </div>
             
              <div className="opportunity-details">
                <p className="opportunity-description">{opp.description}</p>
               
                {opp.skills && (
                  <div className="skills-container">
                    {opp.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                )}
               
                <div className="opportunity-meta">
                  <span><FiMapPin /> {opp.location}</span>
                  {opp.salary && <span><FiDollarSign /> {opp.salary}</span>}
                  {opp.duration && <span><FiClock /> {opp.duration}</span>}
                  {opp.cost && <span><FiDollarSign /> {opp.cost}</span>}
                  <span className="posted-date"><FiClock /> {opp.posted}</span>
                </div>
              </div>
             
              <div className="opportunity-actions">
                {opp.type === 'Learning' ? (
                 <>
                    <button className="enroll-btn" onClick={() => handleDetailsClick(opp)}>Enroll Now</button>
                    <button className="details-btn" onClick={() => handleDetailsClick(opp)}>Details</button>
                 </>
                ) : (
                 <>
                    <button className="apply-btn" onClick={() => handleApplyClick(opp)}>Quick Apply</button>
                    <button className="details-btn" onClick={() => handleDetailsClick(opp)}>View Details</button>
                 </>
                )}
            </div>

            </div>
          ))
        ) : (
          <div className="no-results">
            <img src="https://via.placeholder.com/150" alt="No results found" />
            <h3>No opportunities found matching your criteria</h3>
            <p>Try adjusting your filters or search for something else</p>
            <button onClick={() => {
              setSearchTerm('');
              setFilters({ opportunityType: '', location: '', duration: '' });
              setActiveTab('all');
            }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
      {/* Apply Modal */}
      {showApplyModal && selectedOpportunity && (
        <div className="modal-overlay">
          <div className="modal-content apply-modal">
            <button className="close-modal" onClick={() => setShowApplyModal(false)}><FiX /></button>
            <h2>Apply for {selectedOpportunity.title}</h2>
            <p className="company-name">{selectedOpportunity.company}</p>
            <form onSubmit={handleApplySubmit}>
              <div className="form-group">
                <label><FiUser /> Full Name</label>
                <input type="text" name="name" value={applyForm.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label><FiMail /> Email</label>
                <input type="email" name="email" value={applyForm.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label><FiPhone /> Phone</label>
                <input type="tel" name="phone" value={applyForm.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label><FiLinkedin /> LinkedIn Profile</label>
                <input type="url" name="linkedin" value={applyForm.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" />
              </div>
              <div className="form-group">
                <label><FiGithub /> GitHub Profile</label>
                <input type="url" name="github" value={applyForm.github} onChange={handleInputChange} placeholder="https://github.com/yourusername" />
              </div>
              <div className="form-group">
                <label><FiUpload /> Resume/CV</label>
                <div className="file-upload">
                  <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
                  <label htmlFor="resume-upload">{applyForm.resume ? applyForm.resume.name : 'Choose file'}</label>
                </div>
              </div>
              <div className="form-group">
                <label>Cover Letter (Optional)</label>
                <textarea name="coverLetter" value={applyForm.coverLetter} onChange={handleInputChange} rows="4" />
              </div>
              <button type="submit" className="submit-application">Submit Application</button>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedOpportunity && (
        <div className="modal-overlay">
          <div className="modal-content details-modal">
            <button className="close-modal" onClick={() => setShowDetailsModal(false)}><FiX /></button>
            <div className="opportunity-header">
              <img src={selectedOpportunity.logo} alt={selectedOpportunity.company} className="company-logo" />
              <div>
                <h2>{selectedOpportunity.title}</h2>
                <p className="company">{selectedOpportunity.company}</p>
                <div className="opportunity-type">
                  {getIconForType(selectedOpportunity.type)}
                  <span>
                    {selectedOpportunity.type}
                    {selectedOpportunity.subtype && ` • ${selectedOpportunity.subtype}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="opportunity-meta">
              <span><FiMapPin /> {selectedOpportunity.location}</span>
              {selectedOpportunity.salary && <span><FiDollarSign /> {selectedOpportunity.salary}</span>}
              {selectedOpportunity.duration && <span><FiClock /> {selectedOpportunity.duration}</span>}
              {selectedOpportunity.cost && <span><FiDollarSign /> {selectedOpportunity.cost}</span>}
              <span><FiClock /> Posted {selectedOpportunity.posted}</span>
            </div>
            <div className="section">
              <h3>Opportunity Description</h3>
              <p>{selectedOpportunity.description}</p>
            </div>
            {selectedOpportunity.skills && (
              <div className="section">
                <h3>Required Skills</h3>
                <div className="skills-container">
                  {selectedOpportunity.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="section">
              <h3>Responsibilities</h3>
              <ul className="responsibilities-list">
                <li>Work on real-world projects with our development team</li>
                <li>Participate in code reviews and team meetings</li>
                <li>Learn and apply modern web development practices</li>
                <li>Collaborate with designers and product managers</li>
              </ul>
            </div>
            <div className="section">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                <li>Currently enrolled in a Computer Science program or related field</li>
                <li>Basic understanding of JavaScript and web development</li>
                <li>Strong problem-solving skills</li>
                <li>Ability to work in a team environment</li>
              </ul>
              </div>
            <div className="modal-actions">
              <button
                className="apply-now-btn"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleApplyClick(selectedOpportunity);
                }}
              >
                Apply Now
              </button>
              <button
                className="save-btn"
                onClick={() => toggleSaveItem(selectedOpportunity.id)}
              >
                <FiBookmark /> {savedItems.includes(selectedOpportunity.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="opportunities-cta">
        <div className="cta-card employer-cta">
          <h3>Are you a recuriter ? </h3>
          <p>List your opportunities and reach thousands of qualified students</p>
          <button>Post Opportunities</button>
        </div>
        <div className="cta-card resources-cta">
          <h3>Need career guidance?</h3>
          <p>Explore our career resources and preparation materials</p>
          <button>View Resources</button>
        </div>
      </div>
    </div>
    </>
  );
};


export default JobPortal;

