const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lohitha-murmura/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
  },
});

const settingsStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'lohitha-murmura/settings', allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg'] },
});

const factoryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lohitha-murmura/factory',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1600, height: 1200, crop: 'limit', quality: 'auto' }],
  },
});

exports.uploadProduct = multer({ storage: productStorage });
exports.uploadSettings = multer({ storage: settingsStorage });
exports.uploadFactory = multer({ storage: factoryStorage });
exports.cloudinary = cloudinary;
