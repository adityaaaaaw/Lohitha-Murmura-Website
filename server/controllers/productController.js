const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const slugify = require('../utils/slugify');
const { deleteImage, deleteMultipleImages } = require('../services/cloudinaryService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getProducts = asyncHandler(async (req, res) => {
  const { search, category, featured, page = 1, limit = 20 } = req.query;
  const query = { isActive: true };
  if (search) query.$or = [{ name: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];
  if (category) query.category = category;
  if (featured === 'true') query.featured = true;
  const skip = (Number(page) - 1) * Number(limit);
  const [products, total] = await Promise.all([
    Product.find(query).populate('category', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Product.countDocuments(query),
  ]);
  return successResponse(res, { products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category', 'name slug');
  if (!product) return errorResponse(res, 'Product not found', 404);
  return successResponse(res, product);
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true, isActive: true }).populate('category', 'name slug').limit(8);
  return successResponse(res, products);
});

// Admin
const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category', 'name slug').sort({ createdAt: -1 });
  return successResponse(res, products);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, badges, availableQuantities, packaging, featured } = req.body;
  const slug = slugify(name);
  const exists = await Product.findOne({ slug });
  if (exists) return errorResponse(res, 'Product with this name already exists', 400);
  const images = (req.files || []).map((f) => ({ url: f.path, public_id: f.filename, alt: name }));
  const product = await Product.create({
    name,
    slug,
    description,
    category,
    images,
    badges: badges ? JSON.parse(badges) : ['Factory Fresh', 'Bulk Only'],
    availableQuantities: availableQuantities ? JSON.parse(availableQuantities) : [50, 100, 150, 200],
    packaging: packaging || '25kg bags',
    featured: featured === 'true',
  });
  const populated = await product.populate('category', 'name slug');
  return successResponse(res, populated, 'Product created', 201);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 'Product not found', 404);
  const { name, description, category, badges, availableQuantities, packaging, featured, isActive } = req.body;
  if (name) { product.name = name; product.slug = slugify(name); }
  if (description !== undefined) product.description = description;
  if (category) product.category = category;
  if (badges) product.badges = JSON.parse(badges);
  if (availableQuantities) product.availableQuantities = JSON.parse(availableQuantities);
  if (packaging !== undefined) product.packaging = packaging;
  if (featured !== undefined) product.featured = featured === 'true';
  if (isActive !== undefined) product.isActive = isActive === 'true';
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((f) => ({ url: f.path, public_id: f.filename, alt: product.name }));
    product.images.push(...newImages);
  }
  await product.save();
  const populated = await product.populate('category', 'name slug');
  return successResponse(res, populated, 'Product updated');
});

const deleteProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 'Product not found', 404);
  const { public_id } = req.body;
  await deleteImage(public_id);
  product.images = product.images.filter((img) => img.public_id !== public_id);
  await product.save();
  return successResponse(res, product, 'Image deleted');
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return errorResponse(res, 'Product not found', 404);
  const publicIds = product.images.map((img) => img.public_id);
  await deleteMultipleImages(publicIds);
  await product.deleteOne();
  return successResponse(res, null, 'Product deleted');
});

module.exports = {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProductImage,
  deleteProduct,
};
