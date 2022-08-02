import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SongBox.css';
import { Link } from 'react-router-dom';

const SongBox = (props) => {
  let { title, type, id, image } = props.song;
  let artistName = "";
  let defaultImgUrl = "default-album.jpg";
  if (props.song.more_info.artistMap)
    artistName = props.song.more_info.artistMap.artists[0].name;
  title = sanityTitle(title);

  const [imgSrc, setimgSrc] = useState(image);
  const [imgLoad, setimgLoad] = useState(false)

  function imageReplace() {
    setimgSrc(defaultImgUrl);
  }

  function songDiv() {
    return (
      <div className="SongBox" title={title} id={id}>

        <img
          ref={(input) => {
            // onLoad replacement for SSR
            if (!input) { return; }
            const img = input;

            const updateFunc = () => {
              setimgLoad(true);
            };
            img.onload = updateFunc;
            if (img.complete) {
              updateFunc();
            }
          }}
          onError={() => imageReplace()}
          className={imgLoad ? '' : 'skeleton'}
          src={imgSrc}
          alt=''
        />
        <h5 title={title}>{title}</h5>
        <h6>{artistName}</h6>
        <h6>{type}</h6>

      </div>
    )
  }

  return (
    <>
      {type === "playlist" && <Link to={'/playlist?id=' + props.song.id}>{songDiv()}</Link>}
      {type === "album" && <Link to={'/album?id=' + props.song.id}>{songDiv()}</Link>}
    </>
  );
};

function sanityTitle(title = "") {
  return title.replace(/\(.*\)/gi, '');
}

const styles = {
  img: {
    height: '100px',
    width: '100px',
    fontSize: '10px'
  }
};

SongBox.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string
};

SongBox.defaultProps = {};

export default SongBox;
