import React from 'react';
import {Modal, Button} from '@mui/material';

export default function Signin (props) {
  return (
    <div>
      <Button variant="contained" onClick={props.openModal}>Sign-in</Button>
      <Modal>
        <form className='Authform'>
          <input type='text' defaultValue='Email'/>
          <input type='text' defaultValue='Password'/>
          <Button variant="contained" onClick={props.verifyLogin}>Sign-in</Button>
        </form>
      </Modal>
    </div>
  )
}