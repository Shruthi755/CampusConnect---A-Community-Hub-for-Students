import React, { useState } from 'react';
import './LoginPortal.css';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const LoginPortal = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const openLogin = (type) => {
    setLoginType(type);
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
    setEmail('');
    setPassword('');
  };

  const handleLogin = () => {
    if (email === 'user@campusconnect.com' && password === 'pass123') {
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('Invalid credentials. Try user@campusconnect.com / pass123');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`portal-wrapper ${darkMode ? 'dark' : ''}`}>
      <button className="dark-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <h1>Welcome to CampusConnect Portal</h1>

      <div className="portal-container">
        <div className="portal-card" onClick={() => openLogin('Student')}>
          <h2>Student Portal</h2>
          <p>Login to access your classes, assignments, and progress reports.</p>
          <button><FaSignInAlt /> Student Login</button>
        </div>
        <div className="portal-card" onClick={() => openLogin('Staff')}>
          <h2>Staff Portal</h2>
          <p>Login to manage courses, schedules, and student performance.</p>
          <button><FaSignInAlt /> Staff Login</button>
        </div>
      </div>

      {showLogin && (
        <>
          <div className="overlay" onClick={closeLogin}></div>
          <div className="login-popup active">
            <h3>{loginType} Login</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="button-row">
              <button onClick={handleLogin}>
              <i className="fa fa-sign-in-alt"></i> Login
              </button>
              <button className="close-btn" onClick={closeLogin}>
                <i className="fa fa-times"></i> Cancel
              </button>
            </div>

            <p className="sample-creds">Try: user@campusconnect.com / pass123</p>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPortal;
