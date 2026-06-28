const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Lohitha Murmura' },
    tagline: { type: String, default: 'Factory Fresh Murmura' },
    heroDescription: {
      type: String,
      default: 'Serving Wholesalers, Retailers & Distributors Across Andhra Pradesh',
    },
    phone: { type: String, default: '+91 9848684411' },
    whatsapp: { type: String, default: '+919848684411' },
    email: { type: String, default: 'lohithamurmura@gmail.com' },
    address: {
      type: String,
      default:
        'Karimnagar - Hyderabad Hwy, beside Dayanand Function Hall, Prashanth Nagar, Siddipet, Telangana 502103',
    },
    googleMapsEmbed: {
      type: String,
      default:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.0!2d78.852!3d18.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA2JzAwLjAiTiA3OMKwNTEnMDcuMiJF!5e0!3m2!1sen!2sin!4v1234567890',
    },
    googleMapsLink: {
      type: String,
      default:
        'https://maps.google.com/?q=Karimnagar+Hyderabad+Hwy+beside+Dayanand+Function+Hall+Prashanth+Nagar+Siddipet+Telangana+502103',
    },
    workingHours: { type: String, default: 'Mon - Sat: 8:00 AM - 6:00 PM' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    logo: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    favicon: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
