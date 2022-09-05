import React from 'react';
import { Card, CardMedia, CardContent, CardHeader, Typography } from '@mui/material';


/*
    {
        "_id": "6310387418463778253e0a74",
        "videoName": "Supernatural",
        "userName": "GracefulMackerel",
        "userRating": 8.6,
        "created_at": "2022-08-31T17:28:10.979Z"
    }
*/

export const Post = () => {
  return (
     <div>
      <Card>
      <CardHeader
        title='username'
        subheader='September 14, 2022'
      />
        <CardContent>
          <Typography variant='body2'>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Typography>
        </CardContent>
        <CardMedia className='post-image' src='./371040-disney-pixar-finding-nemo-playstation-3-front-cover.jpeg' />
      </Card>
     </div>
  );
};