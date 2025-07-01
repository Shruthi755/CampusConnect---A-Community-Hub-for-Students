import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiMessageSquare, FiShare2, FiBookmark, FiMoreHorizontal, FiX, FiCheck } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DiscussionForum.css';
import Navbar1 from '../Navbar1/Navbar1';

ChartJS.register(ArcElement, Tooltip, Legend);

const DiscussionForum = () => {
  // Thread data state
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'Best resources for Machine Learning in 2023?',
      author: { name: 'Alex Johnson', avatar: 'AJ', role: 'CS Professor' },
      category: 'Computer Science',
      replies: 24,
      views: 315,
      lastReply: '2 hours ago',
      isPinned: true,
      isBookmarked: false,
      upvotes: 42,
      downvotes: 3,
      content: 'Looking for the most up-to-date resources on ML. Specifically interested in:\n- Online courses\n- Research papers\n- Practical projects\n\n@ProfSmith, any recommendations from the department?',
      comments: [
        { 
          id: 1, 
          author: { name: 'Taylor Swift', avatar: 'TS', role: 'Grad Student' }, 
          text: 'Andrew Ng\'s new ML specialization on Coursera is excellent! Covers everything from basics to transformers.', 
          upvotes: 15,
          timestamp: '1 hour ago'
        },
      ],
      poll: null,
      tags: ['machine-learning', 'education'],
      timestamp: '2023-05-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Campus Food Quality Survey - Vote Now!',
      author: { name: 'Sarah Miller', avatar: 'SM', role: 'Student Council' },
      category: 'Feedback',
      replies: 18,
      views: 427,
      lastReply: '1 day ago',
      isPinned: true,
      isBookmarked: false,
      upvotes: 38,
      downvotes: 2,
      content: 'We\'re collecting feedback to improve campus dining options. Please vote and share your thoughts below!',
      comments: [],
      poll: {
        question: 'How would you rate the current campus food quality?',
        options: [
          { id: 1, text: 'Excellent - Love it!', votes: 45, color: '#2ecc71' },
          { id: 2, text: 'Good - Satisfied', votes: 78, color: '#3498db' },
          { id: 3, text: 'Average - Could improve', votes: 92, color: '#f39c12' },
          { id: 4, text: 'Poor - Needs overhaul', votes: 63, color: '#e74c3c' },
        ],
        voted: false,
        totalVotes: 278
      },
      tags: ['feedback', 'campus-life'],
      timestamp: '2023-05-14T08:15:00Z'
    }
  ]);

  // UI state
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeThread, setActiveThread] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    category: 'Computer Science',
    isPoll: false,
    pollQuestion: '',
    pollOptions: ['', ''],
    tags: []
  });
  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [availableUsers] = useState([
    { name: 'ProfSmith', avatar: 'PS', role: 'Faculty' },
    { name: 'AdminTeam', avatar: 'AT', role: 'Administration' },
    { name: 'CS_Department', avatar: 'CS', role: 'Department' }
  ]);

  // Refs
  const editorRef = useRef(null);
  const mentionMenuRef = useRef(null);

  // Filter threads
  const filteredThreads = threads.filter(thread => {
    const matchesCategory = activeCategory === 'All' || thread.category === activeCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle thread voting
  const handleThreadVote = useCallback((threadId, type) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        const hasUpvoted = thread.userVote === 'up';
        const hasDownvoted = thread.userVote === 'down';
        
        let newUpvotes = thread.upvotes;
        let newDownvotes = thread.downvotes;
        let newUserVote = null;
        
        if (type === 'up') {
          if (hasUpvoted) {
            newUpvotes -= 1;
          } else {
            newUpvotes += 1;
            if (hasDownvoted) newDownvotes -= 1;
            newUserVote = 'up';
          }
        } else {
          if (hasDownvoted) {
            newDownvotes -= 1;
          } else {
            newDownvotes += 1;
            if (hasUpvoted) newUpvotes -= 1;
            newUserVote = 'down';
          }
        }
        
        return { 
          ...thread, 
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote
        };
      }
      return thread;
    }));
  }, [threads]);

  // Handle poll voting
  const handlePollVote = useCallback((threadId, optionId) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId && thread.poll && !thread.poll.voted) {
        const updatedOptions = thread.poll.options.map(opt => 
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        
        return { 
          ...thread, 
          poll: {
            ...thread.poll,
            options: updatedOptions,
            voted: true,
            totalVotes: thread.poll.totalVotes + 1
          }
        };
      }
      return thread;
    }));
  }, [threads]);

  // Handle reply submission
  const handleReplySubmit = useCallback(() => {
  if (!replyContent.trim() || !activeThread) return;
  
  const newComment = {
    id: Date.now(),
    author: { name: 'CurrentUser', avatar: 'CU', role: 'Student' },
    text: replyContent,
    upvotes: 0,
    timestamp: 'Just now'
  };

  const updatedThread = {
    ...activeThread,
    comments: [...activeThread.comments, newComment],
    replies: activeThread.replies + 1,
    lastReply: 'Just now'
  };

  setThreads(threads.map(thread => 
    thread.id === activeThread.id ? updatedThread : thread
  ));
  
  setActiveThread(updatedThread);
  setReplyContent('');
  setShowMentions(false);

  // Scroll to the new comment after a small delay to allow DOM update
  setTimeout(() => {
    const commentsSection = document.querySelector('.comment-list');
    if (commentsSection) {
      commentsSection.scrollTop = commentsSection.scrollHeight;
    }
  }, 100);
}, [activeThread, replyContent, threads]);

  // Handle mention detection
  const handleContentChange = useCallback((e) => {
    const value = e.target.value;
    setReplyContent(value);
    
    // Detect @mention
    const lastAtPos = value.lastIndexOf('@');
    if (lastAtPos >= 0 && (value.length === lastAtPos + 1 || value[lastAtPos + 1] === ' ')) {
      setShowMentions(true);
      setMentionQuery('');
      mentionMenuRef.current.style.top = `${e.target.selectionStart * 1.5}px`;
    } else if (lastAtPos >= 0) {
      const query = value.slice(lastAtPos + 1).split(' ')[0];
      setMentionQuery(query);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  }, []);

  // Insert mention
  const insertMention = useCallback((username) => {
    const currentPos = editorRef.current.selectionStart;
    const textBefore = replyContent.substring(0, currentPos);
    const lastAtPos = textBefore.lastIndexOf('@');
    
    const newText = 
      replyContent.substring(0, lastAtPos) + 
      `@${username}` + 
      replyContent.substring(currentPos);
    
    setReplyContent(newText);
    setShowMentions(false);
    editorRef.current.focus();
  }, [replyContent]);

  // Toggle bookmark
  const toggleBookmark = useCallback((threadId) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, isBookmarked: !thread.isBookmarked } 
        : thread
    ));
  }, [threads]);

  // Create new thread
  const handleCreateThread = useCallback(() => {
    const newThreadObj = {
      id: Date.now(),
      title: newThread.title,
      author: { name: 'CurrentUser', avatar: 'CU', role: 'Student' },
      category: newThread.category,
      replies: 0,
      views: 0,
      lastReply: 'Just now',
      isPinned: false,
      isBookmarked: false,
      upvotes: 0,
      downvotes: 0,
      content: newThread.content,
      comments: [],
      poll: newThread.isPoll ? {
        question: newThread.pollQuestion,
        options: newThread.pollOptions
          .filter(opt => opt.trim() !== '')
          .map((opt, idx) => ({ 
            id: idx + 1, 
            text: opt, 
            votes: 0,
            color: ['#2ecc71', '#3498db', '#f39c12', '#e74c3c'][idx % 4]
          })),
        voted: false,
        totalVotes: 0
      } : null,
      tags: newThread.tags,
      timestamp: new Date().toISOString()
    };
    
    setThreads([newThreadObj, ...threads]);
    setIsCreateModalOpen(false);
    setNewThread({
      title: '',
      content: '',
      category: 'Computer Science',
      isPoll: false,
      pollQuestion: '',
      pollOptions: ['', ''],
      tags: []
    });
  }, [newThread, threads]);

  // Add poll option
  const addPollOption = useCallback(() => {
    setNewThread(prev => ({
      ...prev,
      pollOptions: [...prev.pollOptions, '']
    }));
  }, []);

  // Remove poll option
  const removePollOption = useCallback((index) => {
    setNewThread(prev => {
      const newOptions = [...prev.pollOptions];
      newOptions.splice(index, 1);
      return {
        ...prev,
        pollOptions: newOptions
      };
    });
  }, []);

  // Render poll component
  const renderPoll = (poll, onVote) => {
    return (
      <div className="poll-section">
        <h3>{poll.question}</h3>
        <p className="total-votes">{poll.totalVotes} votes</p>
        
        {poll.voted ? (
          <div className="poll-results">
            
            <div className="poll-stats">
              {poll.options.map(opt => (
                <div key={opt.id} className="poll-stat">
                  <div className="stat-color" style={{ backgroundColor: opt.color }} />
                  <span className="stat-text">{opt.text}</span>
                  <span className="stat-percent">
                    {Math.round((opt.votes / poll.totalVotes) * 100)}%
                  </span>
                  <span className="stat-votes">({opt.votes} votes)</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="poll-options">
            {poll.options.map(opt => (
              <button
                key={opt.id}
                className="poll-option"
                onClick={() => onVote(opt.id)}
                style={{ borderLeftColor: opt.color }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render comment section
  const renderCommentSection = () => {
    if (!activeThread) return null;
    
    return (
      <div className="comments-section">
        <h3>Replies ({activeThread.comments.length})</h3>
        
        {activeThread.comments.length > 0 ? (
          <ul className="comment-list">
            {activeThread.comments.map(comment => (
              <li key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="author-info">
                    <div className="avatar">{comment.author.avatar}</div>
                    <div>
                      <span className="author-name">{comment.author.name}</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="comment-votes">
                    <button className="upvote">
                      <FiArrowUp />
                      <span>{comment.upvotes}</span>
                    </button>
                  </div>
                </div>
                
                <div className="comment-content">
                  {comment.text}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-comments">No replies yet. Be the first to respond!</p>
        )}
        
        <div className="reply-box">
          <div className="editor-container">
            <textarea
              ref={editorRef}
              placeholder="Write your reply..."
              value={replyContent}
              onChange={handleContentChange}
              rows={4}
            />
            
            {showMentions && (
              <div className="mention-menu" ref={mentionMenuRef}>
                {availableUsers
                  .filter(user => 
                    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
                  )
                  .map(user => (
                    <div 
                      key={user.name}
                      className="mention-item"
                      onClick={() => insertMention(user.name)}
                    >
                      <div className="avatar">{user.avatar}</div>
                      <div>
                        <div className="mention-name">{user.name}</div>
                        <div className="mention-role">{user.role}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
          
          <div className="reply-actions">
            <button 
              className="cancel-reply"
              onClick={() => setReplyContent('')}
            >
              Cancel
            </button>
            <button 
              className="submit-reply"
              onClick={handleReplySubmit}
              disabled={!replyContent.trim()}
            >
              Post Reply
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render thread card
  const renderThreadCard = (thread) => {
    return (
      <motion.li
        key={thread.id}
        className={`thread-card ${thread.isPinned ? 'pinned' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        layout
      >
        <div className="thread-main" onClick={() => setActiveThread(thread)}>
          <div className="thread-content">
            <div className="thread-header">
              <h3>{thread.title}</h3>
              {thread.isPinned && <span className="pinned-badge">Pinned</span>}
            </div>
            
            <div className="thread-excerpt">
              {thread.content.substring(0, 150)}{thread.content.length > 150 ? '...' : ''}
            </div>
            
            <div className="thread-meta">
              <div className="author-info">
                <div className="avatar">{thread.author.avatar}</div>
                <div>
                  <span className="author-name">{thread.author.name}</span>
                  <span className="author-role">{thread.author.role}</span>
                </div>
              </div>
              
              <div className="thread-stats">
                <div className="vote-box">
                  <button 
                    className={`upvote ${thread.userVote === 'up' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThreadVote(thread.id, 'up');
                    }}
                  >
                    <FiArrowUp style={{ color: "green" }} />
                    {thread.upvotes}
                  </button>
                  <button 
                    className={`downvote ${thread.userVote === 'down' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThreadVote(thread.id, 'down');
                    }}
                  >
                    <FiArrowDown style={{ color: "red" }} />
                    {thread.downvotes}
                  </button>
                  <div className="vote-percentage">
                    {Math.round((thread.upvotes / (thread.upvotes + thread.downvotes || 1)) * 100)}%
                  </div>
                </div>
                <div className="stat-item">
                  <FiMessageSquare />
                  {thread.replies}
                </div>
              </div>
            </div>
            
            {thread.poll && (
              <div className="poll-preview">
                <div className="poll-question">{thread.poll.question}</div>
                <div className="poll-options">
                  {thread.poll.options.slice(0, 2).map(opt => (
                    <div key={opt.id} className="poll-option">
                      <div 
                        className="option-bar" 
                        style={{ 
                          width: `${(opt.votes / thread.poll.totalVotes) * 100}%`,
                          backgroundColor: opt.color
                        }}
                      />
                      <span className="option-text">{opt.text}</span>
                      <span className="option-percent">
                        {Math.round((opt.votes / thread.poll.totalVotes) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {thread.tags.length > 0 && (
              <div className="thread-tags">
                {thread.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="thread-actions">
          <button 
            className={`bookmark-btn ${thread.isBookmarked ? 'bookmarked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(thread.id);
            }}
            aria-label={thread.isBookmarked ? 'Remove bookmark' : 'Bookmark thread'}
          >
            <FiBookmark />
          </button>
          
          <button className="more-options">
            <FiMoreHorizontal />
          </button>
        </div>
      </motion.li>
    );
  };

  return (
    <>
      <Navbar1/>
      <div className="discussion-forum">
        <header className="forum-header">
          <div className="header-content">
            <motion.div 
              className="header-title-wrapper"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>
                <span className="campus-text">Discuss.</span>
                <span className="connect-text">Engage.</span>
                <span className="campus-text">Grow</span>
              </h1>
              <div className="header-subtitle">
                <p className="subtitle">Your Hub for Campus Conversations</p>
                <div className="animated-dots">
                  <span className="dot" style={{ animationDelay: '0s' }}>•</span>
                  <span className="dot" style={{ animationDelay: '0.2s' }}>•</span>
                  <span className="dot" style={{ animationDelay: '0.4s' }}>•</span>
                </div>
              </div>
            </motion.div>
            <div className="header-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-line"></div>
            </div>
          </div>
        </header>
        
        <main className="forum-main">
          <aside className="forum-sidebar">
            <div className="sidebar-section categories">
              <h3>Categories</h3>
              <ul>
                {['All', 'Computer Science', 'Mathematics', 'Events', 'Q&A', 'Feedback', 'Clubs', 'Announcements'].map(cat => (
                  <li key={cat}>
                    <button
                      className={activeCategory === cat ? 'active' : ''}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="sidebar-section stats">
              <h3>Forum Stats</h3>
              <div className="stat-item">
                <span className="stat-value">{threads.length}</span>
                <span className="stat-label">Threads</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{threads.reduce((sum, thread) => sum + thread.replies, 0)}</span>
                <span className="stat-label">Replies</span>
              </div>
            </div>
          </aside>

          <div className="thread-container">
            <div className="thread-controls">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search threads, tags, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </div>
              
              <motion.button
                className="create-thread-btn"
                onClick={() => setIsCreateModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + New Thread
              </motion.button>
            </div>

            <AnimatePresence>
              {filteredThreads.length > 0 ? (
                <ul className="thread-list">
                  {filteredThreads.map(thread => renderThreadCard(thread))}
                </ul>
              ) : (
                <motion.div 
                  className="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3>No threads found</h3>
                  <p>Try adjusting your search or create a new thread</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <AnimatePresence>
          {isCreateModalOpen && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
            >
              <motion.div 
                className="modal-content"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>Create New Thread</h2>
                  <button 
                    className="close-modal"
                    onClick={() => setIsCreateModalOpen(false)}
                    aria-label="Close modal"
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="thread-title">Title</label>
                    <input
                      id="thread-title"
                      type="text"
                      placeholder="What's your question or topic?"
                      value={newThread.title}
                      onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="thread-category">Category</label>
                    <select
                      id="thread-category"
                      value={newThread.category}
                      onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                    >
                      {['Computer Science', 'Mathematics', 'Events', 'Q&A', 'Feedback', 'Clubs', 'Announcements'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="thread-content">Content</label>
                    <textarea
                      id="thread-content"
                      placeholder="Write your post here. You can use Markdown for formatting..."
                      value={newThread.content}
                      onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                      rows={8}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="poll-toggle">
                      <input
                        type="checkbox"
                        checked={newThread.isPoll}
                        onChange={(e) => setNewThread({ ...newThread, isPoll: e.target.checked })}
                      />
                      <span>Include a poll</span>
                    </label>
                    
                    {newThread.isPoll && (
                      <div className="poll-form">
                        <div className="form-group">
                          <label htmlFor="poll-question">Poll Question</label>
                          <input
                            id="poll-question"
                            type="text"
                            placeholder="What would you like to ask?"
                            value={newThread.pollQuestion}
                            onChange={(e) => setNewThread({ ...newThread, pollQuestion: e.target.value })}
                          />
                        </div>
                        
                        <label>Poll Options</label>
                        {newThread.pollOptions.map((option, index) => (
                          <div key={index} className="poll-option-input">
                            <input
                              type="text"
                              placeholder={`Option ${index + 1}`}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...newThread.pollOptions];
                                newOptions[index] = e.target.value;
                                setNewThread({ ...newThread, pollOptions: newOptions });
                              }}
                            />
                            {newThread.pollOptions.length > 2 && (
                              <button
                                className="remove-option"
                                onClick={() => removePollOption(index)}
                                aria-label="Remove option"
                              >
                                <FiX />
                              </button>
                            )}
                          </div>
                        ))}
                        
                        {newThread.pollOptions.length < 6 && (
                          <button
                            className="add-option-btn"
                            onClick={addPollOption}
                          >
                            + Add Option
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="thread-tags">Tags (comma separated)</label>
                    <input
                      id="thread-tags"
                      type="text"
                      placeholder="e.g., machine-learning, campus-life"
                      value={newThread.tags.join(', ')}
                      onChange={(e) => setNewThread({ 
                        ...newThread, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                      })}
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    className="cancel-btn"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="submit-btn"
                    onClick={handleCreateThread}
                    disabled={!newThread.title || !newThread.content}
                  >
                    Post Thread
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeThread && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveThread(null)}
            >
              <motion.div 
                className="modal-content thread-detail"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>{activeThread.title}</h2>
                  <button 
                    className="close-modal"
                    onClick={() => setActiveThread(null)}
                    aria-label="Close modal"
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className="thread-detail-content">
                  <div className="thread-header">
                    <div className="author-info">
                      <div className="avatar">{activeThread.author.avatar}</div>
                      <div>
                        <span className="author-name">{activeThread.author.name}</span>
                        <span className="author-role">{activeThread.author.role}</span>
                      </div>
                    </div>
                    
                    <div className="thread-meta">
                      <span className="timestamp">
                        {new Date(activeThread.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span className="category-badge">{activeThread.category}</span>
                    </div>
                  </div>
                  
                  <div className="thread-body">
                    <div className="thread-content">
                      {activeThread.content.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    
                    {activeThread.poll && renderPoll(activeThread.poll, (optionId) => 
                      handlePollVote(activeThread.id, optionId)
                    )}
                    
                    {activeThread.tags.length > 0 && (
                      <div className="thread-tags">
                        {activeThread.tags.map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="thread-footer">
                    <div className="vote-buttons">
                      <button 
                        className={`upvote ${activeThread.userVote === 'up' ? 'active' : ''}`}
                        onClick={() => handleThreadVote(activeThread.id, 'up')}
                      >
                        <FiArrowUp />
                        <span>{activeThread.upvotes}</span>
                      </button>
                      <button 
                        className={`downvote ${activeThread.userVote === 'down' ? 'active' : ''}`}
                        onClick={() => handleThreadVote(activeThread.id, 'down')}
                      >
                        <FiArrowDown />
                        <span>{activeThread.downvotes}</span>
                      </button>
                    </div>
                    
                    <div className="action-buttons">
                      <button className="action-btn">
                        <FiShare2 /> Share
                      </button>
                      <button 
                        className={`action-btn ${activeThread.isBookmarked ? 'bookmarked' : ''}`}
                        onClick={() => toggleBookmark(activeThread.id)}
                      >
                        <FiBookmark /> {activeThread.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {renderCommentSection()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default DiscussionForum;