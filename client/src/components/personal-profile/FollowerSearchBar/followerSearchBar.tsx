import React, { useState, useEffect }  from 'react';
import { SearchItem } from './searchItem/searchItem'
import axios from 'axios';
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
  const [userList, setUserList] = React.useState([]);
  const [matchedUserList, setMatchedUserList] = useState<any>([]);
  const [shownSearchItems, setShownSearchItems] = useState<any>(undefined);

  useEffect(() => {
    fetchUserList();
  }, [])

  useEffect(() => {
    let elements = matchedUserList.map((followee: any) => {
      return SearchItem(followee);
    });
    setShownSearchItems(elements);
    console.log(shownSearchItems);
  }, [matchedUserList])

  function fetchUserList () {
    axios.get('http://localhost:8080/videoDB/user/all')
      .then((results: any) => {
        setUserList(results.data);
      })
      .catch((error: any) => {
        console.log('fetchUserList() FAILED: ', error);
      })
  }

  function handleChange (event: any) {
    let regex = new RegExp(event.target.value);
    let matchedUsers = userList.filter((user: any) => {
      if (regex.test(user)) {
        return user;
      }
    });
    setMatchedUserList(matchedUsers);
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
      <>
        {/* render matching usernames here */}
        {shownSearchItems}
      </>
    </div>
  );
};