import React, { useState } from 'react';
import { expect } from '../../../../jestGlobals';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from './index';
import userEvent from '@testing-library/user-event';
import 'regenerator-runtime/runtime';
import { Route, MemoryRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

describe('About Page Component ', () => {
   test('Should render all features', async () => {
      render(
         <MemoryRouter>
            <AboutPage />
         </MemoryRouter>
      );
      waitFor(() => {
         screen.debug();
         expect(screen.findByText('Features')).toBeInTheDocument();
         expect(screen.findAllByTestId('feature-card')).toHaveLength(4);
      });
   });
});
