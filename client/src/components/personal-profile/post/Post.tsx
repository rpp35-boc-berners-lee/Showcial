import React from 'react';
import { Card, CardMedia, CardContent, CardHeader, Typography, Divider, Rating, Avatar, Stack } from '@mui/material';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en' // English

TimeAgo.addDefaultLocale(en)
// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

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
  return (
    <Card className="post" sx={{ boxShadow: 12 }}>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <Avatar>{upperCaseReducer(feedData.userName)}</Avatar>
        <CardHeader
          title={feedData.userName}
          subheader={timeAgo.format(new Date(feedData.created_at))}
        />
      </Stack>
      <Divider variant="middle"/>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <CardHeader
        title={feedData.videoName}
        subheader={feedData.comments}
        />
        <Rating name="videoRating" value={feedData.userRating/2} readOnly />
      </Stack>
      <CardMedia className='post-image' src='' />
    </Card>
  );
};