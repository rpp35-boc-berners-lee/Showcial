import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './homepage/Homepage';
import NavBar from './navbar/NavBar';
import LandingPage from './landing-page';

export const App = () => {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Homepage />} />
         </Routes>
      </>
   );
};
