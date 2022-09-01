import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './FollowingList.scss';
import { FollowingItem } from '../following-item/FollowingItem';
import { Box, Paper, Grid } from '@mui/material';

export const FollowingList = () => {
  const [followingList, setFollowingList] = useState<any>([])
  const [userName, setUserName] = useState<string>('Nourse41'); //! switch to current signed in user

  useEffect(() => {
    fetchFollowingList();
  },[])

  function fetchFollowingList () {
    axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
      .then((results: any) => {
        setFollowingList(results.data.followingList);
      })
      .catch((error) => {
        console.log('fetchFollowingList() Failed', error);
      })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 2, xl: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {followingList.map((followedUserName: any, index: any) => {
          return (
            <Grid xs={2} sm={4} md={4} key={index}>
              {FollowingItem(followedUserName, index, userName)}
            </Grid>
            );
          })}
        </Grid>
    </Box>
  );
};
