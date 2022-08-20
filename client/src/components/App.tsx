import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Template } from './template/Template';
import NavBar from './navbar/NavBar';
import LandingPage from './landing-page';

export const App = () => {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path='/' element={<LandingPage />} />
         </Routes>
      </>
   );
};
