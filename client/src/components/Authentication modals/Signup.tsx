import React from 'react';
import { Modal, Button } from '@mui/material';

export default function Signin (props) {
  return (
    <div>
      <Button variant="contained" onClick={props.openModal}>Sign Up</Button>
      <Modal>
        <form className='Authform'>
          <input type='text' defaultValue='First Name' />
          <input type='text' defaultValue='Last Name' />
          <input type='text' defaultValue='Email' />
          <input type='text' defaultValue='Password' />
          <input type='text' defaultValue='Verify Password'/>

          <Button variant="contained" onClick={props.verifySignUp}>Sign Up</Button>
        </form>
      </Modal>
    </div>
  )
}