import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Template } from './template/Template';
import { Header } from './Header/Header';

export const App = () => {
   return (
      <div>
         <Header />
         <Routes>
            <Route path='/' element={<Template />} />
         </Routes>
      </div>
   );
};
