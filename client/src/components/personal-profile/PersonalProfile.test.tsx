import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import { PersonalProfile } from './index.jsx';

test('Product overview renders image correctly with data from server', async () => {
   await render(<PersonalProfile />);
});
