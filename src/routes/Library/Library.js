import React, { useState, useRef } from 'react';
import useFetch from '../../useFetch';
import AlbumSongItem from '../Album/AlbumSongItem';
import './Library.css';

const Library = () => {
  return (
    <div className="Library">
      <div className="Pic">
        <img src="./resources/transparentUser.png" alt="display pic" />
        {/* <input type="file" name="addPic" id="addPic" accept="image/jpeg;image/png"/> */}
      </div>
      <div className="Accordions">
        <Accordion name="My Favourites" />
        <Accordion name="Recently Played" />
        <Accordion name="Most Played" />
      </div>
    </div>
  );
}

const Accordion = ({ name, children }) => {
  const [Active, setActive] = useState(false);
  const accord = useRef(null);
  const accordion = accord.current;

  const styles = {
    acc_body: {
      maxHeight: Active ? accordion.scrollHeight + 'px' : null,
      marginTop: Active ? '5px' : '0px'
    },
    acc_box: { flexGrow: Active ? 0 : 0 }
  }


  const data1 = ['y6SU1Vib', 'EegWxGAN', 'ZAQZ-9NP', 'bcM2tyCe', 'n3xQwVB2', 'jYdbGQUI', 'ABG3nBws', 'JdLWEx4V', 'fNWlH88Q', 'bgkU5vNk', 'xwAetrd5', 'Fi4Y4WH3'];
  const { isPending, data, error } = useFetch('https://saavn.me/songs?id=' + data1.join(','));

  return (
    <div className="Accordion" onClick={() => setActive(!Active)} style={styles.acc_box}>
      <div className="Accordion-head">{name}</div>
      <div className="Accordion-body" ref={accord} style={styles.acc_body}>
        {data && data1.map(id => <AlbumSongItem key={id} song={data.filter(e => e.id === id)[0]} />)}
      </div>
    </div >
  );
}

Library.defaultProps = {};

export default Library;
