// Import React
import React from 'react';

// Import CSS for VehicleCard styling
import './VehicleCard.css';

/**
 * VehicleCard Component
 * Purpose: Display individual vehicle information in a card format
 * Props:
 *   - vehicle: object containing vehicle data
 *   - onClick: function to be called when card is clicked
 */
function VehicleCard({ vehicle, onClick }) {
  
  /**
   * handleClick Function
   * Purpose: Handle card click event and pass VRM to parent component
   */
  const handleClick = () => {
    // Call onClick function passed from parent with vehicle VRM
    onClick(vehicle.VRM);
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
      minimumFractionDigits: 0, // No decimal places
    }).format(price);
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

  // Render the VehicleCard component
  return (
    <div className="vehicle-card" onClick={handleClick}>
      
      {/* Card header with VRM badge */}
      <div className="card-header">
        <span className="vrm-badge">{vehicle.VRM}</span>
      </div>

      {/* Vehicle title section */}
      <div className="card-title">
        <h3>{vehicle.Make} {vehicle.Model}</h3>
        <p className="variant">{vehicle.Variant}</p>
      </div>

      {/* Vehicle details section */}
      <div className="card-details">
        
        {/* Price - most prominent detail */}
        <div className="detail-row price-row">
          <span className="detail-label">Price:</span>
          <span className="detail-value price">{formatPrice(vehicle.Price)}</span>
        </div>

        {/* Mileage */}
        <div className="detail-row">
          <span className="detail-label">Mileage:</span>
          <span className="detail-value">{formatMileage(vehicle.Mileage)}</span>
        </div>

        {/* Colour */}
        <div className="detail-row">
          <span className="detail-label">Colour:</span>
          <span className="detail-value">{vehicle.Colour}</span>
        </div>

        {/* Body Type */}
        <div className="detail-row">
          <span className="detail-label">Body Type:</span>
          <span className="detail-value">{vehicle.BodyType}</span>
        </div>

      </div>

      {/* Card footer with call-to-action */}
      <div className="card-footer">
        <span className="view-details-text">Click to view full details →</span>
      </div>

    </div>
  );
}

// Export VehicleCard component for use in VehicleGrid
export default VehicleCard;