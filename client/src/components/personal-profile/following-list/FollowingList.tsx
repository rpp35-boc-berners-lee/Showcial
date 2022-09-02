import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './FollowingList.scss';
import { FollowingItem } from '../following-item/FollowingItem';
import { Box, Paper, Grid } from '@mui/material';

export const FollowingList = (props: any) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 2, xl: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {props.followingList.map((followedUserName: any, index: any) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <FollowingItem
                followedUserName={followedUserName}
                key={index}
                userName={props.userName}
                setValue={props.setValue}
                setFolloweeData={props.setFolloweeData}
              />
            </Grid>
            );
          })}
        </Grid>
    </Box>
  );
};
