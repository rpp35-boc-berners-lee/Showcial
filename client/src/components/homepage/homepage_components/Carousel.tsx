import { VideoCard } from './VideoCard';
import React from 'react';
import Box from '@mui/material/Box';
// import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { defaultOptionsDirect } from '@testing-library/user-event/dist/types/options';
import Grid from '@mui/material/Grid';

type Props = {
   vedioList: any;
   config: any;
};

type Video = {
   base_url: string;
   backdrop_path: string;
   name: string;
   id: number;
};

const breakPoints = [
   { width: 1, itemsToShow: 1 },
   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
   { width: 768, itemsToShow: 3 },
   { width: 1200, itemsToShow: 4 },
];

export const CarouselList: React.FC<Props> = ({ vedioList, config }) => {
   return (
      <div>
         {/* <Carousel> */}
         {vedioList.map((video: Video) => {
            return (
               <Paper>
                  <VideoCard
                     base_url={config.images.base_url}
                     backdrop_sizes={config.images.backdrop_sizes}
                     backdrop_path={video.backdrop_path}
                     name={video.name}
                     key={video.id}
                  />
               </Paper>
            );
         })}
         {/* </Carousel> */}
      </div>
   );
};
