const asyncHandler = require('express-async-handler');
const FactoryPhoto = require('../models/FactoryPhoto');
const { deleteImage } = require('../services/cloudinaryService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getFactoryPhotos = asyncHandler(async (req, res) => {
  const photos = await FactoryPhoto.find().sort({ order: 1, createdAt: -1 });
  return successResponse(res, photos);
});

const addFactoryPhoto = asyncHandler(async (req, res) => {
  if (!req.file) return errorResponse(res, 'No file uploaded', 400);
  const photo = await FactoryPhoto.create({
    image: {
      url: req.file.path,
      public_id: req.file.filename,
      alt: req.body.caption || 'Factory Photo',
    },
    caption: req.body.caption || '',
    order: Number(req.body.order) || 0,
  });
  return successResponse(res, photo, 'Photo added', 201);
});

const deleteFactoryPhoto = asyncHandler(async (req, res) => {
  const photo = await FactoryPhoto.findById(req.params.id);
  if (!photo) return errorResponse(res, 'Photo not found', 404);
  await deleteImage(photo.image.public_id);
  await photo.deleteOne();
  return successResponse(res, null, 'Photo deleted');
});

module.exports = { getFactoryPhotos, addFactoryPhoto, deleteFactoryPhoto };
