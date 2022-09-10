import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { IndividualFeed } from '../individual-feed/individualFeed';
import { VideoCard } from '../../shared/VideoCard';
import { Card, CardHeader, Divider, Button, Stack, Avatar, Box, Grid, Typography } from '@mui/material';

type Props = {
  userName: string;
  watchList: any;
  config: any;
  setValue: any;
  setFolloweeData: any;
}

type Video = {
  base_url: string;
  backdrop_path: string;
  name: string;
  id: number;
  original_title: string;
  media_type: string;
}

const upperCaseReducer = (string: string) => {
  return string.split('').reduce((pV, cV) => {
    return (cV === cV.toUpperCase()) ? pV += cV : pV;
  }, '')
};

export const ForFollower = (props: any) => {
  const [userFeed, setUserFeed] = useState<any>([]);
  const [recommendedList, setRecommendedList] = useState<any>([]);
  const [watchList, setWatchList] = useState<any>([]);

  useEffect(() => {
    fetchUserFeed();
    fetchUserData();
  }, []);

  async function fetchUserData () {
    await axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName: props.followeeData}})
      .then((results: any) => {
        setWatchList(results.data.watchedVideos)
        setRecommendedList(results.data.recommendedVideos);
      })
      .catch((error: any) => {
        console.log('ForFollower/fetchUserData Failed: ', error)
      })
  }

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

 async function removeFollower (username: string, value: string) {
    await axios.put('http://localhost:8080/videoDB/user/removeFollowed', {
      userName: username,
      value: value
    })
    .then(() => {
      console.log('removeFollower SUCCESS')
    })
    .catch((error) => {
      console.log('removeFollower FAILED', error)
    });
  }

  async function addFollower (username: string, value: string) {
   await axios.put('http://localhost:8080/videoDB/user/addFollowed', {
      userName: username,
      value: value
    })
    .then(() => {
      console.log('addFollower SUCCESS')
    })
    .catch((error) => {
      console.log('addFollower FAILED', error)
    });
  }

  let followingButton = undefined;
  let followingStatus = props.followingList.includes(props.followeeData);
  if (followingStatus)  {
    followingButton = (
      <Button className='button' variant='contained' fullWidth onClick={(event: any) => {
        removeFollower(props.userName, props.followeeData);
        event.target.innerText = 'UNFOLLOWED';
      }}>
        Unfollow
      </Button>
    );
  } else {
    followingButton = (
      <Button className='button' variant='contained' fullWidth onClick={(event: any) => {
        addFollower(props.userName, props.followeeData);
        event.target.innerText = 'FOLLOWED';
      }}>
        Follow
      </Button>
    );
  }

  let conditionalWatchList = undefined;
  if (watchList.length) {
    conditionalWatchList =
      (<Grid container spacing={4} justifyContent='center'>
        {watchList.map((video: Video, i: number) => {
          return (
            <Grid item xs={0} key={`trending-${video.media_type}-${video.id}`}>
              <VideoCard
                base_url={props.config.images.base_url}
                backdrop_sizes={props.config.images.backdrop_sizes}
                backdrop_path={video.backdrop_path}
                name={video.name || video.original_title}
                id={video.id}
                mediaType={video.media_type}
              />
            </Grid>
          );
        })}
      </Grid>);
  } else {
    conditionalWatchList =
      (<Typography
        justifyContent="center"
        alignItems="center"
      >
        No Videos in Watch List
      </Typography>)
  }

  return (
    <>
    {/* <Grid justifyContent="center" alignItems="center" sx={{ maxWidth: "75%"}}> */}
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <Avatar
          className="Avatar"
          sx={{ maxFontSize: "3rem", minHeight: "3rem", maxHeight: "7rem", minWidth: "3rem", maxWidth: "7rem"}}
        >
          {upperCaseReducer(props.followeeData)}
        </Avatar>
        <CardHeader
          title={props.followeeData}
          style={{textAlign: 'center'}}
          titleTypographyProps={{variant:'h2' }}
        />
      </Stack>
      <Stack spacing={2} className="individualFeed">
        {followingButton}
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
      </Stack>
      <Divider/>
      <IndividualFeed
        userFeed={userFeed}
      />
      <div  className="individualFeed">
        <Box>
          <Typography>{props.followeeData} Watch List</Typography>
          {conditionalWatchList}
        </Box>
      </div>

    {/* </Grid> */}
    </>
  );
};