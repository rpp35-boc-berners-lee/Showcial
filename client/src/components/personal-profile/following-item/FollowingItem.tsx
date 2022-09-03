import React, { SyntheticEvent } from 'react';
import { Paper, Card, CardMedia, CardContent, CardHeader, Typography, Shadows, Divider, Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import axios from 'axios';

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

   function removeFollower (userName: any) {
      axios.put<any>('http://localhost:8080/videoDB/user/removeFollowed', {
            userName: parentUserName,
            value: userName
         })
         .then((results: any) => {
            //! change button to undo/update list/
            console.log(`removeFollower(${userName}) Success`, results);
         })
         .catch((error) => {
            console.log('removeFollower() Failed', error);
         })
   }

   return (
      <Card className='followedCard' sx={{ boxShadow: 12 }}>
         <CardHeader
            style={{ cursor: 'pointer', textAlign: 'center'}}
            onClick={(event: any) => {
               console.log(fetchForFollowerData(event.target.innerText));
            }}
           title={userName}
         />
         <Divider/>
         <CardContent
            style={{textAlign: 'center'}}
         >
            <Button
               className='unfollowButton'
               variant='contained'
               fullWidth
               color='secondary'
               onClick={(event: any) => {
                  removeFollower(userName);
                  event.target.innerText = 'REMOVED';
               }}
            >Remove</Button>
         </CardContent>
      </Card>
   );
};

// export const FollowingItem = styled(Paper)(({ theme }) => ({
//    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//    ...theme.typography.body2,
//    padding: theme.spacing(2),
//    textAlign: 'center',
//    color: theme.palette.text.secondary,
//  }));
