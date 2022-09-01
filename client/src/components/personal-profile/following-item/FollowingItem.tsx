import React, { SyntheticEvent } from 'react';
import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import axios from 'axios';

// make an onClick function for remove friend (axios request)
// make an onClick function for username that makes axios request for users data and passes it to for-follower page

export const FollowingItem = (userName: string, index: number, parentUserName: string) => {

   async function fetchForFollowerData (userName: string) {
     await axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
         .then((results: any) => {
            console.log(results.data);
            return results.data;
         })
         .catch((error) => {
            console.log('fetchForFollowerData() Failed', error);
         });
   }

   function removeFollower (userName: string) {
      axios.put<any>('http://localhost:8080/videoDB/user/removeFollowed', {
            userName: parentUserName,
            value: userName
         })
         .then((results: any) => {
            //! change button to undo/update list/change username displayed to removed ???
            console.log(`removeFollower(${userName}) Success`, results);
         })
         .catch((error) => {
            console.log('removeFollower() Failed', error);
         })
   }

   return (
      <Paper>
         <div><button onClick={(event: any) => {
            console.log(fetchForFollowerData(event.target.innerText));
         }}>{userName}</button></div>
         <div><button onClick={(event: any) => {
            // console.log(`Remove ${userName}!`)
            removeFollower(userName);
         }}>remove</button></div>
      </Paper>
   );
};
