import React, {useState, useEffect} from 'react';
import './PersonalProfile.scss';
import { ForYou } from './for-you/ForYou';
import { FollowingList } from './following-list/FollowingList';
import { FollowerSearchBar } from './followerSearchBar/followerSearchBar';
import { ForFollower } from './for-follower/ForFollower';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import SelectSearch from 'react-select-search';

//! "for-followed" page is conditionally rendered using currentOption value --> how to set from child component??
  // create hook for friends profile data & pass to SearchBar/FollowingList
  //  pass setValue hook to SearchBar/FollowingList/ForFollower components
  // create condition to render "for-follower" page if value === 3

export const PersonalProfile = () => {
  const [value, setValue] = React.useState(1);
  const [userName, setUserName] = useState<string>('Nourse41'); //! switch to current signed in user
  const [followeeData, setFolloweeData] = useState<any>(undefined)

  let currentOption = value;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('value: ',value);
    setValue(newValue);
    console.log('new value: ',  newValue);
    currentOption = newValue
  };

  const SelectBar = () => {
    return (
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered>
        <Tab icon={<GroupOutlinedIcon />} label="FOLLOWING" />
        <Tab icon={<AssistantPhotoOutlinedIcon />} label="FOR YOU" />
      </Tabs>
    );
  }

  // render FollowingList, ForYou or ForFollow components based off currentOption value
  let component = undefined;
  if (currentOption === 0) {
    // component = FollowingList(setValue, setFolloweeData);
    component = (<FollowingList setValue={setValue} setFolloweeData={setFolloweeData}/>);
  } else if (currentOption === 1) {
    component = (<ForYou />);
  } else if (currentOption === 2) {
    component = (<ForFollower setValue={setValue} setFolloweeData={setFolloweeData}/>);
  }

  return (
    <div>
      <FollowerSearchBar/>
      <SelectBar />
      {component}
    </div>
  );
};