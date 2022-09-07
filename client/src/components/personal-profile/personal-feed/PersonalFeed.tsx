import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Post } from '../post/Post';
import { Stack } from '@mui/material';

export const PersonalFeed = (props: any) => {
   const [userFeed, setUserFeed] = useState<any>([]);

   useEffect(() => {
     fetchUserFeed();
   },[]);

   function fetchUserFeed () {
     axios.get('http://localhost:8080/videoDB/user/feed', {params: {userName: props.userName}})
       .then((results) => {
         setUserFeed(results.data);
       })
       .catch((error: any) => {
         console.log('fetchUserFeed() Failed: ', error);
       })
   }

   return (
      <Stack spacing={2} className="personalFeed">
         {userFeed.map((feedData: any, index: number) => {
         return (
            <Post
               feedData={feedData}
               key={index}
               setValue={props.setValue}
               setFolloweeData={props.setFolloweeData}
            />
         );
         })}
      </Stack>
   );
};
