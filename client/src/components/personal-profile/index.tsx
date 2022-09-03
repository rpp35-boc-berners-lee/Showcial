import React, {useState, useEffect} from 'react';
import './PersonalProfile.scss';
import { ForYou } from './for-you/ForYou';
import { FollowingList } from './following-list/FollowingList';
import { FollowerSearchBar } from './FollowerSearchBar/followerSearchBar';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import SelectSearch from 'react-select-search';

//! "for-followed" page is conditionally rendered using currentOption value --> how to set from child component??
//! also conditionally render search page or use search bar style --> how to handle clicking each name?

export const PersonalProfile = () => {
  const [value, setValue] = React.useState(1);
  const [userList, setUserList] = React.useState([]);
  const [userName, setUserName] = useState<string>('Nourse41'); //! switch to current signed in user

  useEffect(() => {
    fetchUserList();
  },[])

  let currentOption = value;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('value: ',value);
    setValue(newValue);
    console.log('new value: ',  newValue);
    currentOption = newValue
  };

  function fetchUserList () {
    axios.get('http://localhost:8080/videoDB/user/all')
      .then((results: any) => {
        setUserList(results.data);
      })
      .catch((error: any) => {
        console.log('fetchUserList() FAILED: ', error);
      })
  }

  const SelectBar = () => {
    return (
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered>
        <Tab icon={<GroupOutlinedIcon />} label="FOLLOWING" />
        <Tab icon={<AssistantPhotoOutlinedIcon />} label="FOR YOU" />
      </Tabs>
    );
  }


  return (
    <div>
      <FollowerSearchBar/>
      <SelectBar />
      {currentOption === 1 ? <ForYou /> : <FollowingList />}
    </div>
  );
};