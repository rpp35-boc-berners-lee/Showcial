import React from 'react';
import { Typography, Grid } from '@mui/material';

interface Props {
   image: string;
   title: string;
   imageUrl: string;
   imageSize: string;
   currentIndex: number;
   totalArrayLength: number;
   itemIndex: number;
}

export const TrendingVideoItem = ({
   image,
   totalArrayLength,
   title,
   imageUrl,
   imageSize,
}: Props) => {
   return (
      <>
         <Grid item xs={4} sm={4} md={3}>
            <div className='item-inner-container'>
               <img src={`${imageUrl}${imageSize}${image}`} alt={title} />
               <Typography variant='h4' align='center'>
                  {title}
               </Typography>
            </div>
         </Grid>
      </>
   );
};
