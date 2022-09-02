import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FollowingItem } from '../following-item/FollowingItem';
import { Paper, Card, CardMedia, CardContent, CardHeader, Typography, Shadows, Divider, Button } from '@mui/material';


// create button that sets index value back to 1 or 2 (save previous value)??

export const ForFollower = (props: any) => {

  return (
    <>
      <div> For-Follower</div>
      <div>{props.followeeData}</div>
      <Button
          className='backButton'
          variant='contained'
          fullWidth
          color='secondary'
          onClick={() => {
            props.setValue(1);
          }}
      >
        Back
      </Button>
    </>
  );
};
