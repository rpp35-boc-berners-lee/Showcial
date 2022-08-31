import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ConfigAPI, APIResponse  } from '../../../../types';
import { YourWatchList } from '../../components/homepage/homepage_components/YourWatchList';

type ChildProps = {
  query: string;
}

export const Search:React.FC<ChildProps> = ({ query = '' }) => {
  const [config, setConfig] = useState<ConfigAPI | undefined>();
  const [searchResults, setSearchResults] = useState<APIResponse | undefined>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchAPI();
  }, [])

  async function fetchAPI () {
    let search = await axios.get<APIResponse>(`http://localhost:8080/tmdb/search/${query}/${page}`);
    setSearchResults(search.data);
    let config = await axios.get<ConfigAPI>(`http://localhost:8080/tmdb/configuration`);
    setConfig(config.data);
  }

  // handleChange(e: ChangeEvent<HTMLInputElement>)

  return (
      <>
        <h3>SEARCH RESULTS</h3>
        {searchResults !== undefined ?
        <YourWatchList watchList={searchResults.results} config={config}/>: null}
      </>
  );
}