const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const slugify = require('../utils/slugify');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return successResponse(res, categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = slugify(name);
  const exists = await Category.findOne({ slug });
  if (exists) return errorResponse(res, 'Category already exists', 400);
  const category = await Category.create({ name, slug, description });
  return successResponse(res, category, 'Category created', 201);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return errorResponse(res, 'Category not found', 404);
  const { name, description } = req.body;
  if (name) { category.name = name; category.slug = slugify(name); }
  if (description !== undefined) category.description = description;
  await category.save();
  return successResponse(res, category, 'Category updated');
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return errorResponse(res, 'Category not found', 404);
  return successResponse(res, null, 'Category deleted');
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
