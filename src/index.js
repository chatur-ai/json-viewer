import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga'
import App from './App'

const TRACKING_ID = "G-ZHEQ9YL428"
ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
