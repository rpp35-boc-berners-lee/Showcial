import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { PersonalFeed } from '../personal-feed/PersonalFeed';
import {Card, CardMedia, CardContent, CardHeader, Shadows, Divider, Button } from '@mui/material';


// create button that sets index value back to 1 or 2 (save previous value)??

export const ForFollower = (props: any) => {
  const [userFeed, setUserFeed] = useState<any>([]);

  useEffect(() => {
    fetchUserFeed();
  },[]);

  function fetchUserFeed () {
   axios.get('http://localhost:8080/videoDB/user/individualFeed', {params: {userName: props.followeeData}})
      .then((results) => {
        console.log('fetchUserFeed() Success: ', results.data);
        setUserFeed(results.data);
      })
      .catch((error: any) => {
        console.log('fetchUserFeed() Failed: ', error);
      })
  }

  function removeFollower () {
    axios.put('http://localhost:8080/videoDB/user/removeFollowed', {
      username: props.userName,
      value: props.followeeData
    })
    .then(() => {
      console.log('removeFollower SUCCESS')
    })
    .catch((error) => {
      console.log('removeFollower FAILED', error)
    });
  }

  function addFollower () {
    axios.put('http://localhost:8080/videoDB/user/addFollowed', {
      username: props.userName,
      value: props.followeeData
    })
    .then(() => {
      console.log('addFollower SUCCESS')
    })
    .catch((error) => {
      console.log('addFollower FAILED', error)
    });
  }

  // check if followee is currently followed by owner account & render add/remove friend button
  let followingButton = undefined;
  let followingStatus = props.followingList.includes(props.followeeData);
  if (followingStatus)  {
    followingButton = (
      <Button className='backButton' variant='contained' fullWidth onClick={removeFollower}>
        Unfollow
      </Button>
    );
  } else {
    followingButton = (
      <Button className='button' variant='contained' fullWidth onClick={addFollower}>
        Follow
      </Button>
    );
  }

  return (
    <>
    <Card>
      <CardHeader
        title={props.followeeData}
        style={{textAlign: 'center'}}
      />
      {followingButton}
      <Divider className='divider'/>
      <Button
          className='button'
          variant='contained'
          fullWidth
          color='secondary'
          onClick={() => {
            props.setValue(1);
          }}
      >
        Back
      </Button>
      <PersonalFeed />
    </Card>
    </>
  );
};
