import React from 'react';
import config from '../../config.json';
import { useLocation } from 'react-router-dom';
import useFetch from '../../useFetch';
import AlbumSection from './AlbumSection';
import Loading from '../../components/Loading/Loading';
import './Album.css';

const Album = ({ type, queryID }) => {
  let query = useQuery();
  let queryId = queryID || query.get('id');

  return (
    <div className="Album">
      <AlbumDiv album_id={queryId || '0'} type={type} />
    </div>
  )
};

function AlbumDiv({ album_id, type }) {

  let { isPending, data, error } = useFetch(config.url + '/' + type + '?id=' + album_id);

  return (
    <>
      {album_id === undefined && <div>No Album id</div>}
      {isPending && <Loading />}
      {error && <><Loading /> <div>Error: {error}</div></>}
      {data && <AlbumSection data={data} />}
    </>
  )

}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

Album.propTypes = {};

Album.defaultProps = {};

export default Album;
