import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import Signup from './Signup';

test('Signup component correctly renders', async () => {
   await render(<Signup />);
});