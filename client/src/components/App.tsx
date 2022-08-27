import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './homepage/Homepage';
import NavBar from './navbar/NavBar';
import LandingPage from './landing-page';
import { PersonalProfile } from './personal-profile';
import Signin from './Authpage/Signin';
import Signup from './Authpage/Signup';

export const App = () => {
   return (
      <>
         <NavBar />
         <Routes>
            {/* <Route path='/' element={<Template />} /> */}
            <Route path='/personal/' element={<PersonalProfile />} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/' element={<LandingPage />} />
         </Routes>
      </>
   );
};
