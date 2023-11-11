import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App';

// Create a root and render your app inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
