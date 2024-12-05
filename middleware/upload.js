const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'trips', // Folder name in your Cloudinary account
    allowedFormats: ['jpeg', 'jpg', 'png'], // Allowed image formats
    public_id: (req, file) => Date.now() + '_' + file.originalname, 
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
