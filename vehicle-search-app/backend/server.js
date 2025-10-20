// Import required modules for the Node.js server
const express = require('express'); // Express framework for creating REST API
const cors = require('cors'); // CORS middleware to allow cross-origin requests from React frontend
const fs = require('fs'); // File system module to read data.json file
const path = require('path'); // Path module to handle file paths

// Create an Express application instance
const app = express();

// Define the port number where the server will listen
const PORT = 5000;

// Middleware: Enable CORS to allow React frontend (running on different port) to access this API
app.use(cors());

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Helper function: Read vehicle data from data.json file
// Returns: Array of vehicle objects
const getVehiclesData = () => {
    try {
        // Read the data.json file synchronously
        const dataPath = path.join(__dirname, 'data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        
        // Parse JSON string to JavaScript object/array
        return JSON.parse(jsonData);
    } catch (error) {
        // Log error if file reading fails
        console.error('Error reading data.json:', error);
        return [];
    }
};

// API Endpoint 1: GET /api/vehicles
// Purpose: Return all vehicles in the database
// Response: JSON array of all vehicle objects
app.get('/api/vehicles', (req, res) => {
    try {
        // Get all vehicles from data.json
        const vehicles = getVehiclesData();
        
        // Send successful response with vehicles data
        res.status(200).json({
            success: true,
            count: vehicles.length,
            data: vehicles
        });
    } catch (error) {
        // Send error response if something goes wrong
        res.status(500).json({
            success: false,
            message: 'Error fetching vehicles',
            error: error.message
        });
    }
});

// API Endpoint 2: GET /api/vehicles/vrm/:vrm
// Purpose: Get a specific vehicle by its VRM (Vehicle Registration Mark)
// Parameter: :vrm - The vehicle registration mark to search for
// Response: JSON object with the matching vehicle
app.get('/api/vehicles/vrm/:vrm', (req, res) => {
    try {
        // Extract VRM parameter from URL and convert to uppercase for case-insensitive search
        const vrm = req.params.vrm.toUpperCase();
        
        // Get all vehicles from data.json
        const vehicles = getVehiclesData();
        
        // Find vehicle with matching VRM
        const vehicle = vehicles.find(v => v.VRM.toUpperCase() === vrm);
        
        // Check if vehicle was found
        if (vehicle) {
            // Send successful response with vehicle data
            res.status(200).json({
                success: true,
                data: vehicle
            });
        } else {
            // Send not found response if no vehicle matches
            res.status(404).json({
                success: false,
                message: `No vehicle found with VRM: ${vrm}`
            });
        }
    } catch (error) {
        // Send error response if something goes wrong
        res.status(500).json({
            success: false,
            message: 'Error fetching vehicle',
            error: error.message
        });
    }
});

// API Endpoint 3: POST /api/vehicles/search
// Purpose: Search vehicles based on multiple criteria (VRM, Make, Model, Price, Mileage, etc.)
// Request Body: JSON object with search parameters
// Response: JSON array of matching vehicles
app.post('/api/vehicles/search', (req, res) => {
    try {
        // Extract search query from request body
        const searchQuery = req.body.query;
        
        // Validate that query parameter is provided
        if (!searchQuery) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }
        
        // Get all vehicles from data.json
        const vehicles = getVehiclesData();
        
        // Convert search query to lowercase for case-insensitive search
        const query = searchQuery.toString().toLowerCase();
        
        // Filter vehicles based on search query
        // Check if query matches any of the vehicle properties
        const matchingVehicles = vehicles.filter(vehicle => {
            // Check VRM (Vehicle Registration Mark)
            if (vehicle.VRM.toLowerCase().includes(query)) return true;
            
            // Check Make (e.g., "Ford", "BMW")
            if (vehicle.Make.toLowerCase().includes(query)) return true;
            
            // Check Model (e.g., "Focus", "3 Series")
            if (vehicle.Model.toLowerCase().includes(query)) return true;
            
            // Check Variant (e.g., "1.5 TSI EVO")
            if (vehicle.Variant.toLowerCase().includes(query)) return true;
            
            // Check Colour
            if (vehicle.Colour.toLowerCase().includes(query)) return true;
            
            // Check BodyType (e.g., "Hatchback", "SUV")
            if (vehicle.BodyType.toLowerCase().includes(query)) return true;
            
            // Check if query is a number and matches Price
            if (!isNaN(query) && vehicle.Price === parseInt(query)) return true;
            
            // Check if query is a number and matches Mileage
            if (!isNaN(query) && vehicle.Mileage === parseInt(query)) return true;
            
            // Check Price range (e.g., user types "12995")
            if (!isNaN(query)) {
                const numQuery = parseInt(query);
                // Allow matching if price is within 1000 of the search value
                if (Math.abs(vehicle.Price - numQuery) <= 1000) return true;
            }
            
            // Check DateOfRegistration
            if (vehicle.DateOfRegistration.includes(query)) return true;
            
            // No match found
            return false;
        });
        
        // Check if any vehicles were found
        if (matchingVehicles.length > 0) {
            // Send successful response with matching vehicles
            res.status(200).json({
                success: true,
                count: matchingVehicles.length,
                data: matchingVehicles
            });
        } else {
            // Send not found response if no vehicles match
            res.status(404).json({
                success: false,
                message: `No vehicles found matching: "${searchQuery}"`,
                data: []
            });
        }
    } catch (error) {
        // Send error response if something goes wrong
        res.status(500).json({
            success: false,
            message: 'Error searching vehicles',
            error: error.message
        });
    }
});

// Root endpoint: GET /
// Purpose: Health check to verify server is running
app.get('/', (req, res) => {
    res.json({
        message: 'Vehicle Search API is running',
        endpoints: {
            getAllVehicles: 'GET /api/vehicles',
            getVehicleByVRM: 'GET /api/vehicles/vrm/:vrm',
            searchVehicles: 'POST /api/vehicles/search'
        }
    });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`🚗 Vehicle Search API Server is running on http://localhost:${PORT}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   - GET  http://localhost:${PORT}/api/vehicles`);
    console.log(`   - GET  http://localhost:${PORT}/api/vehicles/vrm/:vrm`);
    console.log(`   - POST http://localhost:${PORT}/api/vehicles/search`);
});