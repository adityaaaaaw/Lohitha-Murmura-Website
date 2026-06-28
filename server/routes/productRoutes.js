const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProductImage,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProductImages } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:slug', getProductBySlug);

// Admin routes
router.get('/admin/all', protect, getAllProductsAdmin);
router.post('/admin', protect, uploadProductImages, createProduct);
router.put('/admin/:id', protect, uploadProductImages, updateProduct);
router.delete('/admin/:id/image', protect, deleteProductImage);
router.delete('/admin/:id', protect, deleteProduct);

module.exports = router;
