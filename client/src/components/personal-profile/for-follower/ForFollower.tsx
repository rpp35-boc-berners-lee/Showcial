import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { PersonalFeed } from '../personal-feed/PersonalFeed';
import {Card, CardMedia, CardContent, CardHeader, Shadows, Divider, Button } from '@mui/material';


// create button that sets index value back to 1 or 2 (save previous value)??

export const ForFollower = (props: any) => {
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
    axios.put('http://localhost:8080/videoDB/user/removeFollowed', {
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

  useEffect(() => {
    // setForFollowerData(fetchForFollowerData(props.followeeData));
  }, [])

  // check if followee is currently followed by owner account & render add/remove friend button
  let followingButton = undefined;
  let followingStatus = props.followingList.includes(props.followeeData);
  if (followingStatus)  {
    followingButton = (
      <Button
        className='backButton'
        variant='contained'
        fullWidth
        onClick={removeFollower}
      >
        Unfollow
      </Button>
    );
  } else {
    followingButton = (
      <Button
        className='button'
        variant='contained'
        fullWidth
        onClick={addFollower}
      >
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
