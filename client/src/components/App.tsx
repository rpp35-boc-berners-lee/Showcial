import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Template } from './template/Template';
import { Homepage } from './homepage/Homepage';

export const App = () => {
   return (
      <>
         <Routes>
            <Route path='/' element={<Template />} />
            <Route path='/home' element={<Homepage />} />
         </Routes>
      </>
   );
};
