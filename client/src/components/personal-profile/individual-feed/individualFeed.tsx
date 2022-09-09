import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Post } from '../post/Post';
import { Stack, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const IndividualFeed = (props: any) => {
   const [displayedPosts, setDisplayedPosts] = useState([]);
   const [numDisplayed, setNumDisplayed] = useState(0);

   const showMore = (<Button variant="text" startIcon={<ExpandMoreIcon />} onClick={() => {
         setNumDisplayed(numDisplayed + 2);
      }}>
         SHOW MORE
      </Button>
   );

   const showLess = (<Button variant="text" startIcon={<ExpandLessIcon />} onClick={() => {
      setNumDisplayed(numDisplayed - 2);
   }}>
      SHOW LESS
   </Button>
);



   return (
      <div  className="individualFeed">
        <Stack spacing={2}>
           {props.userFeed.map((feedData: any, index: number) => {
             return <Post className='post' feedData={feedData} key={index} />
           })}
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center"  className="showMoreOrLess">
           {showMore}
           {showLess}
        </Stack>
      </div>

   );
};
