const asyncHandler = require('express-async-handler');
const Inquiry = require('../models/Inquiry');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const createInquiry = asyncHandler(async (req, res) => {
  const { name, phone, products, message } = req.body;
  if (!products || products.length === 0) return errorResponse(res, 'No products selected', 400);
  const inquiry = await Inquiry.create({ name, phone, products, message });
  return successResponse(res, inquiry, 'Inquiry saved', 201);
});

const getInquiries = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const query = {};
  if (status) query.status = status;
  const skip = (Number(page) - 1) * Number(limit);
  const [inquiries, total] = await Promise.all([
    Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Inquiry.countDocuments(query),
  ]);
  return successResponse(res, { inquiries, total, page: Number(page) });
});

const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!inquiry) return errorResponse(res, 'Inquiry not found', 404);
  return successResponse(res, inquiry, 'Status updated');
});

const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) return errorResponse(res, 'Inquiry not found', 404);
  return successResponse(res, null, 'Inquiry deleted');
});

const getDashboardStats = asyncHandler(async (req, res) => {
  const Product = require('../models/Product');
  const Category = require('../models/Category');
  const [totalProducts, totalInquiries, newInquiries, featuredProducts, totalCategories] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: 'new' }),
    Product.countDocuments({ featured: true }),
    Category.countDocuments(),
  ]);
  return successResponse(res, { totalProducts, totalInquiries, newInquiries, featuredProducts, totalCategories });
});

module.exports = { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry, getDashboardStats };
