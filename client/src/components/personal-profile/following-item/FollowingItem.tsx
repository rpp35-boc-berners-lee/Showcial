import React from 'react';
import { Card, CardContent, CardHeader, Divider, Button, Avatar, Stack } from '@mui/material';
import axios from 'axios';

const upperCaseReducer = (string: string) => {
   let result = '';
   for (var i = 0; i < string.length; i++) {
       if (string[i] === string[i].toUpperCase()) {
           result += string[i];
       }
   }
   return result;
 };

 function stringToColor(string: string) {
   let hash = 0;
   let i;

   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
     hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }

   let color = '#';

   for (i = 0; i < 3; i += 1) {
     const value = (hash >> (i * 8)) & 0xff;
     color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */

   return color;
 }

 function stringAvatar(name: string) {
   return {
     sx: {
       bgcolor: stringToColor(name),
     },
     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
   };
 }

// <Avatar {...stringAvatar('Kent Dodds')} /> //! --> for random color badges (not working)

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
         <Stack direction="row" spacing={1}   justifyContent="center" alignItems="center">
            <Avatar className="Avatar">{upperCaseReducer(props.followedUserName)}</Avatar>
            <CardHeader
               style={{ cursor: 'pointer', textAlign: 'center'}}
               onClick={(event: any) => {
                  props.setFolloweeData(props.followedUserName);
                  props.setValue(2);
               }}
               title={props.followedUserName}
            />
         </Stack>
         <Divider/>
         <CardContent style={{textAlign: 'center'}}>
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
