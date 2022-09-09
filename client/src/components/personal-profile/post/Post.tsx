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
      <Card sx={{ boxShadow: 12, minWidth: 600, maxWidth: 600 }}>
         <Stack
            className='postTile'
            direction='row'
            spacing={1}
            justifyContent='center'
            alignItems='center'
            style={{cursor: 'pointer'}}
            onClick={() => {
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
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='center'
         >
            <Stack
               spacing={1}
               alignItems='center'
               justifyContent='center'
            >
               <>
                  <CardHeader
                     title={postData.videoName}
                     subheader={postData.comments}
                  />
                     <Rating
                        name='videoRating'
                        value={postData.userRating / 2}
                        readOnly
                     />
               </>
            </Stack>
            <CardMedia
               className="postImage"
               sx={{ minWidth: 300, maxWidth: 300 }}
               height='169'
               component='img'
               image={
                  postData.image !== undefined
                     ? postData.image
                     : 'http://bertsrentals.com/wp-content/uploads/2017/08/300x300-placeholder.jpg'
               }
            />
         </Stack>
      </Card>
   );
};
