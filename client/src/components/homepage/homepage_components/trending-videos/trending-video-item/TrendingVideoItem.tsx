import React from 'react';
import { Typography, Grid } from '@mui/material';
import { VideoCard } from '../../../../shared/VideoCard';

interface Props {
   image: string;
   title: string;
   imageUrl: string;
   imageSize: string[];
   currentIndex: number;
   itemIndex: number;
   id: number;
}

export const TrendingVideoItem = ({
   image,
   title,
   imageUrl,
   imageSize,
   id
}: Props) => {
   return (
      <>
         <Grid
            item
            xs={4}
            sm={3}
            md={6}
            lg={4}
            xl={4}
            sx={{
               display: 'flex',
               justifyContent: 'center',
               maxWidth: '300px',
            }}
         >
            <VideoCard
               base_url={imageUrl}
               backdrop_sizes={imageSize}
               backdrop_path={image}
               name={title}
               id={id}
            />
         </Grid>
      </>
   );
};
