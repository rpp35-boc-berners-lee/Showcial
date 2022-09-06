import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.scss';
import { CenterFocusStrongRounded } from '@mui/icons-material';
import { flexbox, Stack } from '@mui/system';

export default function Signup() {
   const navigate = useNavigate();
   const verifySignUp = () => {
      //checks Passwords match
      if (values.password === values.verifyPassword) {
         axios
            .post('http://localhost:8080/auth/signup', {
               params: {
                  userName: values.userName,
                  email: values.email,
                  password: values.password,
                  ownedServices: values.ownedServices,
               },
            })
            .then((res) => {
               console.log('signup res', res);
               navigate('/')
            })
            .catch((err) => {
               console.error(err);
            });
      }
      if (values.password !== values.verifyPassword) {
         // setOpen(true);
         window.alert("Passwords don't match");
      }
   };

   const guestLogin = () => {
      navigate('/');
   };

   const [values, setValues] = useState({
      userName: '',
      email: '',
      password: '',
      verifyPassword: '',
      ownedServices: [],
   });

   const handleUserNameChange = (e: any) => {
      setValues((values) => ({
         ...values,
         userName: e.target.value,
      }));
   };

   const handleEmailChange = (e: any) => {
      setValues((values) => ({
         ...values,
         email: e.target.value,
      }));
   };

   const handlePasswordChange = (e: any) => {
      setValues((values) => ({
         ...values,
         password: e.target.value,
      }));
   };

   const handleVerifyPasswordChange = (e: any) => {
      setValues((values) => ({
         ...values,
         verifyPassword: e.target.value,
      }));
   };

   return (
      <div >
         <Paper sx={{ backgroundColor: '#f7cac9' }}
            className='papersignup' elevation={10}>
            <form className='Authform'>
               <Stack>
                  <TextField
                     sx={{ backgroundColor: 'white', margin: 1 }}
                     type='text'
                     value={values.userName}
                     placeholder='User Name'
                     onChange={(e) => handleUserNameChange(e)}
                  />
                  <TextField
                     className='textfield'
                     sx={{ backgroundColor: 'white', margin: 1 }}
                     type='email'
                     value={values.email}
                     placeholder='Email'
                     onChange={(e) => handleEmailChange(e)}
                  />
                  <TextField
                     sx={{ backgroundColor: 'white', margin: 1 }}
                     type='password'
                     value={values.password}
                     placeholder='Password'
                     onChange={(e) => handlePasswordChange(e)}
                  />
                  <TextField
                     sx={{ backgroundColor: 'white', margin: 1 }}
                     type='password'
                     value={values.verifyPassword}
                     placeholder='Verify Password'
                     onChange={(e) => handleVerifyPasswordChange(e)}
                  />
                  {/* include clickable icons to add "owned services" to profile */}
               </Stack>
            </form>
            <Typography align='center'>
               <Button variant='contained'
                  onClick={verifySignUp}>
                  Sign Up
               </Button>
               <p>OR</p>
               <Button variant='text' color='inherit' onClick={guestLogin}>
                  Continue as a guest
               </Button>
            </Typography>
         </Paper>
      </div>
   );
}
