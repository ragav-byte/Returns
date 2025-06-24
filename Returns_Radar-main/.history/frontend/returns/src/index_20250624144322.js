// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard'; // or use AdminPanel instead
import './index.css'; // if you have any base styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);
