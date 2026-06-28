const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getDashboardStats,
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

// Public
router.post('/', createInquiry);

// Admin
router.get('/dashboard/stats', protect, getDashboardStats);
router.get('/admin', protect, getInquiries);
router.put('/admin/:id/status', protect, updateInquiryStatus);
router.delete('/admin/:id', protect, deleteInquiry);

module.exports = router;
