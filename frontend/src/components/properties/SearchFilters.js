import React, { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    propertyType: '',
    listingType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    state: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty filters
    const activeFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key]) {
        acc[key] = filters[key];
      }
      return acc;
    }, {});
    onFilterChange(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      propertyType: '',
      listingType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      city: '',
      state: '',
    });
    onFilterChange({});
  };

  return (
    <div className="search-filters">
      <form onSubmit={handleSubmit}>
        <div className="filters-basic">
          <div className="form-group">
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleChange}
              placeholder="Search by keyword..."
              className="search-input"
            />
          </div>

          <div className="form-group">
            <select name="listingType" value={filters.listingType} onChange={handleChange}>
              <option value="">All Listing Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div className="form-group">
            <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
              <option value="">All Property Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn btn-secondary"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </button>
        </div>

        {showAdvanced && (
          <div className="filters-advanced">
            <div className="filter-row">
              <div className="form-group">
                <label>Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  placeholder="Min Price"
                />
              </div>

              <div className="form-group">
                <label>Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  placeholder="Max Price"
                />
              </div>

              <div className="form-group">
                <label>Bedrooms</label>
                <select name="bedrooms" value={filters.bedrooms} onChange={handleChange}>
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <select name="bathrooms" value={filters.bathrooms} onChange={handleChange}>
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={filters.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>
            </div>
          </div>
        )}

        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
