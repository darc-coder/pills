import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  const [navItems, setnavItems] = useState({
    Home: {
      name: 'Home',
      link: '/',
      icon: 'home_app_logo'
    },
    Chart: {
      name: 'Chart',
      link: '/chart',
      icon: 'show_chart'
    },
    Library: {
      name: 'Library',
      link: '/library',
      icon: 'library_music'
    }
  });

  return (
    <nav className="bottom-nav">
      {Object.keys(navItems).map(key => {
        return (
          <li className={key == props.activePage ? 'active' : ''} key={key} onClick={() => { props.activateNav(key) }}>
            <Link to={navItems[key].link}>
              <span className="material-symbols-outlined">{navItems[key].icon}</span>
              <span className="text">{navItems[key].name}</span>
            </Link>
          </li>
        )
      })}
    </nav>
  )
};

NavBar.defaultProps = {};

export default NavBar;
