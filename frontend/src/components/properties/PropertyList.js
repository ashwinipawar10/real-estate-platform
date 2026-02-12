import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';
import PropertyCard from './PropertyCard';
import SearchFilters from './SearchFilters';
import { toast } from 'react-toastify';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  // ✅ define function FIRST + useCallback
  const fetchProperties = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        ...filters,
        page,
      });

      const res = await api.get(`/properties?${queryParams}`);
      setProperties(res.data.properties);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
        total: res.data.total,
      });
    } catch (error) {
      toast.error('Error fetching properties');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // ✅ single dependency array
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    fetchProperties(page);
  };

  return (
    <div className="property-list-container">
      <SearchFilters onFilterChange={handleFilterChange} />

      <div className="property-list-content">
        <div className="property-list-header">
          <h2>Available Properties</h2>
          <p>{pagination.total} properties found</p>
        </div>

        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="no-properties">
            <p>No properties found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="property-grid">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
