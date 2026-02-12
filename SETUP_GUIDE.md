# Real Estate Platform - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Getting API Keys](#getting-api-keys)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Testing the Application](#testing-the-application)
6. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org
   - Verify installation: `node --version`

2. **MongoDB**
   - **Option A - Local MongoDB:**
     - Download from: https://www.mongodb.com/try/download/community
     - Install and start MongoDB service
   - **Option B - MongoDB Atlas (Recommended):**
     - Create free account at: https://www.mongodb.com/cloud/atlas
     - Create a cluster (free tier available)

3. **Git** (optional but recommended)
   - Download from: https://git-scm.com

---

## Getting API Keys

### 1. Cloudinary Setup (Image Storage)

**Step 1:** Create Account
- Go to https://cloudinary.com
- Click "Sign Up Free"
- Complete registration

**Step 2:** Get Credentials
- After login, go to Dashboard
- You'll see:
  - Cloud Name
  - API Key
  - API Secret
- **Save these credentials** - you'll need them later

### 2. Google Maps API Key (Maps & Geolocation)

**Step 1:** Create Google Cloud Project
- Go to https://console.cloud.google.com
- Click "Select a Project" → "New Project"
- Name your project (e.g., "Real Estate Platform")
- Click "Create"

**Step 2:** Enable Required APIs
- In the left menu, go to "APIs & Services" → "Library"
- Search for and enable:
  - **Maps JavaScript API**
  - **Places API**
  - **Geocoding API**

**Step 3:** Create API Key
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "API Key"
- **Copy the API key** and save it
- (Optional) Click "Restrict Key" to add security restrictions

---

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- multer
- cloudinary
- express-validator

### Step 3: Create Environment File

Create a file named `.env` in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection String
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/real-estate

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/real-estate?retryWrites=true&w=majority

# JWT Secret (generate a random secure string)
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random
JWT_EXPIRE=30d

# Cloudinary Credentials (from Cloudinary Dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Important Notes:**
- Replace `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual Cloudinary credentials
- If using MongoDB Atlas, replace the MONGODB_URI with your connection string
- Change JWT_SECRET to a long random string

### Step 4: MongoDB Atlas Setup (if using Atlas)

1. **Get Connection String:**
   - In MongoDB Atlas, click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `real-estate`

2. **Whitelist IP:**
   - In Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development

### Step 5: Start the Backend Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: <your-mongodb-host>
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd ../frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-toastify
- react-icons
- @react-google-maps/api

### Step 3: Create Environment File

Create a file named `.env` in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Important:**
- Replace `your_google_maps_api_key_here` with your actual Google Maps API key

### Step 4: Start the Frontend Server

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, navigate to: http://localhost:3000

---

## Testing the Application

### 1. Register a New User

1. Click "Register" in the navigation
2. Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: +1234567890
   - Password: password123
   - Role: Select "Agent/Owner" (to be able to add properties)
3. Click "Register"

### 2. Login

1. Click "Login"
2. Enter credentials:
   - Email: john@example.com
   - Password: password123
3. Click "Login"

### 3. Add a Property

1. Click "Add Property" in the navigation
2. Fill in the form:
   - **Basic Information:**
     - Title: Beautiful Family Home
     - Description: Spacious 3-bedroom house with modern amenities
     - Price: 450000
     - Property Type: House
     - Listing Type: For Sale
   
   - **Property Details:**
     - Bedrooms: 3
     - Bathrooms: 2
     - Area: 2000
     - Year Built: 2015
     - Parking: 2
     - Amenities: Pool, Garden, Garage (comma-separated)
   
   - **Location:**
     - Address: 123 Main Street
     - City: San Francisco
     - State: CA
     - Zip Code: 94102
     - Latitude: 37.7749
     - Longitude: -122.4194
   
   - **Images:**
     - Upload 1-10 images of the property

3. Click "Add Property"

**Note:** To find latitude and longitude:
- Go to Google Maps
- Right-click on the location
- Click on the coordinates to copy them

### 4. Browse Properties

1. Click "Browse Properties"
2. Use search filters:
   - Search by keyword
   - Filter by property type, listing type
   - Set price range
   - Filter by bedrooms, bathrooms
   - Search by city or state
3. Click on a property card to view details

### 5. View Property Details

- See all property information
- View image gallery
- See location on Google Maps
- Contact property owner
- Edit/Delete (if you own the property)

---

## Common Issues

### Issue 1: MongoDB Connection Failed

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
- **Local MongoDB:** Ensure MongoDB service is running
  - Windows: Check Services, start MongoDB
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`
- **MongoDB Atlas:** 
  - Verify connection string is correct
  - Check IP whitelist (add 0.0.0.0/0 for testing)
  - Ensure database user has proper permissions

