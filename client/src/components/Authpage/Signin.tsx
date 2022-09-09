import React, { useState } from 'react';
import {
   Button,
   IconButton,
   Paper,
   TextField,
   Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import { Stack } from '@mui/system';
import './Signin.scss';

export default function Signin() {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      userName: '',
      password: '',
   });
   const verifyLogin = () => {
      axios
         .post('/api/auth/signin', {
            params: {
               userName: values.userName,
               password: values.password,
            },
         })
         .then((res) => {
            console.log('res after calling api/auth/signin', res);
            if (res.status === 201) {
               navigate('/', { replace: true });
            }
         })
         .catch((err) => {
            console.log(`Error logging in as ${values.userName}`, err);
            window.alert('Incorrect username or password');
         });
   };

   const guestLogin = () => {
      navigate('/');
   };

   const handleUserNameChange = (e: any) => {
      setValues({
         ...values,
         userName: e.target.value,
      });
   };

   const handlePasswordChange = (e: any) => {
      setValues({
         ...values,
         password: e.target.value,
      });
   };

   return (
      <div className='signin'>
         <Typography align='center' id='signintitle'>
            <h1 id='signuptitle'>Let's get you signed in!!</h1>
         </Typography>
         <div className='signinpaper'>
            <Paper className='papersignin' elevation={15}>
               <form className='Authform' id='signinForm'>
                  <Stack>
                     <Button
                        sx={{ margin: 3 }}
                        variant='contained'
                        component='a'
                        href='api/auth/login/federated/google'
                        aria-label='sign in with google'
                     >
                        <GoogleIcon />
                        Sign in with Google
                     </Button>
                     <Typography align='center'>
                        <p>
                           OR...
                           <br></br>
                           Enter your username and password
                        </p>
                     </Typography>
                     <TextField
                        sx={{ margin: 1, mt: 0 }}
                        type='text'
                        placeholder='User Name'
                        onChange={(e) => handleUserNameChange(e)}
                     />
                     <TextField
                        sx={{ margin: 1 }}
                        type='password'
                        placeholder='Password'
                        onChange={(e) => handlePasswordChange(e)}
                     />
                     <Button
                        variant='contained'
                        sx={{ margin: 1, mb: 4 }}
                        onClick={verifyLogin}
                     >
                        Sign-in
                     </Button>
                     <Typography align='center'>OR...</Typography>
                     <Button
                        variant='text'
                        color='inherit'
                        onClick={guestLogin}
                     >
                        Continue as a guest
                     </Button>
                  </Stack>
               </form>
            </Paper>
         </div>
      </div>
   );
}
