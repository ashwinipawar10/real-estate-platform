import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ define first + useCallback
  const fetchProperty = useCallback(async () => {
    try {
      const res = await api.get(`/properties/${id}`);
      setProperty(res.data.property);
    } catch (error) {
      toast.error('Error fetching property details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ✅ single dependency array
  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.delete(`/properties/${id}`);
        toast.success('Property deleted successfully');
        navigate('/properties');
      } catch (error) {
        toast.error('Error deleting property');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Loading property details...</div>;
  }

  if (!property) {
    return <div className="error">Property not found</div>;
  }

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: property.location.coordinates.coordinates[1],
    lng: property.location.coordinates.coordinates[0],
  };

  return (
    <div className="property-detail">
      <div className="property-gallery">
        <div className="main-image">
          <img
            src={property.images[currentImageIndex]?.url || '/placeholder.jpg'}
            alt={property.title}
          />
        </div>
        <div className="thumbnail-gallery">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${property.title} ${index + 1}`}
              className={currentImageIndex === index ? 'active' : ''}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="property-info">
        <div className="property-header">
          <div>
            <h1>{property.title}</h1>
            <div className="property-location-detail">
              <FaMapMarkerAlt />
              <span>
                {property.location.address}, {property.location.city},{' '}
                {property.location.state} {property.location.zipCode}
              </span>
            </div>
          </div>
          <div className="property-price-detail">{formatPrice(property.price)}</div>
        </div>

        <div className="property-features-detail">
          <div className="feature-item">
            <FaBed size={24} />
            <div>
              <strong>{property.bedrooms}</strong>
              <span>Bedrooms</span>
            </div>
          </div>
          <div className="feature-item">
            <FaBath size={24} />
            <div>
              <strong>{property.bathrooms}</strong>
              <span>Bathrooms</span>
            </div>
          </div>
          <div className="feature-item">
            <FaRulerCombined size={24} />
            <div>
              <strong>{property.area}</strong>
              <span>Sqft</span>
            </div>
          </div>
        </div>

        <div className="property-section">
          <h2>Description</h2>
          <p>{property.description}</p>
        </div>

        <div className="property-section">
          <h2>Property Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Property Type:</span>
              <span className="detail-value">{property.propertyType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Listing Type:</span>
              <span className="detail-value">
                {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value">{property.status}</span>
            </div>
            {property.yearBuilt && (
              <div className="detail-item">
                <span className="detail-label">Year Built:</span>
                <span className="detail-value">{property.yearBuilt}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">Parking:</span>
              <span className="detail-value">{property.parking} spaces</span>
            </div>
          </div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="property-section">
            <h2>Amenities</h2>
            <div className="amenities-list">
              {property.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="property-section">
          <h2>Location</h2>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="property-section">
          <h2>Contact Owner</h2>
          <div className="owner-info">
            <img src={property.owner.avatar} alt={property.owner.name} />
            <div>
              <h3>{property.owner.name}</h3>
              <div className="contact-item">
                <FaPhone />
                <span>{property.owner.phone}</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>{property.owner.email}</span>
              </div>
            </div>
          </div>
        </div>

        {user && user.id === property.owner._id && (
          <div className="property-actions">
            <button
              onClick={() => navigate(`/properties/edit/${property._id}`)}
              className="btn btn-primary"
            >
              Edit Property
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
