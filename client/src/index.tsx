import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
