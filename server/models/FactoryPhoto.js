const mongoose = require('mongoose');

const factoryPhotoSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
      alt: { type: String, default: 'Factory Photo' },
    },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FactoryPhoto', factoryPhotoSchema);
