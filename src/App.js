import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home/Home';
import Chart from './routes/Chart/Chart';
import Library from './routes/Library/Library';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {
  const pages = { Home: 0, Chart: 1, Library: 2 };
  const [activeNav, setactiveNav] = useState("Home");

  function activePage(page) {
    setactiveNav(page);
  }

  return (
    <Router>
      <div className="App">
        <div className="pages">
          <Page pages={pages} activeNav={activeNav} name="Home" childComponents={Home} />

          <Page pages={pages} activeNav={activeNav} name="Chart" childComponents={Chart} />

          <Page pages={pages} activeNav={activeNav} name="Library" childComponents={Library} />

          <NavBar activeNav={activePage} />
        </div >
      </div >
    </Router>
  );
}

function Page(props) {
  let { pages, activeNav, name } = props
  return (
    <div className="page" name={props.name} style={{ transform: `translateX(calc(${pages[name] - pages[activeNav]}*100%)` }}>
      {props.childComponents()}
    </div>
  )
}

export default App;
