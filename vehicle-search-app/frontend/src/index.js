// Import React library - core functionality for building components
import React from 'react';

// Import ReactDOM - provides DOM-specific methods for rendering React components
import ReactDOM from 'react-dom/client';

// Import main CSS file for global styles
import './index.css';

// Import the main App component
import App from './App';

// Get the root DOM element where React will render the application
// This corresponds to <div id="root"></div> in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application into the root element
// React.StrictMode is a development tool that highlights potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);