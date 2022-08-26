import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './homepage/Homepage';
import NavBar from './navbar/NavBar';
import LandingPage from './landing-page';
import { PersonalProfile } from './personal-profile';

export const App = () => {
   return (
      <>
         <NavBar />
         <Routes>
            {/* <Route path='/' element={<Template />} /> */}
            <Route path='/home' element={<Homepage />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='/personal/*' element={<PersonalProfile />} />
         </Routes>
      </>
   );
};
