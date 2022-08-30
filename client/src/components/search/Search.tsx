import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ConfigAPI, APIResponse  } from '../../../../types';
import { VideoCard } from '../shared/VideoCard'

type ChildProps = {
  query: string;
  config: any;
}

export const Search:React.FC<ChildProps> = ({ query, config }) => {
  const [searchResults, setSearchResults] = useState<APIResponse | undefined>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchAPI();
  }, [])

  async function fetchAPI () {
    let search = await axios.get<APIResponse>(`http://localhost:8080/tmdb/search/${query}/${page}`);
    setSearchResults(search.data);
  }

  return (
      <>
        <h3>SEARCH RESULTS</h3>
        {/* {topTV !== undefined ?
        <YourWatchList watchList={topTV.results} config={config}/>: null} */}
      </>
  );
}