// Import React and useState hook
import React, { useState } from 'react';

// Import CSS for SearchBar styling
import './SearchBar.css';

/**
 * SearchBar Component
 * Purpose: Provides search input field and button to search vehicles
 * Props:
 *   - onSearch: function to be called when user submits search
 *   - loading: boolean indicating if search is in progress
 */
function SearchBar({ onSearch, loading }) {
  // State: stores the current value of search input
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * handleSubmit Function
   * Purpose: Handle form submission when user clicks search button or presses Enter
   * Parameter: e - event object from form submission
   */
  const handleSubmit = (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();
    
    // Call the onSearch function passed from parent component (HomePage)
    // Pass the current search term as parameter
    onSearch(searchTerm);
  };

  /**
   * handleInputChange Function
   * Purpose: Update searchTerm state when user types in input field
   * Parameter: e - event object from input change
   */
  const handleInputChange = (e) => {
    // Update searchTerm state with new input value
    setSearchTerm(e.target.value);
  };

  // Render the SearchBar component
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Container for search input and button */}
      <div className="search-input-container">
        
        {/* Text input field for search query */}
        <input
          type="text"
          className="search-input"
          placeholder="Enter VRM, Make, Model, Price, Mileage, or any vehicle detail..."
          value={searchTerm}           // Controlled input: value from state
          onChange={handleInputChange} // Update state on every keystroke
          disabled={loading}           // Disable input while loading
        />

        {/* Search button */}
        <button 
          type="submit" 
          className="search-button"
          disabled={loading} // Disable button while loading
        >
          {/* Show different text based on loading state */}
          {loading ? (
            <>
              {/* Show spinner icon when loading */}
              <span className="button-spinner"></span>
              Searching...
            </>
          ) : (
            <>
              {/* Show search icon when not loading */}
              🔍 Search
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// Export SearchBar component for use in HomePage
export default SearchBar;