import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can style this or leave it empty
import AuthApp from './AuthApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthApp />
  </React.StrictMode>
);
