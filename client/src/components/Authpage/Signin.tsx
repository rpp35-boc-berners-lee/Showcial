import React, { useState } from 'react';
import { Modal, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';


export default function Signin() {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      userName: '',
      password: '',
   });
   const verifyLogin = () => {
      axios
         .post('http://localhost:8080/auth/signin', {
            params: {
               userName: values.userName,
               password: values.password,
            },
         })
         .then((res) => {
            console.log('status', res);
            if (res.status === 201) {
               navigate('/');
            }
         })
         .catch((err) => {
            console.log(`Error logging in as ${values.userName}`, err);
            window.alert('Incorrect username or password');
         });
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
      <div>
         <Button
            variant='contained'
            component='a'
            href='api/auth/login/federated/google'
            aria-label='sign in with google'
         >
            <GoogleIcon />
            Sign in with Google
         </Button>
         <form className='Authform' id='signinForm'>
            <input
               id='Usernameinput'
               type='text'
               placeholder='User Name'
               onChange={(e) => handleUserNameChange(e)}
            />
            <input
               id='Passwordinput'
               type='text'
               placeholder='Password'
               onChange={(e) => handlePasswordChange(e)}
            />
            <Button variant='contained' onClick={verifyLogin}>
               Sign-in
            </Button>
         </form>
      </div>
   );
}
