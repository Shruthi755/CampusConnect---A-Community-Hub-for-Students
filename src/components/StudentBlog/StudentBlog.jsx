import { useState, useEffect } from 'react';
import './StudentBlog.css';
import Navbar1 from '../Navbar1/Navbar1';


const StudentBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: '',
    author: '',
    excerpt: '',
    content: '',
    image: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const mockPosts = [
          {
            id: 1,
            title: "My First Month at College: Expectations vs Reality",
            author: "Sarah Johnson",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "Coming into college, I had so many expectations about what it would be like. The reality has been both challenging and rewarding in ways I never expected...",
            content: "When I first arrived on campus, I imagined college would be just like the movies - endless parties, instant friendships, and easy classes. The reality was quite different. My first month was a whirlwind of orientation events, trying to find my way around massive lecture halls, and learning how to manage my time effectively. I struggled with homesickness but found comfort in joining the campus book club. The academic workload was heavier than I anticipated, but I've already grown so much from pushing through those late-night study sessions.",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Freshman", "Experience"]
          },
          {
            id: 2,
            title: "Balancing Academics and Social Life",
            author: "Michael Chen",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "Finding the right balance between studying and socializing has been my biggest challenge this semester. Here's what I've learned...",
            content: "As a sophomore, I thought I had college life figured out, but this semester's course load proved me wrong. I've discovered that time blocking is essential - I schedule my study sessions like appointments and protect that time fiercely. The 50/10 rule (50 minutes studying, 10 minute break) has been a game-changer. I've also learned it's okay to say no to social events when I need to focus. What surprised me most was that setting these boundaries actually improved my friendships - my real friends understand and respect my academic priorities.",
            image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Time Management", "Tips"]
          },
          {
            id: 3,
            title: "How I Landed My Dream Internship",
            author: "David Rodriguez",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "After months of preparation and networking, I finally secured an internship at my dream company. Here's my step-by-step guide...",
            content: "The process began with thorough research - I identified 20 companies I admired and studied their internship programs. I attended every career fair and company info session, not just to collect swag, but to make genuine connections. My breakthrough came when I asked insightful questions during a panel discussion that led to a conversation with a senior manager. I tailored my resume for each application, highlighting relevant coursework and projects. The key was following up - a thank you email after interviews and periodic check-ins to stay on their radar. When the offer came, it was validation that persistence pays off.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Career", "Internship"]
          },
          {
            id: 4,
            title: "Campus Clubs That Changed My College Experience",
            author: "Emily Wilson",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "Joining these three campus organizations transformed my college experience from ordinary to extraordinary...",
            content: "1. The Adventure Club: Through weekend hikes and camping trips, I found my closest friends and discovered a love for the outdoors. 2. Debate Society: Though terrifying at first, public speaking improved my confidence and critical thinking skills more than any class. 3. Community Service Organization: Volunteering at the local food bank gave me perspective and a sense of purpose beyond my own goals. These groups provided structure to my weeks, leadership opportunities I wouldn't have sought otherwise, and a support network during tough times. My advice? Don't just join clubs related to your major - explore your other interests too!",
            image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Extracurricular", "Community"]
          },
          {
            id: 5,
            title: "Surviving Finals Week: My Study Strategies",
            author: "Jason Park",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "After nearly failing my first finals week, I developed a system that helped me ace my exams last semester...",
            content: "My transformation began with creating a master schedule of all exams and deadlines. I started preparing three weeks in advance, breaking material into daily chunks. The library's silent floors became my second home, and I formed a study group where we quizzed each other. I discovered that teaching concepts to others was the best way to solidify my own understanding. For memorization-heavy courses, I created colorful mind maps instead of linear notes. Most importantly, I learned to prioritize sleep - pulling all-nighters hurt my performance more than helped. My grades improved dramatically, and I actually enjoyed the learning process!",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Academics", "Study Tips"]
          },
          {
            id: 6,
            title: "Living Off-Campus: The Good, The Bad, and The Unexpected",
            author: "Maria Gonzalez",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "After two years in dorms, I moved into an apartment with friends. Here's what I wish I'd known beforehand...",
            content: "The freedom is wonderful - no RAs, quiet hours, or shared bathrooms. But adulting hit hard when we had to deal with a broken water heater and splitting utility bills. Grocery shopping and cooking became time-consuming necessities rather than optional activities. I underestimated how much I'd miss spontaneous dorm interactions and being steps away from campus events. The commute adds significant time to my day, but I've learned to use it for podcast listening. The biggest surprise? How much more productive I am with a quiet space to myself. Would I do it again? Absolutely - but with more preparation!",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Housing", "Student Life"]
          },
          {
            id: 7,
            title: "My Summer Research Experience",
            author: "Daniel Kim",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "Working in a professor's lab taught me more than any classroom ever could. Here's why every STEM student should try research...",
            content: "I assisted on a chemistry project studying catalytic reactions, and the hands-on learning was invaluable. The professor treated me as a junior colleague rather than just a student, which boosted my confidence. I learned that real research involves far more trial and error - and failed experiments - than textbooks suggest. The weekly lab meetings improved my scientific communication skills, and presenting my findings at the undergraduate symposium was a highlight. Beyond the technical skills, I gained mentors who wrote recommendation letters for grad school applications. This experience confirmed my desire to pursue a PhD and gave me a competitive edge.",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Research", "STEM"]
          },
          {
            id: 8,
            title: "Managing Mental Health in College",
            author: "Taylor Smith",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: "After struggling with anxiety, I developed coping strategies that helped me thrive academically and personally...",
            content: "The pressure of maintaining grades while navigating new social situations triggered anxiety I didn't know I had. My turning point was visiting the counseling center, where I learned cognitive behavioral techniques. I now start each day with meditation using a mindfulness app, and I've become diligent about scheduling downtime. Exercise became non-negotiable - even just walking across campus helps clear my mind. I learned to recognize when I need to step back from commitments. Most importantly, I discovered many peers face similar challenges, and being open about my struggles led to deeper connections. Your mental health is just as important as your GPA.",
            image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            tags: ["Wellness", "Mental Health"]
          }
        ];
        
        setTimeout(() => {
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };


    fetchPosts();
  }, []);


  const handlePostClick = (postId) => {
    setActivePost(postId);
  };


  const handleBackClick = () => {
    setActivePost(null);
  };


  const handleCreatePost = () => {
    setModalMode('create');
    setCurrentPost({
      id: null,
      title: '',
      author: '',
      excerpt: '',
      content: '',
      image: '',
      tags: []
    });
    setShowModal(true);
  };


  const handleEditPost = (post) => {
    setModalMode('edit');
    setCurrentPost({
      id: post.id,
      title: post.title,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      tags: [...post.tags]
    });
    setShowModal(true); // Force the modal to open immediately
    setActivePost(null); // Optional: Close detail view when editing
  };


  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
      if (activePost === postId) {
        setActivePost(null);
      }
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleAddTag = () => {
    if (currentTag.trim() && !currentPost.tags.includes(currentTag.trim())) {
      setCurrentPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };


  const handleRemoveTag = (tagToRemove) => {
    setCurrentPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'create') {
      const newPost = {
        ...currentPost,
        id: Math.max(...posts.map(p => p.id), 0) + 1,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      setPosts([newPost, ...posts]);
    } else {
      setPosts(posts.map(post => 
        post.id === currentPost.id ? { ...post, ...currentPost } : post
      ));
    }
    
    handleCloseModal();
  };


  if (loading) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }


  if (activePost) {
    const post = posts.find(p => p.id === activePost);
    return (
      <div className="blog-post-detail">
        <div className="post-actions">
          <button onClick={handleBackClick} className="back-button">
            &larr; Back to all posts
          </button>
          <div>
            <button 
              onClick={() => handleEditPost(post)} 
              className="edit-button"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDeletePost(post.id)} 
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="author">By {post.author}</span>
            <span className="date">{post.date}</span>
          </div>
          <div className="tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="post-content">
          <img src={post.image} alt={post.title} className="featured-image" />
          <p>{post.content}</p>
        </div>
      </div>
    );
  }


  return (
    <>
    <Navbar1/>
    <div className="student-blog">
      <div className="blog-header">
        <h2>Beyond the Books</h2>
        <p>Read experiences, tips, and stories from your fellow students</p>
        <button onClick={handleCreatePost} className="create-post-button">
          + Create New Post
        </button>
      </div>
      
      <div className="blog-posts">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="blog-card"
            onClick={(e) => {
              // Only trigger if clicking outside buttons
              if (!e.target.closest('.card-actions button')) {
                handlePostClick(post.id);
              }
            }}
          >
            <div 
              className="card-image" 
              style={{ backgroundImage: `url(${post.image})` }}
              onClick={() => handlePostClick(post.id)}
            ></div>
            <div className="card-content">
              <h2 onClick={() => handlePostClick(post.id)}>{post.title}</h2>
              <div className="post-meta">
                <span className="author">By {post.author}</span>
                <span className="date">{post.date}</span>
              </div>
              <p className="excerpt" onClick={() => handlePostClick(post.id)}>
                {post.excerpt}
              </p>
              <div className="tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="card-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditPost(post);
                  }}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(post.id);
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>


      {showModal && (
        <div className="modal-overlay">
          <div className="create-post-modal">
            <div className="modal-header">
              <h2>{modalMode === 'create' ? 'Create New Post' : 'Edit Post'}</h2>
              <button onClick={handleCloseModal} className="close-button">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentPost.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={currentPost.author}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="excerpt">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={currentPost.excerpt}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={currentPost.content}
                  onChange={handleInputChange}
                  required
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={currentPost.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <div className="tags-input">
                  <input
                    type="text"
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag and press Enter"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <button type="button" onClick={handleAddTag} className="add-tag-button">
                    Add
                  </button>
                </div>
                <div className="tags-preview">
                  {currentPost.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="remove-tag">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {modalMode === 'create' ? 'Publish Post' : 'Update Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};


export default StudentBlog;


