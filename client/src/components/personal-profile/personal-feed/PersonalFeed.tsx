import React from 'react';
import { Post } from '../post/Post';
import { Stack } from '@mui/material';

export const PersonalFeed = () => {
   return (
      <div>
        <Stack spacing={2}>
         <Post />
         <Post />
         <Post />
         <Post />
        </Stack>
         
      </div>
   );
};