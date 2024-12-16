const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'trips', // Folder name in your Cloudinary account
    allowedFormats: ['jpeg', 'jpg', 'png'], // Allowed image formats
    public_id: (req, file) => `${Date.now()}_${file.originalname}`, // Generate unique file name
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

// Middleware for single or multiple file uploads
module.exports = {
  uploadSingle: upload.single('image'), // Single image upload
  uploadMultiple: upload.array('image', 10), // Multiple image upload, max 10 files
};
