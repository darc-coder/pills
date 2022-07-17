import React from 'react';
import PropTypes from 'prop-types';
import './Section.css';
import SongBox from '../SongBox/SongBox';

const Section = (props) => {
  // console.log(props.sectionData);
  return (
    <>
      <span className="section-header">
        <h2>{props.name}</h2>
      </span>
      <div className="Section">
        {props.sectionData.map((song, index) => {
          return (
            <SongBox key={index} song={song} />
          )
        })
        }
      </div>
    </>
  );
};

Section.defaultProps = {
  name: PropTypes.string
};

export default Section;
