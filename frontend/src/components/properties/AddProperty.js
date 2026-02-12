import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import './PropertyForm.css';

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'house',
    listingType: 'sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    yearBuilt: '',
    parking: '',
    amenities: '',
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    setImages(files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to add property');
      navigate('/login');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        if (key === 'amenities') {
          // Convert comma-separated string to array
          const amenitiesArray = formData[key]
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item);
          amenitiesArray.forEach((amenity) => {
            data.append('amenities[]', amenity);
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      // Add coordinates as nested object
      data.append('location[coordinates][type]', 'Point');
      data.append(
        'location[coordinates][coordinates][0]',
        formData.longitude
      );
      data.append(
        'location[coordinates][coordinates][1]',
        formData.latitude
      );

      // Add images
      images.forEach((image) => {
        data.append('images', image);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await api.post('/properties', data, config);
      toast.success('Property added successfully!');
      navigate('/properties');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding property');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="property-form-container">
      <h2>Add New Property</h2>
      <form onSubmit={onSubmit} className="property-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Property Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="e.g., Beautiful 3BR House with Garden"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Describe your property..."
              rows="5"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={onChange}
                required
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="form-group">
              <label>Listing Type *</label>
              <select
                name="listingType"
                value={formData.listingType}
                onChange={onChange}
                required
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Property Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Bedrooms *</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={onChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Bathrooms *</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={onChange}
                min="0"
                step="0.5"
                required
              />
            </div>

            <div className="form-group">
              <label>Area (sqft) *</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={onChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year Built</label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={onChange}
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-group">
              <label>Parking Spaces</label>
              <input
                type="number"
                name="parking"
                value={formData.parking}
                onChange={onChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={onChange}
              placeholder="e.g., Pool, Gym, Garden, Garage"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Location</h3>
          
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              placeholder="Street address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="City"
                required
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChange}
                placeholder="State"
                required
              />
            </div>

            <div className="form-group">
              <label>Zip Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={onChange}
                placeholder="Zip Code"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Latitude * (Use Google Maps to find coordinates)</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={onChange}
                placeholder="e.g., 40.7128"
                step="any"
                required
              />
            </div>

            <div className="form-group">
              <label>Longitude *</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={onChange}
                placeholder="e.g., -74.0060"
                step="any"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Images</h3>
          <div className="form-group">
            <label>Property Images * (Max 10 images)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
              required
            />
            {images.length > 0 && (
              <p className="file-info">{images.length} image(s) selected</p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
