import React from 'react';
import { Card, CardMedia, CardContent, CardHeader, Typography, Divider, Rating, Avatar, Stack } from '@mui/material';

const feedData =  {
  "_id": "6310387418463778253e0a6b",
  "videoName": "La La Land",
  "userName": "SmilingPanda",
  "userRating": 7.8,
  "created_at": "2022-08-31T17:37:10.979Z",
  "comments": "Love the music!"
};

const upperCaseReducer = (string: string) => {
  let result = '';
  for (var i = 0; i < string.length; i++) {
      if (string[i] === string[i].toUpperCase()) {
          result += string[i];
      }
  }
  return result;
};

export const Post = (props: any) => {
  console.log('feedData', feedData);
  return (
     <div>
      <Card>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <Avatar>{upperCaseReducer(feedData.userName)}</Avatar>
        <CardHeader
          title={feedData.userName}
          subheader={feedData.created_at}
        />
      </Stack>
      <Divider/>
        <CardHeader
          title={feedData.videoName}
          subheader={feedData.comments}
        />
        <CardContent>
          <Rating name="videoRating" value={feedData.userRating/2} readOnly />
        </CardContent>
        <CardMedia className='post-image' src='' />
      </Card>
     </div>
  );
};