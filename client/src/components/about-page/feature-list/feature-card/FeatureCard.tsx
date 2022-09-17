import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface Props {
   description: string;
   image: string;
}

export const FeatureCard = ({ description, image }: Props) => {
   return (
      <Grid item xs={4} sm={4} md={3} data-testid='feature-card'>
         <Card elevation={1} sx={{ minHeight: '400px', maxHeight: '400px' }}>
            <CardMedia
               component='img'
               image={image}
               alt={description}
               height={'auto'}
            />
            <CardContent>
               <Typography variant='body1'>{description}</Typography>
            </CardContent>
         </Card>
      </Grid>
   );
};
