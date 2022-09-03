import React from 'react';
import { Card, CardContent, CardHeader, Divider, Button } from '@mui/material';
import axios from 'axios';

export const FollowingItem = (props: any) => {
   function removeFollower (userName: string, value: string) {
      axios.put<any>('http://localhost:8080/videoDB/user/removeFollowed', {
            userName: userName,
            value: value
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
                  removeFollower(props.userName, props.followedUserName);
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
