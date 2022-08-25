import React from 'react';
import { Stack, Typography } from '@mui/material';

interface Props {
   image: string;
   name: string;
   imageUrl: string;
   imageSize: string;
}

export const TrendingVideoItem = ({
   image,
   name,
   imageUrl,
   imageSize,
}: Props) => {
   console.log('imageUrl:', imageUrl);
   console.log('imageSize:', imageSize);
   console.log('image:', image);
   return (
      <>
         <Stack direction='column'>
            <img src={`${imageUrl}${imageSize}${image}`} alt={name} />
            <Typography variant='h4'>{name}</Typography>
         </Stack>
      </>
   );
};
