// Import React and necessary hooks
import React from 'react';

// Import BrowserRouter for routing between pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/HomePage';
import VehicleDetailPage from './pages/VehicleDetailPage';

// Import App CSS for styling
import './App.css';

/**
 * Main App Component
 * Purpose: Sets up routing for the application
 * Routes:
 *   - / : Home page with search and vehicle list
 *   - /vehicle/:vrm : Detail page for specific vehicle
 */
function App() {
  return (
    // Router component enables navigation between pages
    <Router>
      {/* Main container div for the entire application */}
      <div className="App">
        {/* Header section - appears on all pages */}
        <header className="app-header">
          <h1>🚗 Vehicle Search Application</h1>
          <p>Search and browse vehicles from our database</p>
        </header>

        {/* Routes component defines all application routes */}
        <Routes>
          {/* Route 1: Home page - displays search and vehicle list */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route 2: Vehicle detail page - displays full details of a single vehicle */}
          {/* :vrm is a URL parameter that will be passed to VehicleDetailPage */}
          <Route path="/vehicle/:vrm" element={<VehicleDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export App component to be used in index.js
export default App;