import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   <BrowserRouter>
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <App />
      </ThemeProvider>
   </BrowserRouter>
);
