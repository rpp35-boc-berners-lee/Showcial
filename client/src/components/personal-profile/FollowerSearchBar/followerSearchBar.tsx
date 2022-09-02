import React, { useState, useEffect }  from 'react';
import {
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  Shadows,
  Divider,
  Button,
  TextField
} from '@mui/material';


export const FollowerSearchBar = (allFollowers: any) => {
  const [allFollowersList, setAllFollowersList] = useState<any>(allFollowers);
  const [searchQuery, setSearchQuery] = useState<any>('');
  const [shownFollowersList, setShownFollowersList] = useState<any>([]);

  function handleChange (event: any) {
    setSearchQuery(event.target.value);
    setShownFollowersList(allFollowersList.map((userName: string) => {
      if (userName.includes(searchQuery)) {
        return userName;
      }
    }));
    console.log('searchQuery', searchQuery);
    console.log('allFollowersList', allFollowersList)
    console.log('shownFollowersList', shownFollowersList);
  }

  return (
    <div>
      <TextField
        className='followerSearchBar'
        fullWidth
        label="Search to find more followers..."
        variant="standard"
        onChange={handleChange}
      />
    </div>
    // render matching usernames here
  );
};