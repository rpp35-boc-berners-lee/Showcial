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
import { ConfigAPI } from '../../../../types';

export const PersonalProfile = () => {
  const [value, setValue] = React.useState(1);
  const [userName, setUserName] = useState<any>('JamesFranco'); //! switch to current signed in user
  const [followeeData, setFolloweeData] = useState<any>(undefined);
  const [followingList, setFollowingList] = useState<any>([]);
  const [recommendedList, setRecommendedList] = useState<any>([]);
  const [watchList, setWatchList] = useState<any>([]);
  const [config, setConfig] = useState<ConfigAPI | undefined>();

  const fetchAPI = async () => {
    let config = await axios.get<ConfigAPI>(`http://localhost:8080/tmdb/configuration`);
    setConfig(config.data);
  }

  useEffect(() => {
    fetchUserData();
    fetchAPI();
  },[])

  function fetchUserData () {
    axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
      .then((results: any) => {
        setFollowingList(results.data.followingList);
        setRecommendedList(results.data.recommendedVideos);
        setWatchList(results.data.watchedVideos)
      })
      .catch((error) => {
        console.log('fetchFollowingList() Failed', error);
      })
  }

  let currentOption = value;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('value: ', value);
    setValue(newValue);
    console.log('new value: ', newValue);
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

  // Conditionally render main component (FollowingList/For-You/For-Follower), SelectBar and FollowerSearchBar
  let followerSearchBar = undefined;
  let selectBar = undefined;
  let component = undefined;
  if (currentOption === 0) {
    followerSearchBar = (<FollowerSearchBar setValue={setValue} setFolloweeData={setFolloweeData}/>);
    selectBar = (<SelectBar />);
    component = (<FollowingList setValue={setValue} userName={userName} setFolloweeData={setFolloweeData} followingList={followingList}/>);
  } else if (currentOption === 1) {
    followerSearchBar = (<FollowerSearchBar setValue={setValue} setFolloweeData={setFolloweeData}/>);
    selectBar = (<SelectBar />);
    component = (<ForYou userName={userName} watchList={watchList} config={config} setValue={setValue} setFolloweeData={setFolloweeData} />);
  } else if (currentOption === 2) {
    component = (<ForFollower setValue={setValue} userName={userName} followeeData={followeeData} followingList={followingList} config={config}/>);
  }

  return (
    <div className="personalProfile">
      {followerSearchBar}
      {selectBar}
      {component}
    </div>
  );
};
