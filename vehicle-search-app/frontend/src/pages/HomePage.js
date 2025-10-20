// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Import useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom';

// Import custom components
import SearchBar from '../components/SearchBar';
import VehicleGrid from '../components/VehicleGrid';

// Import CSS for HomePage styling
import './HomePage.css';

/**
 * HomePage Component
 * Purpose: Main page that displays search functionality and vehicle results
 * Features:
 *   - Search input to query vehicles
 *   - Display vehicles in a grid/card layout
 *   - Click on vehicle to navigate to detail page
 */
function HomePage() {
  // State: stores the array of vehicles returned from API
  const [vehicles, setVehicles] = useState([]);
  
  // State: tracks whether we're currently loading data from API
  const [loading, setLoading] = useState(false);
  
  // State: stores error message if API request fails
  const [error, setError] = useState('');
  
  // State: stores the message when no vehicles are found
  const [noResultsMessage, setNoResultsMessage] = useState('');
  
  // Hook: useNavigate allows us to programmatically navigate to different routes
  const navigate = useNavigate();

  /**
   * handleSearch Function
   * Purpose: Called when user submits a search query
   * Parameter: searchQuery - the text entered by user in search box
   * Process:
   *   1. Validate search query is not empty
   *   2. Make POST request to backend API
   *   3. Update vehicles state with results
   *   4. Handle errors and no-results scenarios
   */
  const handleSearch = async (searchQuery) => {
    // Validate: Check if search query is empty or only whitespace
    if (!searchQuery || searchQuery.trim() === '') {
      setError('Please enter a search term');
      setVehicles([]);
      setNoResultsMessage('');
      return;
    }

    // Reset states before new search
    setLoading(true); // Show loading indicator
    setError(''); // Clear any previous errors
    setNoResultsMessage(''); // Clear no-results message
    setVehicles([]); // Clear previous results

    try {
      // Make HTTP POST request to backend API search endpoint
      // API_URL should be http://localhost:5000 (backend server)
      const response = await fetch('http://localhost:5000/api/vehicles/search', {
        method: 'POST', // Use POST method to send search query in body
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        body: JSON.stringify({ query: searchQuery }), // Convert search query to JSON
      });

      // Parse JSON response from server
      const data = await response.json();

      // Check if request was successful
      if (data.success) {
        // Update vehicles state with search results
        setVehicles(data.data);
        
        // If no vehicles found, show appropriate message
        if (data.data.length === 0) {
          setNoResultsMessage(`No vehicles found matching: "${searchQuery}"`);
        }
      } else {
        // API returned success: false
        setNoResultsMessage(data.message || 'No vehicles found');
      }
    } catch (err) {
      // Handle network errors or other exceptions
      console.error('Error searching vehicles:', err);
      setError('Failed to search vehicles. Please ensure the backend server is running on port 5000.');
    } finally {
      // Always set loading to false when request completes (success or failure)
      setLoading(false);
    }
  };

  /**
   * handleViewAllVehicles Function
   * Purpose: Fetch and display all vehicles in the database
   * Called when user clicks "View All Vehicles" button
   */
  const handleViewAllVehicles = async () => {
    // Reset states
    setLoading(true);
    setError('');
    setNoResultsMessage('');

    try {
      // Make HTTP GET request to fetch all vehicles
      const response = await fetch('http://localhost:5000/api/vehicles');
      
      // Parse JSON response
      const data = await response.json();

      // Check if request was successful
      if (data.success) {
        setVehicles(data.data); // Update vehicles state
      } else {
        setError('Failed to fetch vehicles');
      }
    } catch (err) {
      // Handle errors
      console.error('Error fetching all vehicles:', err);
      setError('Failed to fetch vehicles. Please ensure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleVehicleClick Function
   * Purpose: Navigate to vehicle detail page when user clicks on a vehicle card
   * Parameter: vrm - Vehicle Registration Mark (unique identifier)
   */
  const handleVehicleClick = (vrm) => {
    // Navigate to detail page with VRM as URL parameter
    navigate(`/vehicle/${vrm}`);
  };

  // Render the HomePage component
  return (
    <div className="home-page">
      {/* Container for page content */}
      <div className="home-container">
        
        {/* Search section */}
        <div className="search-section">
          <h2>Search Vehicles</h2>
          <p className="search-description">
            Search by VRM, Make, Model, Price, Mileage, Color, or any vehicle attribute
          </p>
          
          {/* SearchBar component - handles search input and button */}
          <SearchBar 
            onSearch={handleSearch}  // Pass handleSearch function as prop
            loading={loading}        // Pass loading state to show/hide spinner
          />
          
          {/* Button to view all vehicles */}
          <button 
            className="view-all-btn" 
            onClick={handleViewAllVehicles}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : 'View All Vehicles'}
          </button>
        </div>

        {/* Error message display */}
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {/* No results message display */}
        {noResultsMessage && !loading && (
          <div className="no-results-message">
            <p>ℹ️ {noResultsMessage}</p>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Searching vehicles...</p>
          </div>
        )}

        {/* VehicleGrid component - displays vehicles in grid layout */}
        {!loading && vehicles.length > 0 && (
          <VehicleGrid 
            vehicles={vehicles}           // Pass vehicles array as prop
            onVehicleClick={handleVehicleClick}  // Pass click handler as prop
          />
        )}
      </div>
    </div>
  );
}

// Export HomePage component for use in App.js
export default HomePage;