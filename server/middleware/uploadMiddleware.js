const { uploadProduct, uploadSettings, uploadFactory } = require('../config/cloudinary');

module.exports = {
  uploadProductImages: uploadProduct.array('images', 10),
  uploadSingleProductImage: uploadProduct.single('image'),
  uploadLogo: uploadSettings.single('logo'),
  uploadFavicon: uploadSettings.single('favicon'),
  uploadFactoryPhoto: uploadFactory.single('image'),
};
