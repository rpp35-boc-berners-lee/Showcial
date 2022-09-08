import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import Signin from './Signin';
import { BrowserRouter as Router } from 'react-router-dom';


test('Signin component correctly renders', async () => {
   await render(
      <Router>
         <Signin />
      </Router>
   );
});