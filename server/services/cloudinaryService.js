const { cloudinary } = require('../config/cloudinary');

const deleteImage = async (public_id) => {
  if (!public_id) return;
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
  }
};

const deleteMultipleImages = async (public_ids) => {
  const promises = public_ids.map((id) => deleteImage(id));
  await Promise.all(promises);
};

module.exports = { deleteImage, deleteMultipleImages };
