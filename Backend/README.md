# Luxelayer - Luxury Clothing E-Commerce Platform

## Project Description

**Luxelayer** is a modern e-commerce platform designed to sell premium luxury clothing products. This full-stack MERN project provides production-ready features including secure authentication, product management, shopping cart functionality, wishlist support, and comprehensive user management.

---

## Features

- ✅ **User Authentication** - Registration, Login with email/password
- ✅ **Google OAuth 2.0** - Passport.js integration for secure authentication
- ✅ **JWT Tokens** - Secure token-based authentication system
- ✅ **Product Catalog** - Complete product listing with filtering and search
- ✅ **Product Details** - Detailed view with images, description, and pricing
- ✅ **Shopping Cart** - Add, update, remove items with real-time updates
- ✅ **Wishlist Feature** - Save products for future purchase
- ✅ **User Address Management** - Multiple address storage for easy checkout
- ✅ **Secure APIs** - RESTful APIs with proper authentication and authorization
- ✅ **Error Handling** - Comprehensive error handling middleware
- ✅ **Input Validation** - Data validation using Joi validators
- ✅ **Responsive Design** - Mobile-friendly UI across all devices
- ✅ **Seller Dashboard** - Seller account management and product upload
- ✅ **Seller Authentication** - Separate authentication flow for sellers

---

## Tech Stack

### Frontend

- **React 18** - UI library
- **Redux Toolkit** - State management
- **Vite** - Build tool (fast development server)
- **Axios** - HTTP client for API calls
- **SCSS** - Styling (Sass)
- **React Router** - Client-side routing
- **ESLint** - Code quality

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **JWT (jsonwebtoken)** - Token generation and verification
- **Joi** - Data validation library
- **Multer** - File upload handling
- **Nodemailer** - Email sending service
- **CORS** - Cross-origin resource sharing

### Database

- **MongoDB** - Primary database
- **MongoDB Atlas** - Cloud database hosting

### Tools & Services

- **Render** - Backend deployment
- **Vercel / Netlify** - Frontend deployment (optional)
- **Postman** - API testing
- **Git & GitHub** - Version control

---

## Installation Guide

### Prerequisites

You'll need the following installed:

- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Git
- Code editor (VS Code recommended)
- Google OAuth credentials (from Google Console)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/luxelayer.git
cd luxelayer
```

### Step 2: Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

### Step 3: Frontend Setup

```bash
cd Frontend
npm install
# Create .env file with API configuration
```

### Step 4: Environment Configuration

Configure environment variables for both Backend and Frontend (see section below).

---

## Environment Variables

### Backend `.env` File

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luxelayer

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Email Service (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# CORS
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# Session
SESSION_SECRET=your_session_secret_key

# Deployment
BACKEND_URL=https://your-backend-render.com
```

### Frontend `.env` File

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_BASE_PATH=/api

# Environment
VITE_ENV=development

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## How to Run Project Locally

### Start Backend Server

```bash
cd Backend
npm run dev

# Server will run at http://localhost:5000
```

### Start Frontend Development Server

```bash
cd Frontend
npm run dev

# Browser will open at http://localhost:5173
```

### Testing API Endpoints

```bash
curl http://localhost:5000/api/products
```

---

## API Overview

### Authentication Endpoints

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | User registration  |
| POST   | `/api/auth/login`    | User login         |
| GET    | `/api/auth/google`   | Google OAuth login |
| POST   | `/api/auth/logout`   | User logout        |
| POST   | `/api/auth/refresh`  | Refresh JWT token  |
| POST   | `/api/auth/verify`   | Email verification |

### Product Endpoints

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/products`     | Get all products        |
| GET    | `/api/products/:id` | Get product by ID       |
| POST   | `/api/products`     | Create product (seller) |
| PUT    | `/api/products/:id` | Update product (seller) |
| DELETE | `/api/products/:id` | Delete product (seller) |

### Cart Endpoints

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/cart`         | Get user cart    |
| POST   | `/api/cart`         | Add to cart      |
| PUT    | `/api/cart/:itemId` | Update cart item |
| DELETE | `/api/cart/:itemId` | Remove from cart |

### Wishlist Endpoints

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| GET    | `/api/wishlist`            | Get wishlist         |
| POST   | `/api/wishlist`            | Add to wishlist      |
| DELETE | `/api/wishlist/:productId` | Remove from wishlist |

