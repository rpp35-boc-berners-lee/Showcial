import React, { useState, useEffect }  from 'react';
import { SearchItem } from './searchItem/searchItem';
import axios from 'axios';
import { TextField } from '@mui/material';

export const FollowerSearchBar = (props: any) => {
  const [userList, setUserList] = React.useState([]);
  const [matchedUserList, setMatchedUserList] = useState<any>([]);
  const [shownSearchItems, setShownSearchItems] = useState<any>(undefined);

  useEffect(() => {
    fetchUserList();
  }, [])

  useEffect(() => {
    setShownSearchItems(matchedUserList.map((followee: any, index: number) => {
      return (
        <SearchItem
          followee={followee}
          index={index}
          setValue={props.setValue}
          setFolloweeData={props.setFolloweeData}
        />);
    }));
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
    let matchedUsers: any = [];
    if (event.target.value.length >= 2) {
      matchedUsers = userList.filter((user: any) => {
        if (regex.test(user)) {
          return user;
        }
      });
    }
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
        {shownSearchItems}
      </>
    </div>
  );
};