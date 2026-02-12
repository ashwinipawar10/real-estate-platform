# Real Estate Platform - MERN Stack

A full-stack real estate web platform with dynamic property listings, advanced search filters, JWT authentication, Cloudinary image uploads, and Google Maps integration.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access (User, Agent, Admin)
- **Property Management**: Create, read, update, and delete property listings
- **Advanced Search & Filters**: Filter by price, location, property type, bedrooms, bathrooms, and more
- **Image Upload**: Cloudinary integration for optimized image storage and delivery
- **Geolocation**: Google Maps API integration for precise property location display
- **Responsive Design**: Mobile-first, fully responsive UI
- **Real-time Search**: Dynamic property search with multiple filter combinations
- **Location-based Search**: Find properties within a specific radius using coordinates

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload handling

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icons
- **Google Maps React** - Map integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Cloudinary account
- Google Maps API key

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd real-estate-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/real-estate
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Get Cloudinary Credentials:**
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

**Start Backend Server:**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Get Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "Maps JavaScript API" and "Places API"
4. Create credentials (API Key)
5. Copy the API key

**Start Frontend Server:**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
real-estate-platform/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary configuration
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── propertyController.js # Property CRUD operations
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Property.js         # Property schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── propertyRoutes.js   # Property endpoints
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Auth.css
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Navbar.css
│   │   │   ├── pages/
│   │   │   │   ├── Home.js
│   │   │   │   └── Home.css
│   │   │   ├── properties/
│   │   │   │   ├── PropertyList.js
│   │   │   │   ├── PropertyCard.js
│   │   │   │   ├── PropertyDetail.js
│   │   │   │   ├── AddProperty.js
│   │   │   │   ├── SearchFilters.js
│   │   │   │   └── [CSS files]
│   │   │   └── routing/
│   │   │       └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js   # Global auth state
│   │   ├── utils/
│   │   │   └── api.js           # Axios configuration
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/updateprofile` - Update user profile (protected)

### Properties
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (protected)
- `PUT /api/properties/:id` - Update property (protected)
- `DELETE /api/properties/:id` - Delete property (protected)
- `GET /api/properties/user/myproperties` - Get user's properties (protected)

### Query Parameters for Property Search
- `keyword` - Search in title and description
- `propertyType` - house, apartment, condo, townhouse, land, commercial
- `listingType` - sale, rent
- `minPrice`, `maxPrice` - Price range
- `bedrooms`, `bathrooms` - Minimum count
- `minArea`, `maxArea` - Area range (sqft)
- `city`, `state` - Location filters
- `latitude`, `longitude`, `radius` - Geolocation search
- `featured` - true/false
- `sort` - Sort field (e.g., 'price', '-createdAt')
- `page`, `limit` - Pagination

## 🎯 Usage Examples

### Register a User
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "agent"
}
```

### Add a Property
```javascript
POST /api/properties
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Beautiful 3BR House",
  "description": "Spacious family home...",
  "price": 450000,
  "propertyType": "house",
  "listingType": "sale",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 2000,
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "images": [file1, file2, ...],
  "amenities": ["Pool", "Gym", "Garden"]
}
```

### Search Properties
```javascript
GET /api/properties?propertyType=house&minPrice=300000&maxPrice=500000&bedrooms=3&city=New York
```

## 🌟 Key Features Explained

### 1. JWT Authentication
- Secure token-based authentication
- Tokens stored in localStorage
- Automatic token refresh on requests
- Role-based access control

### 2. Advanced Search Filters
- Multiple filter combinations
- Price range filtering
- Location-based search
- Property type and listing type filters
- Bedroom/bathroom count filters
- Area (square footage) filters
- Text search in title and description

### 3. Cloudinary Integration
- Automatic image optimization
- Multiple image uploads (up to 10 per property)
- Image transformation and compression
- Secure cloud storage
- Automatic deletion on property removal

### 4. Google Maps Integration
- Interactive map display
- Precise location markers
- Geolocation-based property search
- Find properties within radius
- Address geocoding

### 5. Geospatial Queries
The Property model uses MongoDB's 2dsphere index for location-based queries:
- Find properties near a point
- Radius-based search
- Distance calculation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token expiration
- Protected routes requiring authentication
- Input validation
- CORS configuration
- Role-based authorization
- Secure file upload validation

## 📱 Responsive Design

The platform is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Update CORS settings
3. Connect to MongoDB Atlas
4. Deploy code

### Frontend Deployment (Vercel/Netlify)
1. Build the app: `npm run build`
2. Set environment variables
3. Deploy build folder
4. Update API URL in .env

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall settings for MongoDB Atlas
- Verify IP whitelist in Atlas

### Cloudinary Upload Errors
- Verify API credentials
- Check file size limits (5MB default)
- Ensure proper file format (images only)

### Google Maps Not Loading
- Verify API key is correct
- Enable required APIs in Google Cloud Console
- Check browser console for errors

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email support@realestate.com or create an issue in the repository.

---

Built with ❤️ using MERN Stack
