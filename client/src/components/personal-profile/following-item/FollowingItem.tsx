import React, { SyntheticEvent } from 'react';
import { Paper, Card, CardMedia, CardContent, CardHeader, Typography, Shadows, Divider, Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import axios from 'axios';

// make an onClick function for username that makes axios request for users data and passes it to for-follower page

export const FollowingItem = (props: any) => {
   function removeFollower () {
      axios.put<any>('http://localhost:8080/videoDB/user/removeFollowed', {
            userName: props.userName,
            value: props.followedUserName
         })
         .then((results: any) => {
            console.log(`removeFollower(${props.userName}) Success`, results);
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
               props.setFolloweeData(props.followedUserName);
               props.setValue(2);
            }}
           title={props.followedUserName}
         />
         <Divider/>
         <CardContent
            style={{textAlign: 'center'}}
         >
            <Button
               className='button'
               variant='contained'
               fullWidth
               color='secondary'
               onClick={(event: any) => {
                  removeFollower();
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
