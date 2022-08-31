import React from 'react';
import { Paper } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';

export const FollowingItem = (/*userName: string*/) => {
   return (
      <div>
         <Paper>
          userName
         </Paper>
      </div>
   );
};

// export const FollowingItem = styled(Paper)(({ theme }) => ({
//    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//    ...theme.typography.body2,
//    padding: theme.spacing(2),
//    textAlign: 'center',
//    color: theme.palette.text.secondary,
//  }));
