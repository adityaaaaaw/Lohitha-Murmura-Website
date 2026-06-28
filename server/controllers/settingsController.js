const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');
const { cloudinary } = require('../config/cloudinary');
const { deleteImage } = require('../services/cloudinaryService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return successResponse(res, settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  const fields = [
    'businessName', 'tagline', 'heroDescription', 'phone', 'whatsapp', 'email',
    'address', 'googleMapsEmbed', 'googleMapsLink', 'workingHours', 'facebook', 'instagram', 'youtube',
  ];
  fields.forEach((f) => { if (req.body[f] !== undefined) settings[f] = req.body[f]; });
  await settings.save();
  return successResponse(res, settings, 'Settings updated');
});

const uploadLogo = asyncHandler(async (req, res) => {
  if (!req.file) return errorResponse(res, 'No file uploaded', 400);
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  if (settings.logo?.public_id) await deleteImage(settings.logo.public_id);
  settings.logo = { url: req.file.path, public_id: req.file.filename };
  await settings.save();
  return successResponse(res, settings, 'Logo updated');
});

const uploadFavicon = asyncHandler(async (req, res) => {
  if (!req.file) return errorResponse(res, 'No file uploaded', 400);
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();
  if (settings.favicon?.public_id) await deleteImage(settings.favicon.public_id);
  settings.favicon = { url: req.file.path, public_id: req.file.filename };
  await settings.save();
  return successResponse(res, settings, 'Favicon updated');
});

module.exports = { getSettings, updateSettings, uploadLogo, uploadFavicon };
