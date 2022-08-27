import React from 'react';
import './FollowingList.scss';
import { FollowingItem } from '../following-item/FollowingItem';

import { Box, Paper, Grid } from '@mui/material';


// export const FollowingList = () => {
//    return (
//       <div>
//          <p>This is following list</p>
//       </div>
//    );
// };



 export const FollowingList = () => {
   return (
     <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
         {Array.from(Array(6)).map((_, index) => (
           <Grid xs={2} sm={4} md={4} key={index}>
             <FollowingItem />
           </Grid>
         ))}
       </Grid>
     </Box>
   );
 }