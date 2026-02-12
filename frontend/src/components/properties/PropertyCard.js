import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-card">
      <Link to={`/properties/${property._id}`}>
        <div className="property-image">
          <img
            src={property.images[0]?.url || '/placeholder.jpg'}
            alt={property.title}
          />
          <div className="property-badge">
            {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </div>
          {property.featured && <div className="featured-badge">Featured</div>}
        </div>

        <div className="property-content">
          <div className="property-price">{formatPrice(property.price)}</div>
          <h3 className="property-title">{property.title}</h3>
          
          <div className="property-location">
            <FaMapMarkerAlt />
            <span>
              {property.location.city}, {property.location.state}
            </span>
          </div>

          <div className="property-features">
            <div className="feature">
              <FaBed />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="feature">
              <FaBath />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="feature">
              <FaRulerCombined />
              <span>{property.area} sqft</span>
            </div>
          </div>

          <div className="property-type">{property.propertyType}</div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
