import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FollowingItem } from '../following-item/FollowingItem';
import { Paper, Card, CardMedia, CardContent, CardHeader, Typography, Shadows, Divider, Button } from '@mui/material';


// create button that sets index value back to 1 or 2 (save previous value)??

export const ForFollower = (props: any) => {
  // get follower data
  const [forFollowerData, setForFollowerData] = useState<any>(undefined);

  async function fetchForFollowerData (userName: string) {
    await axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
        .then((results: any) => {
           console.log(results.data);
           return results.data;
        })
        .catch((error) => {
           console.log('fetchForFollowerData() Failed', error);
        });
  }

  useEffect(() => {
    console.log(fetchForFollowerData(props.followeeData));
  }, [])

  // check if followee is currently followed by owner account & render add/remove friend button


  return (
    <>
      <div> For-Follower</div>
      <div>{props.followeeData}</div>
      <div>{forFollowerData}</div>
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
