import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface Props {
   description: string;
   image: string;
}

export const FeatureCard = ({ description, image }: Props) => {
   return (
      <Grid item xs={4} sm={4} md={3}>
         <Card elevation={0}>
            <CardMedia component='img' image={image} alt={description} />

            <CardContent>
               <Typography variant='subtitle1'>{description}</Typography>
            </CardContent>
         </Card>
      </Grid>
   );
};
