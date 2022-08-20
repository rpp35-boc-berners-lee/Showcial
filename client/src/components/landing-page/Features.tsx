import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Stack, Typography, Grid } from '@mui/material';
import StreamingServicesSVG from './images/streaming-services.svg';
import GetRecommendationsSVG from './images/get-recommendations.svg';
import FriendsListSVG from './images/view-friends-list.svg';
import YoutubeSVG from './images/youtube.svg';

export const Features = () => {
   const featureDescriptions: string[] = [
      'Add streaming services to your account to see what is available for each one, instead of flipping between different services',
      'Get personalized tv show or movie recommendations based on what you are watching from your selected streaming services',
      'Follow other users to see their personal recommendations for inspiration',
      'Leave a rating on movies or tv shows to share your opinion on different services',
   ];

   const featureImages = [
      StreamingServicesSVG,
      GetRecommendationsSVG,
      FriendsListSVG,
      YoutubeSVG,
   ];

   return (
      <Stack direction='column'>
         <Typography variant='h4' component='h2'>
            Features
         </Typography>
         <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
         >
            {featureDescriptions.map((feature, index) => (
               <FeatureCard
                  description={feature}
                  image={featureImages[index]}
                  key={feature}
               />
            ))}
         </Grid>
      </Stack>
   );
};
