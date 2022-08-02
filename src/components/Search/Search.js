import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const Search = () => (
  <div className="search">
    <input type="text" placeholder="Search For a song name, albums, artist" />
  </div>
);

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
