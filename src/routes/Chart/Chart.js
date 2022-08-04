import React from 'react';
import useFetch from '../../useFetch';
import Loading from '../../components/Loading/Loading';
import Album from '../Album/Album';
import './Chart.css';

const Chart = () => {
  let data = { new_trending: {}, top_playlists: {}, new_albums: {}, charts: {} };
  const section = 'charts';
  const { isPending, data: Data, error } = useFetch('/home.json');
  data = Data;


  return (
    <div className="Chart">
      {isPending && <Loading />}
      {error && <div><Loading />{error}</div>}
      {!isPending && !error &&
        <Album type="playlists" queryID={data[section][0].id} />
      }
    </div>
  );
}


Chart.defaultProps = {};

export default Chart;
