// Import React
import React from 'react';

// Import VehicleCard component
import VehicleCard from './VehicleCard';

// Import CSS for VehicleGrid styling
import './VehicleGrid.css';

/**
 * VehicleGrid Component
 * Purpose: Display a grid of vehicle cards
 * Props:
 *   - vehicles: array of vehicle objects to display
 *   - onVehicleClick: function to be called when a vehicle card is clicked
 */
function VehicleGrid({ vehicles, onVehicleClick }) {
  
  // Render the VehicleGrid component
  return (
    <div className="vehicle-grid-section">
      {/* Section heading with count of vehicles */}
      <h2 className="grid-heading">
        {vehicles.length} {vehicles.length === 1 ? 'Vehicle' : 'Vehicles'} Found
      </h2>

      {/* Grid container for vehicle cards */}
      <div className="vehicle-grid">
        {/* Map through vehicles array and render a VehicleCard for each */}
        {vehicles.map((vehicle) => (
          // VehicleCard component for each vehicle
          <VehicleCard
            key={vehicle.VRM}           // Unique key for React list rendering
            vehicle={vehicle}            // Pass vehicle object as prop
            onClick={onVehicleClick}     // Pass click handler as prop
          />
        ))}
      </div>
    </div>
  );
}

// Export VehicleGrid component for use in HomePage
export default VehicleGrid;