### Address Endpoints

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/api/address`     | Get user addresses |
| POST   | `/api/address`     | Add new address    |
| PUT    | `/api/address/:id` | Update address     |
| DELETE | `/api/address/:id` | Delete address     |

### Seller Endpoints

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | `/api/seller/account`  | Get seller profile    |
| PUT    | `/api/seller/account`  | Update seller profile |
| POST   | `/api/seller/products` | Get seller products   |

---

## Deployment

### Backend Deployment on Render

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Create New Web Service**
   - Click "New +" → Select "Web Service"
   - Connect your GitHub repository
   - Select Backend folder

3. **Set Environment Variables**
   - In Render dashboard, go to Environment section
   - Add all .env variables (MONGODB_URI, JWT_SECRET, etc.)

4. **Deploy**
   - Click Deploy button
   - Wait for build process to complete
   - Copy your Backend URL (e.g., `https://luxelayer-backend.onrender.com`)

5. **Update Frontend**
   - Update Frontend `.env` with `VITE_API_URL` pointing to your Render URL

### Frontend Deployment

**Option 1: Vercel Deployment**

```bash
npm install -g vercel
cd Frontend
vercel
```

**Option 2: Netlify Deployment**

1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Production Checklist

- [ ] Backend API URL configured for production
- [ ] CORS settings properly configured
- [ ] JWT secret is strong and secure
- [ ] Database backups enabled in MongoDB Atlas
- [ ] SSL certificates enabled (HTTPS)
- [ ] Error logging setup
- [ ] Rate limiting added to API
- [ ] Security headers configured
- [ ] Environment variables secured in production

---

## Screenshots

### Landing Page

![Landing Page](./screenshots/landing-page.png)

### User Registration

![Registration](./screenshots/registration.png)

### Product Listing

![Product Listing](./screenshots/products.png)

### Product Details

![Product Details](./screenshots/product-details.png)

### Shopping Cart

![Shopping Cart](./screenshots/cart.png)

### User Dashboard

![Dashboard](./screenshots/dashboard.png)

### Seller Dashboard

![Seller Dashboard](./screenshots/seller-dashboard.png)

_Add screenshots to the ./screenshots folder_

---

## Future Improvements

- [ ] **Payment Gateway Integration** - Stripe, Razorpay payment processing
- [ ] **Order Management System** - Order tracking and history
- [ ] **Email Notifications** - Order confirmation, shipping updates
- [ ] **Product Reviews & Ratings** - Customer feedback system
- [ ] **Advanced Search Filters** - Category, price range, size filters
- [ ] **Inventory Management** - Stock tracking and management
- [ ] **Admin Dashboard** - Platform management
- [ ] **Analytics & Reports** - Sales analytics, user behavior
- [ ] **Push Notifications** - Real-time alerts for orders
- [ ] **PWA Support** - Progressive Web App features
- [ ] **API Rate Limiting** - Enhanced security measures
- [ ] **Caching Strategy** - Redis caching for performance
- [ ] **Multi-language Support** - i18n integration
- [ ] **Mobile App** - React Native mobile application
- [ ] **Chatbot Support** - Customer support automation

---

## Project Structure

```
Luxelayer/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/          (Database, Cache, Config)
│   │   ├── controllers/     (Business logic)
│   │   ├── middlewares/     (Auth, Error handling)
│   │   ├── models/          (MongoDB schemas)
│   │   ├── routes/          (API endpoints)
│   │   ├── services/        (Email, Storage)
│   │   ├── utils/           (Helper functions)
│   │   └── validators/      (Input validation)
│   ├── package.json
│   ├── server.js
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── app/             (Main app component)
│   │   ├── features/        (Feature modules)
│   │   ├── shared/          (Shared components)
│   │   ├── assets/          (Images, fonts)
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── README.md
```

---

## Contributing

To contribute to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Author

**Your Name**

- GitHub: https://github.com/Sadhnagautam25
- Email: sadhnagautam813@gmail.com
- LinkedIn: https://www.linkedin.com/in/sadhnagautam25/
---

## FAQ

**Q: How long does the project setup take?**
A: If you have all prerequisites installed, the setup takes approximately 10-15 minutes.

**Q: Can I use MongoDB Atlas free tier?**
A: Yes, MongoDB Atlas free tier provides 512MB storage which is sufficient for development.

**Q: Can I use Render free tier for production?**
A: Yes, but the free tier uses auto-sleep mode. Paid plans are recommended for production.

**Q: How do I get Google OAuth credentials?**
A: Go to [Google Console](https://console.cloud.google.com), create a new project, and generate OAuth 2.0 credentials.

---

## Support

If you encounter any issues or have questions:

1. Check GitHub Issues
2. Review the documentation
3. Use the Discussions section
4. Email: your.email@example.com

---

## Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/luxelayer.git && cd luxelayer

# Backend setup
cd Backend && npm install
# Configure .env file
npm run dev

# Frontend setup (new terminal)
cd Frontend && npm install
npm run dev

# Open browser
# Backend: http://localhost:5000
# Frontend: http://localhost:5173
```

---

Made with ❤️ by Your Name | Luxelayer Development Team

Last Updated: April 2026
