import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './homepage/Homepage';
import NavBar from './navbar/NavBar';
import AboutPage from './about-page';
import { PersonalProfile } from './personal-profile';
import Signin from './Authpage/Signin';
import Signup from './Authpage/Signup';
import { ProvideAuth } from '../hooks/useAuth';
export const App = () => {
   return (
      <>
      <ProvideAuth>
         <NavBar />
         <Routes>
            {/* <Route path='/' element={<Template />} /> */}
            <Route path='/' element={
               <Homepage />
               } />
            <Route path='/personal/' element={<PersonalProfile />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />

            {/* <Route
               path='/home'
               element={
                  // <ProvideAuth>
                     <Homepage />
                  // </ProvideAuth>
               }
            /> */}
            <Route path='/about' element={<AboutPage />} />
         </Routes>
         </ProvideAuth>
      </>
   );
};
