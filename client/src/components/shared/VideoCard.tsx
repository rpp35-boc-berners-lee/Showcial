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
   id: number;
   mediaType: string;
   getSelected?: (id: number, type: string) => void;
};

export const VideoCard: React.FC<ChildProps> = ({
   base_url,
   backdrop_sizes,
   backdrop_path,
   name,
   id,
   mediaType,
   getSelected,
}) => {
   // const [displayModal, setDisplayModal] = useState(false);
   const image =
      backdrop_path !== null
         ? `${base_url}${backdrop_sizes[0]}${backdrop_path}`
         : 'http://bertsrentals.com/wp-content/uploads/2017/08/300x300-placeholder.jpg';

   return (
      <>
         <Card
            sx={{ minWidth: 300, maxWidth: 300 }}
            onClick={
               getSelected
                  ? () => getSelected(id, mediaType)
                  : () => console.log(id)
            }
         >
            <CardMedia
               component='img'
               height='169'
               image={image}
               alt={name}
               id={`${id}`}
            />
            <CardContent>
               <Typography variant='caption' component='div' align='center'>
                  {name}
               </Typography>
            </CardContent>
         </Card>
      </>
   );
};
