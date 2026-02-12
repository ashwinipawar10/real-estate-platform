import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>
            Discover the best real estate deals with advanced search filters,
            interactive maps, and verified listings
          </p>
          <div className="hero-actions">
            <Link to="/properties" className="btn btn-primary btn-large">
              <FaSearch /> Browse Properties
            </Link>
            <Link to="/add-property" className="btn btn-secondary btn-large">
              <FaHome /> List Your Property
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaSearch />
              </div>
              <h3>Advanced Search</h3>
              <p>
                Filter properties by price, location, type, bedrooms, and more
                to find exactly what you need
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Interactive Maps</h3>
              <p>
                View properties on Google Maps with precise location markers
                and nearby amenities
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaHome />
              </div>
              <h3>Verified Listings</h3>
              <p>
                All properties are verified with high-quality images and
                detailed descriptions
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users finding their perfect property</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
