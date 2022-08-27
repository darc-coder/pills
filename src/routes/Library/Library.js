import React, { useState, useRef } from 'react';
import Loading from '../../components/Loading/Loading';
import useFetch from '../../useFetch';
import AlbumSongItem from '../Album/AlbumSongItem';
import './Library.css';

const Library = () => {
  const FavouritesObj = JSON.parse(localStorage.getItem('favourites')) || {};
  const Favourites = FavouritesObj ? Array.from(FavouritesObj).slice(0, 50) : [];
  const RecentPlayObj = JSON.parse(localStorage.getItem('recently')) || [];
  const RecentPlay = RecentPlayObj ? Array.from(RecentPlayObj).slice(0, 30) : [];
  const MostPlayedObj = JSON.parse(localStorage.getItem('mostPlayed')) || {};
  const SanitizedArr = SanityArray(Object.keys(MostPlayedObj).map(key => [key, MostPlayedObj[key]]));
  const MostPlayed = SanitizedArr.sort((a, b) => b[1] - a[1]).map(key => key[0]).slice(0, 30);

  return (
    <div className="Library">
      <div className="Pic">
        <img src="./resources/userListen.png" alt="display pic" />
        <input type="file" name="addPic" id="addPic" accept="image/jpeg;" />
        <span class="material-symbols-outlined addPic">
          add_a_photo
        </span>
      </div>
      <div className="Accordions">
        <Accordion name="My Favourites" songIDList={Favourites} />
        <Accordion name="Recently Played" songIDList={RecentPlay} />
        <Accordion name="Most Played" songIDList={MostPlayed} />
      </div>
    </div>
  );
}

const SanityArray = (array) => {
  return array.filter(key => key[0] && key[0] !== 'undefined' && key[0] !== 'null');
}

const Accordion = ({ name, songIDList }) => {
  const [Active, setActive] = useState(false);
  const accord = useRef(null);
  const accordion = accord.current;

  const styles = {
    acc_body: {
      maxHeight: Active ? accordion.scrollHeight + 'px' : null,
      marginTop: Active ? '5px' : '0px',
      marginBottom: Active ? '5px' : '0px'

    },
    acc_box: { flexGrow: Active ? 1 : 0 },
    empty: {
      textAlign: 'center',
    }
  }


  const { isPending, data, error } = useFetch('https://saavn.me/songs?id=' + songIDList.join(','));

  return (
    <div className="Accordion" onClick={() => setActive(!Active)} style={styles.acc_box}>
      <div className="Accordion-head">{name}</div>
      <div className="Accordion-body" ref={accord} style={styles.acc_body}>
        {isPending && !error && <Loading />}
        {error && <><div>Error: {error}</div></>}
        {!songIDList.length && <div style={styles.empty}>Empty</div>}
        {data instanceof Array && songIDList.map(id => <AlbumSongItem key={id} song={data?.filter(e => e.id === id)[0]} />)}
        {data instanceof Object && !Array.isArray(data) && songIDList.map(id => <AlbumSongItem key={id} song={data} />)}
      </div>
    </div >
  );
}

Library.defaultProps = {};

export default Library;
