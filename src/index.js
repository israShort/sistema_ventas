import './fonts/OpenSans-Bold.ttf';
import './fonts/OpenSans-Regular.ttf';
import './fonts/OpenSans-Light.ttf';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);

reportWebVitals();
