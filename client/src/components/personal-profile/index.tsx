import React, { useState, useEffect } from 'react';
import './PersonalProfile.scss';
import { ForYou } from './for-you/ForYou';
import { FollowingList } from './following-list/FollowingList';
import { FollowerSearchBar } from './FollowerSearchBar/followerSearchBar';
import { ForFollower } from './for-follower/ForFollower';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import { ConfigAPI } from '../../../../types';
import { useAuth } from '../../hooks/useAuth';

export const PersonalProfile = () => {
  const [value, setValue] = React.useState(1);
  const [userName, setUserName] = useState<any>('JamesFranco');
  const [followeeData, setFolloweeData] = useState<any>(undefined);
  const [followingList, setFollowingList] = useState<any>([]);
  const [watchList, setWatchList] = useState<any>([]);
  const [config, setConfig] = useState<ConfigAPI | undefined>();
  const auth = useAuth();

   useEffect(() => {
      if (auth.user !== null) {
         setUserName(auth.user)
      }
   }, [auth.user !== ''])

   useEffect(() => {
      fetchUserData(auth.user);
      fetchAPI();
   }, [userName])

   const fetchAPI = async () => {
      let config = await axios.get<ConfigAPI>(
         `http://localhost:8080/tmdb/configuration`
      );
      setConfig(config.data);
   };


 async function fetchUserData (userName: any) {
    console.log('fetch userData', userName)
    await axios.get<any>('http://localhost:8080/videoDB/user', {params: {userName}})
      .then(async (results: any) => {
        console.log('fetchUserData', results.data)
        await setFollowingList(results.data.followingList);
        await setWatchList(results.data.watchedVideos)
      })
      .catch((error) => {
        console.log('fetchFollowingList() Failed', error);
      })
  }

  let currentOption = value;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    currentOption = newValue
  };

   const SelectBar = () => {
      return (
         <Tabs
            value={value}
            onChange={handleChange}
            aria-label='icon label tabs example'
            centered
         >
            <Tab icon={<GroupOutlinedIcon />} label='FOLLOWING' />
            <Tab icon={<AssistantPhotoOutlinedIcon />} label='FOR YOU' />
         </Tabs>
      );
   };


   return (
      <div className='personalProfile'>
         {currentOption === 0 ?
           <div>
              <FollowerSearchBar
                setValue={setValue}
                setFolloweeData={setFolloweeData}
              />
              <SelectBar />
              <FollowingList
                setValue={setValue}
                userName={userName}
                setFolloweeData={setFolloweeData}
                followingList={followingList}
              />
           </div>
           : null
         }
         {currentOption === 1 ?
           <div>
             <FollowerSearchBar
               setValue={setValue}
               setFolloweeData={setFolloweeData}
             />
             <SelectBar />
             <ForYou
               userName={userName}
               watchList={watchList}
               config={config}
               setValue={setValue}
               setFolloweeData={setFolloweeData}
             />
           </div>
           : null}
         {currentOption === 2 ?
           <div>
             <ForFollower
               setValue={setValue}
               userName={userName}
               followeeData={followeeData}
               followingList={followingList}
               config={config}
             />
           </div>
           : null
         }
      </div>
   );
};
