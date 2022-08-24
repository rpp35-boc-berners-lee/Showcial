import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Template } from './template/Template';
import { Homepage } from './homepage/Homepage';
import NavBar from './navbar/NavBar';
import LandingPage from './landing-page';
import Signin from './Authpage/Signin';

export const App = () => {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path='/signin' element={<Signin/>} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/' element={<LandingPage />} />
         </Routes>
      </>
   );
};
