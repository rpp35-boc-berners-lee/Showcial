import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './PersonalProfile.scss';
// import { SelectBar } from './select-bar/SelectBar';
import { ForYou } from './for-you/ForYou';
import { FollowingList } from './following-list/FollowingList';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';


export const PersonalProfile = () => {
  const [value, setValue] = React.useState(1);
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
  
   return (
      <div>
        <SelectBar />
        {currentOption === 1 ? <ForYou /> : <FollowingList />}
      </div>
   );
};