import React from 'react';
import './Home.css';
import useFetch from '../../useFetch';
import Search from '../../components/Search/Search';
import Section from '../../components/Section/Section';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const sections = {
    'Trending Now': 'new_trending',
    'Top Playlists': 'top_playlists',
    'New Albums': 'new_albums',
    'Recommended': 'charts'
  };

  let data = { new_trending: {}, top_playlists: {}, new_albums: {}, charts: {} };

  const { isPending, data: Data, error } = useFetch('/home.json');
  data = Data;

  return (
    <div className="Home">
      <Search />
      {isPending && <Loading />}
      {error && <div><Loading />{error}</div>}
      {!isPending && !error && Object.keys(sections).map(key => {
        return (
          <Section name={key} sectionData={data[sections[key]]} key={key} />
        )
      })}
    </div>
  );
};


Home.defaultProps = {};

export default Home;
