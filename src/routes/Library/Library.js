import React, { useState } from 'react';
import './Library.css';

const Library = () => {
  return (
    <div className="Library">
      <Accordion name="My Favourites" />
      <Accordion name="Recently Played" />
      <Accordion name="Most Played" />
    </div>
  );
}

const Accordion = ({ name, children }) => {
  const [Active, setActive] = useState(false);
  return (
    <div className="Accordion">
      {name}
    </div>
  );
}

Library.defaultProps = {};

export default Library;
