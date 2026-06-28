# Lohitha Murmura — Full Stack Website

Premium B2B wholesale murmura manufacturer website with admin panel, inquiry cart, and WhatsApp integration.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)

---

## ⚙️ Environment Setup

### Server (.env)
```bash
cd server
cp .env.example .env
# Edit .env with your actual values
```

Required values in `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/lohitha-murmura
JWT_SECRET=your_super_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (.env)
```bash
cd client
cp .env.example .env
```
`client/.env` content:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Project

### Start Backend
```bash
cd server
npm run dev
# Server starts on http://localhost:5000
```

### Start Frontend
```bash
cd client
npm run dev
# Frontend starts on http://localhost:5173
```

### Seed Initial Data (Optional)
```bash
cd server
node seed/seedData.js
```
This will create:
- 3 categories (Plain, Masala, Special Murmura)
- 6 sample products
- Default site settings (phone: +91 9848684411)

---

## 📁 Project Structure

```
lohitha-murmura/
├── client/          # React + Vite + Tailwind CSS frontend
│   └── src/
│       ├── components/
│       │   ├── layout/     # Navbar, Footer, FloatingWhatsApp
│       │   ├── home/       # HeroSection, ContactSection, etc.
│       │   ├── products/   # ProductCard, SearchBar, etc.
│       │   ├── cart/       # InquiryCart components
│       │   └── admin/      # AdminLayout, ProductForm
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── ProductsPage.jsx
│       │   ├── ProductDetailPage.jsx
│       │   ├── InquiryCartPage.jsx
│       │   └── admin/      # All admin pages
│       ├── context/        # CartContext, AuthContext
│       ├── services/       # API calls
│       ├── hooks/          # useDebounce, useSettings
│       └── animations/     # Framer Motion variants
│
└── server/          # Node.js + Express + MongoDB backend
    ├── models/      # Settings, Product, Category, Inquiry, FactoryPhoto
    ├── controllers/ # Business logic
    ├── routes/      # API routes
    ├── middleware/  # Auth, Upload, Error handling
    ├── services/    # Cloudinary service
    └── seed/        # Sample data seeder
```

---

## 🔐 Admin Panel

URL: `http://localhost:5173/admin/login`

Default credentials (set in your `.env`):
- Username: `admin`
- Password: `LohithaMurmura@2024` (change this!)

### Admin Features
- 📊 Dashboard with live stats
- 📦 Product CRUD with multi-image upload (Cloudinary)
- 🏷️ Category management
- 🏭 Factory photo gallery
- 📨 Inquiry tracking with status management
- ⚙️ Website settings (all content editable from one place)

---

## 📱 Key Features

- **Factory Product Catalogue** — NOT e-commerce
- **Inquiry Cart** — Select products + quantities → Contact via WhatsApp
- **WhatsApp Integration** — Pre-filled message generated automatically
- **SEO Optimized** — Meta tags on every page
- **Responsive** — Desktop, tablet & mobile
- **Framer Motion** — Smooth animations
- **Lazy Loading** — Fast page loads
- **Code Splitting** — Separate chunks for vendor libraries

---

## 📞 Business Contact

- **Phone/WhatsApp:** +91 9848684411
- **Address:** Karimnagar - Hyderabad Hwy, beside Dayanand Function Hall, Prashanth Nagar, Siddipet, Telangana 502103
- **Working Hours:** Mon - Sat: 8:00 AM - 6:00 PM

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 8, Tailwind CSS 3 |
| Animations | Framer Motion |
| Routing | React Router v6 |
| State | Context API + useReducer |
| Notifications | react-hot-toast |
| SEO | react-helmet-async |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Images | Cloudinary |
| Auth | JWT |
| HTTP Client | Axios |

---

© 2024 Lohitha Murmura. All rights reserved.
