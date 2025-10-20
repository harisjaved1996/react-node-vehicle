// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Import routing hooks to access URL parameters and navigate
import { useParams, useNavigate } from 'react-router-dom';

// Import CSS for VehicleDetailPage styling
import './VehicleDetailPage.css';

/**
 * VehicleDetailPage Component
 * Purpose: Display full details of a single vehicle
 * Features:
 *   - Fetches vehicle data based on VRM from URL parameter
 *   - Displays all vehicle attributes
 *   - Provides back button to return to home page
 */
function VehicleDetailPage() {
  // useParams hook: extracts URL parameters (vrm in this case)
  // Example: if URL is /vehicle/AB12CDE, then vrm = "AB12CDE"
  const { vrm } = useParams();
  
  // useNavigate hook: allows programmatic navigation
  const navigate = useNavigate();

  // State: stores the vehicle object fetched from API
  const [vehicle, setVehicle] = useState(null);
  
  // State: tracks loading state
  const [loading, setLoading] = useState(true);
  
  // State: stores error message if fetch fails
  const [error, setError] = useState('');

  /**
   * useEffect Hook
   * Purpose: Fetch vehicle details when component mounts or VRM changes
   * Dependencies: [vrm] - runs when vrm parameter changes
   */
  useEffect(() => {
    /**
     * fetchVehicleDetails Function
     * Purpose: Make API request to get vehicle details by VRM
     */
    const fetchVehicleDetails = async () => {
      try {
        // Set loading state to true
        setLoading(true);
        
        // Make HTTP GET request to backend API with VRM parameter
        const response = await fetch(`http://localhost:5000/api/vehicles/vrm/${vrm}`);
        
        // Parse JSON response
        const data = await response.json();

        // Check if request was successful
        if (data.success) {
          // Update vehicle state with fetched data
          setVehicle(data.data);
        } else {
          // Set error message if vehicle not found
          setError(data.message || 'Vehicle not found');
        }
      } catch (err) {
        // Handle network errors or other exceptions
        console.error('Error fetching vehicle details:', err);
        setError('Failed to fetch vehicle details. Please ensure the backend server is running.');
      } finally {
        // Set loading to false when request completes
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchVehicleDetails();
  }, [vrm]); // Dependency array: re-run effect if vrm changes

  /**
   * handleBackClick Function
   * Purpose: Navigate back to home page
   */
  const handleBackClick = () => {
    navigate('/'); // Navigate to root route (HomePage)
  };

  /**
   * formatPrice Function
   * Purpose: Format price number as currency string
   * Parameter: price - numeric price value
   * Returns: formatted string like "£12,995"
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0, // No decimal places for whole numbers
    }).format(price);
  };

  /**
   * formatDate Function
   * Purpose: Format date string to readable format
   * Parameter: dateString - date in format "YYYY-MM-DD"
   * Returns: formatted string like "14 Mar 2018"
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  /**
   * formatMileage Function
   * Purpose: Format mileage with thousands separator
   * Parameter: mileage - numeric mileage value
   * Returns: formatted string like "45,200 miles"
   */
  const formatMileage = (mileage) => {
    return `${mileage.toLocaleString()} miles`;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="vehicle-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="vehicle-detail-page">
        <div className="error-container">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={handleBackClick} className="back-btn">
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  // Render vehicle not found state
  if (!vehicle) {
    return (
      <div className="vehicle-detail-page">
        <div className="error-container">
          <h2>Vehicle Not Found</h2>
          <p>No vehicle found with VRM: {vrm}</p>
          <button onClick={handleBackClick} className="back-btn">
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  // Render vehicle details
  return (
    <div className="vehicle-detail-page">
      <div className="detail-container">
        
        {/* Back button */}
        <button onClick={handleBackClick} className="back-btn">
          ← Back to Search
        </button>

        {/* Vehicle header with VRM */}
        <div className="vehicle-header">
          <h1>{vehicle.VRM}</h1>
          <p className="vehicle-title">
            {vehicle.Make} {vehicle.Model} {vehicle.Variant}
          </p>
        </div>

        {/* Main vehicle information card */}
        <div className="vehicle-info-card">
          
          {/* Price section - prominently displayed */}
          <div className="price-section">
            <span className="price-label">Price:</span>
            <span className="price-value">{formatPrice(vehicle.Price)}</span>
          </div>

          {/* Vehicle details grid */}
          <div className="details-grid">
            
            {/* Make */}
            <div className="detail-item">
              <span className="detail-label">Make:</span>
              <span className="detail-value">{vehicle.Make}</span>
            </div>

            {/* Model */}
            <div className="detail-item">
              <span className="detail-label">Model:</span>
              <span className="detail-value">{vehicle.Model}</span>
            </div>

            {/* Variant */}
            <div className="detail-item">
              <span className="detail-label">Variant:</span>
              <span className="detail-value">{vehicle.Variant}</span>
            </div>

            {/* Colour */}
            <div className="detail-item">
              <span className="detail-label">Colour:</span>
              <span className="detail-value">{vehicle.Colour}</span>
            </div>

            {/* Body Type */}
            <div className="detail-item">
              <span className="detail-label">Body Type:</span>
              <span className="detail-value">{vehicle.BodyType}</span>
            </div>

            {/* Mileage */}
            <div className="detail-item">
              <span className="detail-label">Mileage:</span>
              <span className="detail-value">{formatMileage(vehicle.Mileage)}</span>
            </div>

            {/* Date of Registration */}
            <div className="detail-item">
              <span className="detail-label">Registration Date:</span>
              <span className="detail-value">{formatDate(vehicle.DateOfRegistration)}</span>
            </div>

            {/* VRM (repeated for completeness) */}
            <div className="detail-item">
              <span className="detail-label">VRM:</span>
              <span className="detail-value">{vehicle.VRM}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Export VehicleDetailPage component for use in App.js
export default VehicleDetailPage;