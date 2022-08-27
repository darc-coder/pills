import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../useFetch';
import { songIdContext } from '../../SongIdListContext';
import sanityTitle from '../../sanityTitle';
import './Search.css';
import './DataList.css';

const Search = () => {

  const [query, setquery] = useState('');
  const { isPending, data } = useFetch(`https://saavn.me/search/all?query=${query}`);
  const placeholderText = "Search For a song, albums, artist";

  const search = (event) => {
    const value = event.target.value;
    if (value)
      setquery(value);
  }

  return (
    <div className="search">
      <div className="search-box">
        <input type="text" placeholder={placeholderText} className="search-input" onInput={search} />
        <a href="/#" className="search-btn">
          <span className="material-symbols-outlined">search</span>
        </a>
        <SearchResults data={data} isPending={isPending} />
      </div>
    </div>
  );
}

const SearchResults = ({ data, isPending }) => {
  const topQuery = data?.topquery?.data;
  const albums = data?.albums?.data;
  const songs = data?.songs?.data;
  const playlists = data?.playlists?.data;

  return (
    <div className="datalist">
      <CreateOptions queryData={topQuery} />
      <CreateOptions queryData={albums} />
      <CreateOptions queryData={songs} />
      <CreateOptions queryData={playlists} />
    </div>
  )
}

const CreateOptions = ({ queryData }) => {
  return (
    <>
      {queryData && Object.keys(queryData).map((key) => {
        return (<Options key={key} type={queryData[key].type}
          value={queryData[key].title}
          imgSrc={queryData[key].image}
          id={queryData[key].id} />
        );
      })}
    </>
  )
}

const Options = ({ imgSrc, value, type, id }) => {
  const link = `/${(type !== 'song' && type !== 'artist') ? type + '?id=' + id : '#'}`;
  let { setSongId } = useContext(songIdContext);

  const forAudio = () => {
    if (type === 'song')
      setSongId(id);
  }

  return (
    <Link to={link} className="options" onClick={forAudio}>
      <div className="left">
        <img src={imgSrc} alt={`${type} pic`} />
        <span className="value">{sanityTitle(value, true, false)}</span>
      </div>
      <span className="text">{type}</span>
    </Link>
  )
}


Search.defaultProps = {};

export default Search;
