import React, {useState, useEffect} from 'react';
import { Post } from '../post/Post';
import { Stack, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const IndividualFeed = (props: any) => {
   const [displayedPosts, setDisplayedPosts] = useState([]);
   const [numDisplayed, setNumDisplayed] = useState(2);

   useEffect(() => {
      setDisplayedPosts(props.userFeed.slice(0, 2));
   }, [props.userFeed])

   useEffect(() => {
     setDisplayedPosts(props.userFeed.slice(0, numDisplayed));
   }, [numDisplayed])

   const showMore = (<Button variant="text" startIcon={<ExpandMoreIcon />} onClick={() => {
         setNumDisplayed(numDisplayed + 1);
      }}>
         SHOW MORE
      </Button>
   );

   const showLess = (<Button variant="text" startIcon={<ExpandLessIcon />} onClick={() => {
         setNumDisplayed(numDisplayed - 1);
      }}>
         SHOW LESS
      </Button>
   );

   return (
      <div  className="individualFeed">
        <Stack spacing={2}>
           {displayedPosts.map((feedData: any, index: number) => {
             return <Post className='post' feedData={feedData} key={index} />
           })}
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center"  className="showMoreOrLess">
            {(numDisplayed < props.userFeed.length) ? showMore : null}
            {(displayedPosts.length > 2) ? showLess : null}
            {/* {showMore}
            {showLess} */}
        </Stack>
      </div>

   );
};
