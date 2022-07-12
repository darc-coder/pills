import React, { useState } from 'react';
import './NavBar.css';

const NavBar = (props) => {
  const [navItems, setnavItems] = useState({
    Home: {
      name: 'Home',
      link: '#home',
      icon: 'home'
    },
    Chart: {
      name: 'Chart',
      link: '#chart',
      icon: 'show_chart'
    },
    Library: {
      name: 'Library',
      link: '#library',
      icon: 'library_music'
    }
  });

  const [activeNav, setactiveNav] = useState("Home");

  return (
    <nav className="bottom-nav">
      {Object.keys(navItems).map((key) => {
        return (
          <li className={key == activeNav ? 'active' : ''} key={key} onClick={() => { setactiveNav(key); props.activeNav(key); }}>
            <a href={navItems[key].link}>
              <span className="material-symbols-outlined">{navItems[key].icon}</span>
              <span className="text">{navItems[key].name}</span>
            </a>
          </li>
        )
      })}
    </nav>
  )
};

NavBar.defaultProps = {};

export default NavBar;
