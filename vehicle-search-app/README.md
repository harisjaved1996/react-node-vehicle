# 🚗 Vehicle Search Application

A full-stack web application built with **React** (frontend) and **Node.js/Express** (backend) that allows users to search and browse vehicles from a REST API.

## 📋 Project Overview

This application demonstrates:
- **Clean, maintainable code** with comprehensive comments
- **RESTful API** design with Node.js and Express
- **React** frontend with component-based architecture
- **React Router** for navigation between pages
- **Responsive design** that works on desktop, tablet, and mobile
- **Search functionality** with multiple search criteria

## 🏗️ Project Structure

```
vehicle-search-app/
├── backend/
│   ├── server.js          # Express server with REST API endpoints
│   ├── data.json          # Vehicle database (JSON file)
│   └── package.json       # Backend dependencies
│
└── frontend/
    ├── public/
    │   └── index.html     # HTML template
    ├── src/
    │   ├── components/    # Reusable React components
    │   │   ├── SearchBar.js
    │   │   ├── SearchBar.css
    │   │   ├── VehicleGrid.js
    │   │   ├── VehicleGrid.css
    │   │   ├── VehicleCard.js
    │   │   └── VehicleCard.css
    │   ├── pages/         # Page components
    │   │   ├── HomePage.js
    │   │   ├── HomePage.css
    │   │   ├── VehicleDetailPage.js
    │   │   └── VehicleDetailPage.css
    │   ├── App.js         # Main App component with routing
    │   ├── App.css        # App styles
    │   ├── index.js       # React entry point
    │   └── index.css      # Global styles
    └── package.json       # Frontend dependencies
```

## 🚀 Features

### Backend (Node.js/Express)
- **REST API** with three endpoints:
  - `GET /api/vehicles` - Get all vehicles
  - `GET /api/vehicles/vrm/:vrm` - Get vehicle by VRM
  - `POST /api/vehicles/search` - Search vehicles by any attribute
- **JSON data storage** in `data.json`
- **CORS enabled** for cross-origin requests
- **Comprehensive error handling**
- **Well-documented code** with detailed comments

### Frontend (React)
- **Search functionality** - Search by VRM, Make, Model, Price, Mileage, Color, etc.
- **Vehicle grid display** - Shows vehicles in a responsive card layout
- **Vehicle detail page** - Click any vehicle to see full details
- **Responsive design** - Works on all screen sizes
- **Loading states** - Visual feedback during API calls
- **Error handling** - User-friendly error messages
- **React Router** - Client-side routing
- **Clean UI** - Modern, professional design

## 📦 Installation & Setup

### Prerequisites
- Node.js v22.14.0 (as specified)
- npm 10.9.2 (as specified)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install express cors
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

## ▶️ Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm start
```

The backend server will start on **http://localhost:5000**

### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm start
```

The React app will start on **http://localhost:3000** and automatically open in your browser.

## 🔌 API Endpoints

### 1. Get All Vehicles
```
GET http://localhost:5000/api/vehicles
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### 2. Get Vehicle by VRM
```
GET http://localhost:5000/api/vehicles/vrm/AB12CDE
```

**Response:**
```json
{
  "success": true,
  "data": {
    "VRM": "AB12CDE",
    "Make": "Volkswagen",
    "Model": "Golf",
    ...
  }
}
```

### 3. Search Vehicles
```
POST http://localhost:5000/api/vehicles/search
Content-Type: application/json

{
  "query": "BMW"
}
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

## 🎯 Usage

1. **View All Vehicles**: Click "View All Vehicles" button on the home page
2. **Search Vehicles**: 
   - Enter any search term (VRM, Make, Model, Price, Mileage, Color, etc.)
   - Click "Search" button or press Enter
   - Matching vehicles will be displayed
3. **View Details**: Click on any vehicle card to see full details
4. **Go Back**: Click "← Back to Search" to return to the home page

## 🔍 Search Examples

- Search by VRM: `AB12CDE`
- Search by Make: `BMW`
- Search by Model: `Golf`
- Search by Price: `12995`
- Search by Color: `Blue`
- Search by Body Type: `Hatchback`
- Search by Mileage: `45200`

## 📱 Responsive Design

The application is fully responsive and works on:
- 🖥️ Desktop (1400px+)
- 💻 Laptop (1024px - 1399px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (320px - 767px)

## 💻 Code Quality

### Every line of code includes:
- ✅ Detailed comments explaining functionality
- ✅ Clear variable and function names
- ✅ Proper error handling
- ✅ Consistent code formatting
- ✅ Component documentation

### Example comment style used throughout:
```javascript
/**
 * Function Name
 * Purpose: What this function does
 * Parameter: Description of parameters
 * Returns: What it returns
 */
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **React Scripts** - Build tools

## 📝 Interview Focus Points

This project demonstrates:

1. **Code Structure & Organization**
   - Separation of concerns (frontend/backend)
   - Component-based architecture
   - Modular code design

2. **REST API Design**
   - Proper HTTP methods (GET, POST)
   - RESTful endpoint naming
   - JSON response format

3. **React Best Practices**
   - Functional components with hooks
   - Props and state management
   - Component composition
   - React Router for navigation

4. **Data Handling**
   - Fetching data from API
   - Loading states
   - Error handling
   - Search functionality

5. **UI/UX**
   - Responsive design
   - User feedback (loading, errors)
   - Intuitive navigation
   - Clean, professional interface

## 🎓 Learning Points

- **Backend**: How to create REST APIs with Express
- **Frontend**: React component architecture and state management
- **Routing**: Client-side routing with React Router
- **HTTP**: Making API requests with fetch
- **Responsive**: CSS Grid and Flexbox for layouts
- **Comments**: Writing clear, maintainable code

## 🐛 Troubleshooting

### Backend server not starting?
- Ensure port 5000 is not in use
- Check that `data.json` exists in backend folder
- Verify Node.js version matches requirements

### Frontend not loading vehicles?
- Ensure backend server is running on port 5000
- Check browser console for CORS errors
- Verify API endpoints are correct

### Search not working?
- Backend must be running
- Check network tab in browser DevTools
- Verify data.json contains vehicle data

## 📄 License

This project is for interview/educational purposes.

## 👤 Author

Created as an interview task demonstrating full-stack development skills.

---

**Time to Complete**: Approximately 1 hour
**Difficulty**: Intermediate
**Focus**: Code structure, REST API, React fundamentals