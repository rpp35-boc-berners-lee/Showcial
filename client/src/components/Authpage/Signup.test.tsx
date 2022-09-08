import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import Signup from './Signup';
import {BrowserRouter as Router} from 'react-router-dom';


test('Signup component correctly renders', async () => {
   await render(
      <Router>
         <Signup/>
      </Router>
   );
});