import React, { useState, useEffect } from 'react';
import {
   Card,
   CardMedia,
   CardContent,
   CardHeader,
   Typography,
   Divider,
   Rating,
   Avatar,
   Stack,
} from '@mui/material';

// import TimeAgo functionality
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const upperCaseReducer = (string: string) => {
   return string.split('').reduce((pV, cV) => {
      return cV === cV.toUpperCase() ? (pV += cV) : pV;
   }, '');
};

export const Post = (props: any) => {
   const [postData, setPostData] = useState<any>({
      _id: '6310387418463778253e0a6b',
      videoName: 'La La Land',
      userName: 'SmilingPanda',
      userRating: 7.8,
      created_at: '2022-08-31T17:37:10.979Z',
      comments: 'Love the music!',
   });

   useEffect(() => {
      if (props.feedData) {
         setPostData(props.feedData);
      }
   });

   return (
      <Card className='post' sx={{ boxShadow: 12 }}>
         <Stack
            direction='row'
            spacing={1}
            justifyContent='left'
            alignItems='center'
            onClick={() => {
               console.log('clicked')
               props.setFolloweeData(postData.userName);
               props.setValue(2);
            }}
         >
            <Avatar>{upperCaseReducer(postData.userName)}</Avatar>
            <CardHeader
               title={postData.userName}
               subheader={timeAgo.format(new Date(postData.created_at))}
            />
         </Stack>
         <Divider variant='middle' />
         <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='left'
         >
            <CardHeader
               title={postData.videoName}
               subheader={postData.comments}
            />
            <CardContent>
               <Rating
                  name='videoRating'
                  value={postData.userRating / 2}
                  readOnly
               />
            </CardContent>
         </Stack>
         <CardMedia
            height='180'
            component='img'
            className='post-image'
            image={
               postData.image !== undefined
                  ? postData.image
                  : 'http://bertsrentals.com/wp-content/uploads/2017/08/300x300-placeholder.jpg'
            }
         />
      </Card>
   );
};
