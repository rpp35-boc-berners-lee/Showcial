import React, {useState} from 'react';
import {Modal, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Signin () {
  const navigate = useNavigate();
  const verifyLogin = () => {
    //send axios post req to '/signin' with usename and password
      //on success navigate to '/home'

  }
  const [values, setValues] = useState({
    userName: '',
    password: ''
  })

  const handleUserNameChange = (e: any) => {
    setValues({
      ...values,
      userName: e.target.value
    })
  }

  const handlePasswordChange = (e: any) => {
    setValues({
      ...values,
      password: e.target.value
    })
  }

  return (
    <div>
        <form className='Authform'>
          <input type='text'
            placeholder='User Name'
            onChange={(e) => handleUserNameChange(e)}
          />
          <input type='text'
            placeholder='Password'
            onChange={(e) => handlePasswordChange(e)}
          />
          <Button variant="contained" onClick={verifyLogin}>Sign-in</Button>
        </form>
    </div>
  )
}