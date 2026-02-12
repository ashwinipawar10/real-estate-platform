const Property = require('../models/Property');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get all properties with advanced filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    // Build query
    let query = {};

    // Search by keyword
    if (req.query.keyword) {
      query.$text = { $search: req.query.keyword };
    }

    // Filter by property type
    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }

    // Filter by listing type
    if (req.query.listingType) {
      query.listingType = req.query.listingType;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by city
    if (req.query.city) {
      query['location.city'] = new RegExp(req.query.city, 'i');
    }

    // Filter by state
    if (req.query.state) {
      query['location.state'] = new RegExp(req.query.state, 'i');
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = Number(req.query.maxPrice);
      }
    }

    // Bedrooms filter
    if (req.query.bedrooms) {
      query.bedrooms = { $gte: Number(req.query.bedrooms) };
    }

    // Bathrooms filter
    if (req.query.bathrooms) {
      query.bathrooms = { $gte: Number(req.query.bathrooms) };
    }

    // Area filter
    if (req.query.minArea || req.query.maxArea) {
      query.area = {};
      if (req.query.minArea) {
        query.area.$gte = Number(req.query.minArea);
      }
      if (req.query.maxArea) {
        query.area.$lte = Number(req.query.maxArea);
      }
    }

    // Location-based search (nearby properties)
    if (req.query.latitude && req.query.longitude) {
      const maxDistance = req.query.radius || 10000; // Default 10km
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(req.query.longitude), Number(req.query.latitude)]
          },
          $maxDistance: maxDistance
        }
      };
    }

    // Featured properties
    if (req.query.featured === 'true') {
      query.featured = true;
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Sort
    let sortBy = {};
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') 
        ? req.query.sort.substring(1) 
        : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sortBy[sortField] = sortOrder;
    } else {
      sortBy.createdAt = -1; // Default: newest first
    }

    // Execute query
    const properties = await Property.find(query)
      .populate('owner', 'name email phone avatar')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone avatar');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
exports.createProperty = async (req, res) => {
  try {
    // Add user to property
    req.body.owner = req.user.id;

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file => 
        uploadToCloudinary(file.buffer, 'real-estate/properties')
      );
      const images = await Promise.all(imagePromises);
      req.body.images = images;
    }

    // Create property
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      if (property.images && property.images.length > 0) {
        const deletePromises = property.images.map(img => 
          deleteFromCloudinary(img.public_id)
        );
        await Promise.all(deletePromises);
      }

      // Upload new images
      const imagePromises = req.files.map(file => 
        uploadToCloudinary(file.buffer, 'real-estate/properties')
      );
      const images = await Promise.all(imagePromises);
      req.body.images = images;
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    // Delete images from Cloudinary
    if (property.images && property.images.length > 0) {
      const deletePromises = property.images.map(img => 
        deleteFromCloudinary(img.public_id)
      );
      await Promise.all(deletePromises);
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user properties
// @route   GET /api/properties/user/myproperties
// @access  Private
exports.getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
