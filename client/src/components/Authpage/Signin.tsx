import * as React from 'react';
import {Modal, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function Signin () {
  const navigate = useNavigate();
  const verifyLogin = () => {
    //checks to see if user is valid
      //if so, navigate('/home')
    //create session with details
  }
  //need a onChange handler for inputs

  return (
    <div>
        <form className='Authform'>
          <input type='text' defaultValue='Email'/>
          <input type='text' defaultValue='Password'/>
          <Button variant="contained" onClick={verifyLogin}>Sign-in</Button>
        </form>
    </div>
  )
}