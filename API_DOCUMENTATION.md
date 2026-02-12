# Real Estate Platform - API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication Endpoints

### Register User
Register a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "user" // Options: "user", "agent", "admin"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "avatar": "https://res.cloudinary.com/..."
  }
}
```

---

### Login User
Login with existing credentials.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "avatar": "https://res.cloudinary.com/..."
  }
}
```

---

### Get Current User
Get logged-in user details.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "avatar": "https://res.cloudinary.com/...",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update Profile
Update user profile information.

**Endpoint:** `PUT /auth/updateprofile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567891"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "+1234567891",
    "role": "user",
    "avatar": "https://res.cloudinary.com/..."
  }
}
```

---

## Property Endpoints

### Get All Properties
Get properties with optional filters and pagination.

**Endpoint:** `GET /properties`

**Query Parameters:**
- `keyword` (string) - Search in title and description
- `propertyType` (string) - house, apartment, condo, townhouse, land, commercial
- `listingType` (string) - sale, rent
- `status` (string) - available, pending, sold, rented
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `bedrooms` (number) - Minimum bedrooms
- `bathrooms` (number) - Minimum bathrooms
- `minArea` (number) - Minimum area in sqft
- `maxArea` (number) - Maximum area in sqft
- `city` (string) - Filter by city
- `state` (string) - Filter by state
- `latitude` (number) - Center latitude for radius search
- `longitude` (number) - Center longitude for radius search
- `radius` (number) - Search radius in meters (default: 10000)
- `featured` (boolean) - Filter featured properties
- `sort` (string) - Sort field (e.g., 'price', '-createdAt')
- `page` (number) - Page number (default: 1)
- `limit` (number) - Results per page (default: 12)

**Example Request:**
```
GET /properties?propertyType=house&minPrice=300000&maxPrice=500000&bedrooms=3&city=San Francisco&page=1&limit=12
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 12,
  "total": 45,
  "totalPages": 4,
  "currentPage": 1,
  "properties": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Beautiful 3BR House",
      "description": "Spacious family home with modern amenities...",
      "price": 450000,
      "propertyType": "house",
      "listingType": "sale",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 2000,
      "location": {
        "address": "123 Main St",
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94102",
        "country": "USA",
        "coordinates": {
          "type": "Point",
          "coordinates": [-122.4194, 37.7749]
        }
      },
      "amenities": ["Pool", "Garden", "Garage"],
      "images": [
        {
          "url": "https://res.cloudinary.com/...",
          "public_id": "real-estate/properties/..."
        }
      ],
      "featured": true,
      "status": "available",
      "yearBuilt": 2015,
      "parking": 2,
      "views": 150,
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "avatar": "https://res.cloudinary.com/..."
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Get Single Property
Get detailed information about a specific property.

**Endpoint:** `GET /properties/:id`

**Response:** `200 OK`
```json
{
  "success": true,
  "property": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Beautiful 3BR House",
    "description": "Spacious family home with modern amenities...",
    "price": 450000,
    "propertyType": "house",
    "listingType": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 2000,
    "location": {
      "address": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94102",
      "country": "USA",
      "coordinates": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      }
    },
    "amenities": ["Pool", "Garden", "Garage"],
    "images": [
      {
        "url": "https://res.cloudinary.com/...",
        "public_id": "real-estate/properties/..."
      }
    ],
    "featured": true,
    "status": "available",
    "yearBuilt": 2015,
    "parking": 2,
    "views": 151,
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "avatar": "https://res.cloudinary.com/..."
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Create Property
Create a new property listing (requires authentication).

**Endpoint:** `POST /properties`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
title: Beautiful 3BR House
description: Spacious family home with modern amenities...
price: 450000
propertyType: house
listingType: sale
bedrooms: 3
bathrooms: 2
area: 2000
address: 123 Main St
city: San Francisco
state: CA
zipCode: 94102
latitude: 37.7749
longitude: -122.4194
yearBuilt: 2015
parking: 2
amenities[]: Pool
amenities[]: Garden
amenities[]: Garage
images: [file1, file2, file3, ...]
location[coordinates][type]: Point
location[coordinates][coordinates][0]: -122.4194
location[coordinates][coordinates][1]: 37.7749
```

**Response:** `201 Created`
```json
{
  "success": true,
  "property": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Beautiful 3BR House",
    "description": "Spacious family home with modern amenities...",
    "price": 450000,
    // ... full property object
  }
}
```

---

### Update Property
Update an existing property (requires authentication and ownership).

**Endpoint:** `PUT /properties/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:** (same as Create Property)

**Response:** `200 OK`
```json
{
  "success": true,
  "property": {
    // Updated property object
  }
}
```

---

### Delete Property
Delete a property listing (requires authentication and ownership).

**Endpoint:** `DELETE /properties/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### Get User Properties
Get all properties owned by the logged-in user.

**Endpoint:** `GET /properties/user/myproperties`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "properties": [
    {
      // Property objects owned by user
    }
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "User role user is not authorized to access this route"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Property not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Location-Based Search Example

Find properties within 5km of a location:

```
GET /properties?latitude=37.7749&longitude=-122.4194&radius=5000
```

This uses MongoDB's geospatial query to find properties within the specified radius.

---

## Advanced Search Example

Complex search combining multiple filters:

```
GET /properties?keyword=modern&propertyType=apartment&listingType=rent&minPrice=2000&maxPrice=3000&bedrooms=2&city=New York&sort=-createdAt&page=1&limit=10
```

This will return:
- Apartments for rent
- In New York
- With "modern" in title or description
- 2+ bedrooms
- Priced between $2000-$3000
- Sorted by newest first
- First page with 10 results per page

---

## Authentication Flow

1. **Register or Login** → Receive JWT token
2. **Store token** in localStorage or secure cookie
3. **Include token** in Authorization header for protected routes
4. **Token expires** after 30 days (configurable)
5. **Handle 401 errors** by redirecting to login

**Example Authorization Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MjI1MTAwMCwiZXhwIjoxNjQ0ODQzMDAwfQ.abc123...
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider implementing:
- Request rate limiting per IP
- Upload size limits
- Query complexity limits

---

## Data Validation

All endpoints validate input data:
- Required fields are checked
- Email format is validated
- Password minimum length (6 characters)
- Property types are validated against enum
- Numeric fields are validated
- File uploads are validated for type and size

---
