import React from 'react';
import './VideoCard.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type ChildProps = {
  base_url: string;
  backdrop_sizes: string[];
  backdrop_path: string;
  name: string;
}

export const VideoCard:React.FC<ChildProps> = ({ base_url, backdrop_sizes, backdrop_path, name }) => {
   return (
      <Card sx={{ minWidth: 300, maxWidth: 300}}>
         <CardMedia
            component='img'
            height='169'
            image={backdrop_path !== null ? `${base_url}${backdrop_sizes[0]}${backdrop_path}` : 'http://bertsrentals.com/wp-content/uploads/2017/08/300x300-placeholder.jpg'}
            alt={name}
         />
         <CardContent>
            <Typography variant='caption' component='div' align='center'>
               {name}
            </Typography>
         </CardContent>
      </Card>
   );
};