### Issue 2: Cloudinary Upload Failed

**Error:** `Invalid signature` or `Upload failed`

**Solutions:**
- Verify Cloudinary credentials in `.env`
- Check that Cloud Name, API Key, and API Secret are correct
- Ensure no extra spaces in `.env` file
- Make sure image file size is under 5MB

### Issue 3: Google Maps Not Loading

**Error:** Map shows gray area or error message

**Solutions:**
- Verify Google Maps API key is correct
- Ensure Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for specific error messages
- Verify API key has no usage restrictions preventing localhost

### Issue 4: CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**
- Ensure backend is running on port 5000
- Verify `FRONTEND_URL` in backend `.env` is set to `http://localhost:3000`
- Check that CORS is properly configured in `server.js`

### Issue 5: JWT Token Invalid

**Error:** `Not authorized to access this route`

**Solutions:**
- Clear browser localStorage and login again
- Verify JWT_SECRET is set in backend `.env`
- Check token expiration settings

### Issue 6: Port Already in Use

**Error:** `Port 5000 is already in use` or `Port 3000 is already in use`

**Solutions:**
- **Kill the process using the port:**
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:5000 | xargs kill -9`
- **Or change the port:**
  - Backend: Change `PORT` in `.env`
  - Frontend: Add `PORT=3001` to frontend `.env`

---

## Environment Variables Checklist

### Backend (.env)
- [ ] PORT set to 5000
- [ ] MONGODB_URI configured correctly
- [ ] JWT_SECRET set to a secure random string
- [ ] JWT_EXPIRE set (e.g., 30d)
- [ ] CLOUDINARY_CLOUD_NAME from Cloudinary dashboard
- [ ] CLOUDINARY_API_KEY from Cloudinary dashboard
- [ ] CLOUDINARY_API_SECRET from Cloudinary dashboard
- [ ] FRONTEND_URL set to http://localhost:3000

### Frontend (.env)
- [ ] REACT_APP_API_URL set to http://localhost:5000/api
- [ ] REACT_APP_GOOGLE_MAPS_API_KEY from Google Cloud Console

---

## Verification Steps

After setup, verify everything is working:

1. **Backend Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should see: `{"success": true, "message": "Server is running"}`

2. **Frontend Loading:**
   - Visit: http://localhost:3000
   - Should see the home page with hero section

3. **Registration Working:**
   - Register a new user
   - Should redirect to home page after successful registration

4. **Authentication Working:**
   - Login with registered credentials
   - Should see user name in navigation

5. **Property Creation Working:**
   - Add a new property with images
   - Should see success message and redirect to properties page

6. **Search Working:**
   - Use search filters
   - Should see filtered results

7. **Maps Working:**
   - View a property detail page
   - Should see Google Map with marker

---

## Next Steps

Once everything is working:

1. **Customize the platform:**
   - Update styling and branding
   - Add more features
   - Customize property fields

2. **Deploy to production:**
   - Deploy backend to Heroku, Railway, or Render
   - Deploy frontend to Vercel or Netlify
   - Update environment variables

3. **Add more features:**
   - User favorites/wishlist
   - Property comparison
   - Email notifications
   - Advanced analytics
   - Payment integration

---

## Support

If you encounter any issues not covered here:

1. Check the browser console for error messages
2. Check the backend terminal for server errors
3. Verify all environment variables are set correctly
4. Ensure all services (MongoDB, backend, frontend) are running

---

Happy coding! 🚀
