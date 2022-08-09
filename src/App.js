import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import SongIdListContext from './SongIdListContext';
import ActivePageContext, { activeNavContext } from './ActivePageContext';
import Home from './routes/Home/Home';
import Chart from './routes/Chart/Chart';
import Library from './routes/Library/Library';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import Album from './routes/Album/Album';
import Player from './components/Player/Player';


function App() {
  return (
    <ActivePageContext>
      <MainApp />
    </ActivePageContext>
  );
}

const MainApp = () => {
  const pages = { Home: 0, Chart: 1, Library: 2 };
  const { activeNav, activatePage } = useContext(activeNavContext);
  return (
    <SongIdListContext>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={["/", "/chart", "/library"]}>
              <Pages pages={pages} activeNav={activeNav} activateNav={activatePage} />
            </Route>
            <Route path="/album/">
              <Album type="albums" />
            </Route>
            <Route path="/playlist/">
              <Album type="playlists" />
            </Route>
          </Switch>
          <Player />
          <NavBar activateNav={activatePage} activePage={activeNav} />
        </Router >
      </div >
    </SongIdListContext>
  )
}

function Page(props) {
  let { pages, activeNav, name } = props;
  let style = {
    transform: `translateX(calc(${pages[name] - pages[activeNav]}*100%)`,
    overflowY: name === 'Home' ? 'scroll' : ''
  };

  return (
    <div className="page" name={props.name} style={style}>
      {props.childComponents()}
    </div>
  )
}

function Pages({ pages, activeNav, activateNav }) {
  let location = useLocation();

  switch (location.pathname.slice(1,)) {
    case 'chart':
      activateNav('Chart');
      break;
    case 'library':
      activateNav('Library');
      break;
    default: activateNav('Home');
      break;
  }

  return (
    <div className="pages">
      <Page pages={pages} activeNav={activeNav} name="Home" childComponents={Home} />

      <Page pages={pages} activeNav={activeNav} name="Chart" childComponents={Chart} />

      <Page pages={pages} activeNav={activeNav} name="Library" childComponents={Library} />
    </div >
  );
}

export default App;
