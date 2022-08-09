import React from 'react';
import './Search.css';

const Search = () => (
  <div className="search">
    <input type="text" placeholder="Search For a song name, albums, artist" />
  </div>
);

Search.defaultProps = {};

export default Search;
