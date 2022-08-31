import React from 'react';
import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

export const FollowingItem = (userName: string, index: number) => {
   return (
      <Paper>
         <div><button >{userName}</button></div>
         <div><button>remove</button></div>
      </Paper>
   );
};
