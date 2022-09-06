import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import { WatchProviders } from '.././watch-providers/WatchProviders'
import { PersonalFeed } from '.././personal-feed/PersonalFeed';


export const ForYou = ({userName}: {userName: string}) => {
  const [userFeed, setUserFeed] = useState<any>([]);

  useEffect(() => {
    fetchUserFeed();
  },[]);

  function fetchUserFeed () {
   axios.get('http://localhost:8080/videoDB/user/feed', {params: {userName: userName}})
      .then((results) => {
        console.log('fetchUserFeed() Success: ', results.data);
        setUserFeed(results.data);
      })
      .catch((error: any) => {
        console.log('fetchUserFeed() Failed: ', error);
      })
  }


  return (
     <div>
       <Grid container spacing={2} className='personal-profile'>
         <Grid item xs={12} sm={12} md={3} className='provider-list'>
           <Paper><WatchProviders userName={userName} /></Paper>
         </Grid>
         <Grid item xs={12} sm={12} md={9} className='personal-feed'>
           <PersonalFeed userName={userName} userFeed={userFeed}/>
         </Grid>
       </Grid>
     </div>
  );
};