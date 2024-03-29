import React from 'react';
import './Home.css';
import config from '../../config.json';
import useFetch from '../../useFetch';
import Search from '../../components/Search/Search';
import Section from '../../components/Section/Section';
import Loading from '../../components/Loading/Loading';
import Logo from '../../components/Logo/Logo';

const Home = () => {
  const sections = {
    'Trending Now': 'new_trending',
    'Top Playlists': 'top_playlists',
    'New Albums': 'new_albums',
    'Recommended': 'charts'
  };

  let data = { new_trending: {}, top_playlists: {}, new_albums: {}, charts: {} };
  let data_alt = { new_trending: {}, top_playlists: {}, new_albums: {}, charts: {} }
  let error2 = null;
  let isPending2 = false;

  let { isPending, data: Data, error } = useFetch(config.url + '/home');
  data = Data;

  ({ isPending2, data: data_alt, error: error2 } = useFetch('home.json'));
  if (error && !error2 && !isPending2) {
    data = data_alt;
    error = error2;
  }

  return (
    <div className="Home">
      <header>
        <Logo />
        <Search />
      </header>
      {isPending && <Loading />}
      {error && <div><Loading />{error}</div>}
      {!isPending && !error && Object.keys(sections).map(key => {
        return (
          <Section name={key} sectionData={data && data[sections[key]]} key={key} />
        )
      })}
    </div>
  );
};


Home.defaultProps = {};

export default Home;
