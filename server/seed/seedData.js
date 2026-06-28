const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Settings = require('../models/Settings');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    await Settings.deleteMany();

    // Settings
    await Settings.create({
      businessName: 'Lohitha Murmura',
      tagline: 'Factory Fresh Murmura',
      heroDescription: 'Serving Wholesalers, Retailers & Distributors Across Telangana & Andhra Pradesh',
      phone: '+91 9848684411',
      whatsapp: '919848684411',
      email: 'lohithamurmura@gmail.com',
      address:
        'Karimnagar - Hyderabad Hwy, beside Dayanand Function Hall, Prashanth Nagar, Siddipet, Telangana 502103',
      googleMapsLink: 'https://maps.google.com/?q=Prashanth+Nagar+Siddipet+Telangana+502103',
      workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    });

    // Categories
    const cats = await Category.insertMany([
      { name: 'Plain Murmura', slug: 'plain-murmura', description: 'Classic plain puffed rice' },
      { name: 'Masala Murmura', slug: 'masala-murmura', description: 'Spiced puffed rice varieties' },
      { name: 'Special Murmura', slug: 'special-murmura', description: 'Premium specialty varieties' },
    ]);

    // Products
    await Product.insertMany([
      {
        name: 'Plain Murmura',
        slug: 'plain-murmura',
        description:
          'Classic factory-fresh plain puffed rice. Crispy, light, and perfect for direct consumption or as a base for snacks. Produced daily in our modern facility.',
        category: cats[0]._id,
        images: [
          {
            url: 'https://placehold.co/800x800/FFF8E7/B9770E?text=Plain+Murmura',
            public_id: 'placeholder-plain',
            alt: 'Plain Murmura',
          },
        ],
        badges: ['Factory Fresh', 'Bulk Only', 'Daily Production'],
        availableQuantities: [50, 100, 150, 200],
        packaging: '25kg bags',
        featured: true,
        isActive: true,
      },
      {
        name: 'Masala Murmura',
        slug: 'masala-murmura',
        description:
          'Perfectly spiced puffed rice blended with authentic Indian masala. A popular choice for retailers and snack shops. Available in mild and spicy variants.',
        category: cats[1]._id,
        images: [
          {
            url: 'https://placehold.co/800x800/FFF3E0/B9770E?text=Masala+Murmura',
            public_id: 'placeholder-masala',
            alt: 'Masala Murmura',
          },
        ],
        badges: ['Factory Fresh', 'Bulk Only', 'Best Seller'],
        availableQuantities: [50, 100, 150, 200],
        packaging: '25kg bags',
        featured: true,
        isActive: true,
      },
      {
        name: 'Thin Murmura',
        slug: 'thin-murmura',
        description:
          'Light and crispy thin puffed rice, ideal for bhel puri and other street food preparations. Extra-light texture with a satisfying crunch.',
        category: cats[0]._id,
        images: [
          {
            url: 'https://placehold.co/800x800/FFFDE7/B9770E?text=Thin+Murmura',
            public_id: 'placeholder-thin',
            alt: 'Thin Murmura',
          },
        ],
        badges: ['Factory Fresh', 'Bulk Only'],
        availableQuantities: [50, 100, 150, 200],
        packaging: '20kg bags',
        featured: true,
        isActive: true,
      },
      {
        name: 'Thick Murmura',
        slug: 'thick-murmura',
        description:
          'Hearty thick-cut puffed rice with a bold crunch. Perfect for premium snack mixes and traditional recipes. Factory-direct freshness guaranteed.',
        category: cats[0]._id,
        images: [
          {
            url: 'https://placehold.co/800x800/FEF3C7/B9770E?text=Thick+Murmura',
            public_id: 'placeholder-thick',
            alt: 'Thick Murmura',
          },
        ],
        badges: ['Factory Fresh', 'Premium', 'Bulk Only'],
        availableQuantities: [50, 100, 150, 200],
        packaging: '25kg bags',
        featured: false,
        isActive: true,
      },
      {
        name: 'Spicy Murmura',
        slug: 'spicy-murmura',
        description:
          'Bold and fiery spiced puffed rice for the heat-lovers market. High demand in urban retail and food service segments.',
        category: cats[1]._id,
        images: [
          {
            url: 'https://placehold.co/800x800/FFEDD5/B9770E?text=Spicy+Murmura',
            public_id: 'placeholder-spicy',
            alt: 'Spicy Murmura',
          },
        ],
        badges: ['Factory Fresh', 'Hot & Spicy', 'Bulk Only'],
        availableQuantities: [50, 100, 150, 200],
        packaging: '25kg bags',
        featured: false,
        isActive: true,
      },
      {
        name: 'Premium Murmura',
        slug: 'premium-murmura',
        description:
          'Our finest grade murmura — extra crispy, uniformly sized, and produced with premium raw rice. Preferred by supermarkets and premium retailers.',
        category: cats[2]._id,
        images: [
          {
            url: 'https://placehold.co/800x800/FFF7ED/B9770E?text=Premium+Murmura',
            public_id: 'placeholder-premium',
            alt: 'Premium Murmura',
          },
        ],
        badges: ['Premium Grade', 'Factory Fresh', 'Bulk Only'],
        availableQuantities: [50, 100, 150, 200],
        packaging: '25kg bags',
        featured: true,
        isActive: true,
      },
    ]);

    console.log('✅ Seed data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
