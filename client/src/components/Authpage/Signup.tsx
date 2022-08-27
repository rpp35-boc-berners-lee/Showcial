import React, {useState} from 'react';
import { Modal, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Signup () {
  const navigate = useNavigate();
  const verifySignUp = () => {
      //checks Passwords match
    if (values.password === values.verifyPassword) {
      //send axios req to '/signup' with states as params
      let options = {
        url: 'http://localhost:8080/signup',
        method: 'post',
        params: {
          userName: values.userName,
          email: values.email,
          password: values.password,
          services: values.services
        }
      }
      axios(options)
        .then((res) =>
          navigate('/home'))
        .catch((err) =>
          console.error(err))
    } else {
      //if passwords dont match
        //use mui alert to say passwords dont match
    }
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
    userName: '',
    email: '',
    password: '',
    verifyPassword: '',
    services: []
  });

  const handleUserNameChange = (e: any) => {
    setValues((values) => ({
      ...values,
      userName: e.target.value,
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
            value={values.userName}
            placeholder='User Name'
            onChange={(e) => handleUserNameChange(e)}
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