import React from 'react';
import { Card, CardMedia, CardContent, CardHeader, Typography } from '@mui/material';

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