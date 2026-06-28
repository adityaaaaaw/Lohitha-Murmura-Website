const mongoose = require('mongoose');

const inquiryProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Walk-in Customer' },
    phone: { type: String, default: '' },
    products: [inquiryProductSchema],
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
