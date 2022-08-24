import * as React from 'react';
import { Modal, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Signup () {
  const navigate = useNavigate();
  const verifySignUp = () => {
    //checks the following
      //email is valid and not already in use
        //if invalid, use mui alert to tell user
        //if in use, use mui alert to tell user
      //Passwords match
    //if checks pass, enters the user into the users table in the database
      //and updates session
    //then redirects to the home page
  };
  const guestLogin = () => {
    //update session to be 'guest' if not already
    navigate('/home');
  }
  //need a onChange handler for inputs

  return (
    <div>
        <form className='Authform'>
          <input type='text' defaultValue='First Name' />
          <input type='text' defaultValue='Last Name' />
          <input type='text' defaultValue='Email' />
          <input type='text' defaultValue='Password' />
          <input type='text' defaultValue='Verify Password'/>
          {/* include clickable icons to add "owned services" to profile */}
          <Button variant="contained" onClick={verifySignUp}>Sign Up</Button>
          <p>OR</p>
          <Button variant="contained" onClick={guestLogin}>Continue as a guest</Button>
        </form>
    </div>
  )
}