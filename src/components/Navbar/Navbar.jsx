import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Add useLocation
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';
import logo3 from '../../assets/logo_2.png';
import menu_icon from '../../assets/menu-icon.png';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    })
  },[]);
  const [mobileMenu, setMobileMenu] =useState(false);
  const toggleMenu =() =>{
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <nav className={`container ${sticky? 'dark-nav':'' } `}>
      
      <Link to="/" onClick={closeMobileMenu}>
        <img src={logo3} alt="Logo" className='logo' />
      </Link>
      
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li><ScrollLink to='hero' smooth={true} offset={0} duration={500} onClick={closeMobileMenu}>Home</ScrollLink></li>
        <li><Link to="/Discussion" onClick={closeMobileMenu}>Discussion Forum</Link></li>
        <li><Link to="/StudentBlog" onClick={closeMobileMenu}>Blog</Link></li>
        <li><Link to="/EventCalendar" onClick={closeMobileMenu}>Event Calendar</Link></li>
        <li><Link to="/JobPortal" onClick={closeMobileMenu}>Job Portal</Link></li>
        <li><Link to="/Testimonial" onClick={closeMobileMenu}>Testimonials</Link></li>
        <li>
          <ScrollLink 
            to='contact' 
            smooth={true} 
            offset={-260} 
            duration={500} 
            onClick={closeMobileMenu}
          >
            <button className='btn'>Contact us</button>
          </ScrollLink>
        </li>
      </ul>
      
      <img 
        src={menu_icon} 
        alt="Menu" 
        className='menu-icon' 
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;