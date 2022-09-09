import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Post } from '../post/Post';
import { Stack } from '@mui/material';

export const IndividualFeed = (props: any) => {
   return (
      <div>
        <Stack spacing={2} className="individualFeed">
           {props.userFeed.map((feedData: any, index: number) => {
             return <Post feedData={feedData} key={index} />
           })}
        </Stack>
      </div>
   );
};
