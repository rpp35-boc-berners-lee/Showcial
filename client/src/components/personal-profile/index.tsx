import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Route, Switch } from "react-router";
import './PersonalProfile.scss';
import { SelectBar } from './select-bar/SelectBar';
import { ForYou } from './for-you/ForYou';
import { FollowingList } from './following-list/FollowingList';

export const PersonalProfile = () => {
   return (
      <div>
        <SelectBar />
        <Routes>
          <Route path='/' element={ <ForYou /> } />
          <Route path='following' element={ <FollowingList /> } />
        </Routes>
      </div>
   );
};