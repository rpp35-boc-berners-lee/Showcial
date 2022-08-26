import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';

// const value = ['FOR YOU', 'FOLLOWING'];

export const SelectBar = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('value: ', value);
    setValue(newValue);
    console.log('new value: ', newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered>
      <Tab icon={<GroupOutlinedIcon />} label="FOLLOWING" />
      <Tab icon={<AssistantPhotoOutlinedIcon />} label="FOR YOU" />
    </Tabs>
  );
}