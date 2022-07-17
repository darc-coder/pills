import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SongBox.css';

const SongBox = (props) => {
  let { title, type, id, image } = props.song;
  let artistName = "";
  let defaultImgUrl = "default-album.jpg";
  if (props.song.more_info.artistMap)
    artistName = props.song.more_info.artistMap.artists[0].name;
  title = sanityTitle(title);

  const [imgSrc, setimgSrc] = useState(image);

  function imageReplace() {
    setimgSrc(defaultImgUrl);
  }

  return (
    <div className="SongBox" title={title} id={id}>

      <img src={imgSrc} className={imgSrc === defaultImgUrl ? 'skeleton' : ''} alt="" style={styles.img} onError={() => imageReplace()} />
      <h5 title={title}>{title}</h5>
      <h6>{artistName}</h6>
      <h6>{type}</h6>

    </div>
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
