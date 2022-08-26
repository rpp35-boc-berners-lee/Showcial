import React, {useState} from 'react';
import { Modal, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostAdd } from '@mui/icons-material';


export default function Signup () {
  const navigate = useNavigate();
  const verifySignUp = () => {
      //checks Passwords match
    //if checks pass, enters the user into the users table in the database
      //and updates session
    //then redirects to the home page
  };
  const guestLogin = () => {
    //send a post request to '/guest'
    let options: any = {
      url: 'http://localhost:8080/guest',
      method: 'post'
    }
    axios(options)
      .then((res) =>
    navigate('/home'))
      .catch((err) =>
      console.error(err))
  }

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: ''
  });

  const handleFirstNameChange = (e: any) => {
    setValues((values) => ({
      ...values,
      firstName: e.target.value,
    }));
  }

  const handleLastNameChange = (e: any) => {
    setValues((values) => ({
      ...values,
      lastName: e.target.value,
    }));
  }

  const handleEmailChange = (e: any) => {
    setValues((values) => ({
      ...values,
      email: e.target.value,
    }));
  }

  const handlePasswordChange = (e: any) => {
    setValues((values) => ({
      ...values,
      password: e.target.value,
    }));
  }

  const handleVerifyPasswordChange = (e: any) => {
    setValues((values) => ({
      ...values,
      verifyPassword: e.target.value,
    }));
  }

  return (
    <div>
        <form className='Authform'>
          <input type='text'
            value={values.firstName}
            placeholder='First Name'
            onChange={(e) => handleFirstNameChange(e)}
          />
          <input type='text'
            value={values.lastName}
            placeholder='Last Name'
            onChange={(e) => handleLastNameChange(e)}
          />
          <input type='text'
            value={values.email}
            placeholder='Email'
            onChange={(e) => handleEmailChange(e)}
          />
          <input type='text'
            value={values.password}
            placeholder='Password'
            onChange={(e) => handlePasswordChange(e)}
          />
          <input
            type='text'
            value={values.verifyPassword}
            placeholder='Verify Password'
            onChange={(e) => handleVerifyPasswordChange(e)}
          />
          {/* include clickable icons to add "owned services" to profile */}
          <Button variant="contained" onClick={verifySignUp}>Sign Up</Button>
          <p>OR</p>
          <Button variant="contained" onClick={guestLogin}>Continue as a guest</Button>
        </form>
    </div>
  )
}