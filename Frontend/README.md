# Luxelayer - Frontend Application

A modern React-based frontend for the Luxelayer e-commerce platform built with Vite, Redux Toolkit, and React Router.

## Overview

This frontend application provides a complete user interface for browsing luxury clothing products, managing user accounts, shopping cart, wishlist, and seller dashboard functionality. It's built with modern React practices and optimized for performance.

---

## Tech Stack

### Core Framework

- **React 19.2** - UI library for building interactive components
- **Vite 7.2** - Fast build tool and dev server
- **React Router DOM 7.14** - Client-side routing

### State Management

- **Redux Toolkit 2.11** - State management solution
- **React-Redux 9.2** - React bindings for Redux

### UI & Styling

- **SCSS** - Sass for advanced styling
- **Framer Motion 12.38** - Animation library
- **Lucide React 1.8** - Icon library
- **React Hot Toast 2.6** - Toast notifications

### HTTP Client

- **Axios 1.15** - Promise-based HTTP client

### Development Tools

- **ESLint 9.39** - Code quality linter
- **Vite Plugin React 5.1** - React support for Vite

---

## Project Structure

```
Frontend/
├── public/                              # Static assets
├── src/
│   ├── app/
│   │   ├── App.jsx                     # Main App component
│   │   ├── app.routes.jsx              # Route definitions
│   │   └── app.store.js                # Redux store configuration
│   │
│   ├── features/
│   │   ├── 404 page/
│   │   │   └── NotFoundPage.jsx        # 404 error page
│   │   │
│   │   ├── auth/                       # Authentication module
│   │   │   ├── authSlice/
│   │   │   │   └── auth.slice.js       # Auth Redux slice
│   │   │   ├── components/
│   │   │   │   ├── ContinewWithGoogle.jsx  # Google OAuth button
│   │   │   │   ├── Protected.jsx           # User route protection
│   │   │   │   └── SellerProtected.jsx     # Seller route protection
│   │   │   ├── Hooks/
│   │   │   │   └── useAuth.js              # Auth custom hook
│   │   │   ├── pages/
│   │   │   │   ├── LendingPage.jsx         # Home/landing page
│   │   │   │   ├── LoginPage.jsx           # User login page
│   │   │   │   ├── RegisterPage.jsx        # User registration page
│   │   │   │   └── VerifyPage.jsx          # Email verification page
│   │   │   ├── services/
│   │   │   │   └── auth.api.service.js     # Auth API calls
│   │   │   └── styles/
│   │   │       ├── AuthForm.scss
│   │   │       ├── AuthVariables.scss
│   │   │       ├── ContinewWithGoogle.scss
│   │   │       ├── LendingPage.scss
│   │   │       └── VerifyPage.scss
│   │   │
│   │   └── dashboard/                  # Main app module
│   │       ├── components/
│   │       │   ├── LoadingLoder.jsx        # Loading spinner
│   │       │   ├── Navbar.jsx              # Navigation bar
│   │       │   ├── ProductCard.jsx         # Product display card
│   │       │   ├── account_page_comp/      # Account page components
│   │       │   └── seller_account_page_comp/ # Seller account components
│   │       ├── Hooks/
│   │       │   ├── useAddress.js           # Address management hook
│   │       │   ├── useCart.js              # Cart operations hook
│   │       │   ├── useProduct.js           # Product fetch hook
│   │       │   ├── useSearch.js            # Product search hook
│   │       │   ├── useSeller.js            # Seller operations hook
│   │       │   └── useWishlist.js          # Wishlist operations hook
│   │       ├── pages/
│   │       │   ├── AccountPage.jsx         # User account page
│   │       │   ├── CartPage.jsx            # Shopping cart page
│   │       │   ├── Dashboard.jsx           # Main dashboard
│   │       │   ├── ProductView.jsx         # Product detail page
│   │       │   ├── SellerBusinessPage.jsx  # Seller dashboard
│   │       │   ├── SellerCreateProductPage.jsx  # Create product page
│   │       │   ├── WishlistPage.jsx        # Wishlist page
│   │       │   └── ShopPage.jsx            # Shopping page
│   │       ├── services/
│   │       │   ├── address.api.service.js  # Address API calls
│   │       │   ├── cart.api.service.js     # Cart API calls
│   │       │   ├── product.api.service.js  # Product API calls
│   │       │   ├── seller.api.service.js   # Seller API calls
│   │       │   └── wishlist.api.service.js # Wishlist API calls
│   │       ├── states/
│   │       │   ├── address.slice.js        # Address Redux slice
│   │       │   ├── cart.slice.js           # Cart Redux slice
│   │       │   ├── product.slice.js        # Product Redux slice
│   │       │   ├── seller.slice.js         # Seller Redux slice
│   │       │   └── wishlist.slice.js       # Wishlist Redux slice
│   │       └── styles/
│   │           └── *.scss                  # Dashboard component styles
│   │
│   ├── shared/
│   │   ├── components/                     # Reusable components
│   │   └── global.scss                    # Global styles
│   │
│   ├── assets/
│   │   └── (images, fonts, etc.)
│   │
│   └── main.jsx                          # React entry point
│
├── index.html                            # HTML template
├── vite.config.js                        # Vite configuration
├── eslint.config.js                      # ESLint configuration
├── package.json
└── README.md
```

---

## Features

### Authentication System

- **User Registration** - Create account with email and password
- **User Login** - Secure login with session management
- **Google OAuth 2.0** - Sign in with Google account
- **Email Verification** - Verify email before account activation
- **Protected Routes** - Role-based access control (User & Seller)
- **JWT Token Management** - Secure token-based authentication

### User Features

- **Product Browsing** - Browse luxury clothing catalog
- **Product Details** - View detailed product information with images
- **Shopping Cart** - Add/remove items, view total price
- **Wishlist** - Save favorite products for later
- **User Account** - Manage profile and personal information
- **Address Management** - Save multiple delivery addresses
- **Search & Filter** - Find products by category, price, and name

### Seller Features

- **Seller Dashboard** - Manage seller business
- **Product Upload** - Create and list products for sale
- **Seller Profile** - Manage seller account and information
- **Product Management** - Edit and delete listed products
- **Seller Authentication** - Separate login for sellers

### UI/UX Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Loading States** - Visual feedback during data loading
- **Toast Notifications** - User-friendly notifications
- **Animations** - Smooth transitions using Framer Motion
- **Icon Support** - Beautiful icons with Lucide React

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:5000`

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the Frontend root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE_PATH=/api
VITE_ENV=development
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Step 3: Update Vite Config (Optional)

The vite.config.js already has a proxy configured for the backend:

- API requests to `/api` are proxied to `http://localhost:5000`

If your backend runs on a different port, update `vite.config.js`:

```javascript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:YOUR_BACKEND_PORT",
      changeOrigin: true,
      secure: false,
    },
  },
},
```

---

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (Vite default port)

### Build for Production

```bash
npm run build
```

Optimized production build will be created in the `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Run ESLint

Check code quality:

```bash
npm run lint
```

---

## Available Routes

| Route                  | Component               | Protection      | Description             |
| ---------------------- | ----------------------- | --------------- | ----------------------- |
| `/`                    | LendingPage             | Public          | Home/landing page       |
| `/login`               | LoginPage               | Public          | User login              |
| `/register`            | RegisterPage            | Public          | User registration       |
| `/verify-email`        | VerifyPage              | Public          | Email verification      |
| `/dashboard`           | Dashboard               | Protected       | Main user dashboard     |
| `/shop`                | ShopPage                | Protected       | Product shopping page   |
| `/product/:id`         | ProductView             | Protected       | Product detail page     |
| `/wishlist`            | WishlistPage            | Protected       | Wishlist page           |
| `/cart`                | CartPage                | Protected       | Shopping cart page      |
| `/account`             | AccountPage             | Protected       | User account management |
| `/seller-account`      | SellerBusinessPage      | SellerProtected | Seller dashboard        |
| `/create-product-page` | SellerCreateProductPage | SellerProtected | Create new product      |
| `*`                    | NotFoundPage            | Public          | 404 page                |

---

## Redux State Management

The application uses Redux Toolkit for state management with the following slices:

### Auth Slice (`authSlice`)

Manages user authentication state:

- User login/logout
- User profile data
- Authentication status
- JWT tokens

### Product Slice (`productSlice`)

Manages product catalog:

- All products list
- Product details
- Loading states
- Filters and search

### Cart Slice (`cartSlice`)

Manages shopping cart:

- Cart items
- Cart total
- Add/remove items
- Update quantities

### Wishlist Slice (`wishlistSlice`)

Manages user wishlist:

- Wishlist items
- Add/remove from wishlist

### Address Slice (`addressSlice`)

Manages user addresses:

- Multiple saved addresses
- Add/edit/delete addresses
- Default address selection

### Seller Slice (`sellerSlice`)

Manages seller operations:

- Seller profile
- Seller products
- Sales information

---

## API Integration

The frontend uses Axios for API communication. Services are organized by feature:

### Auth API Service

- `register()` - User registration
- `login()` - User login
- `getMe()` - Get current user
- `updateProfile()` - Update user profile
- `logout()` - User logout

### Product API Service

- `getProducts()` - Fetch all products
- `getProductById()` - Fetch single product
- `searchProducts()` - Search products
- `filterProducts()` - Filter by category/price

### Cart API Service

- `getCart()` - Fetch user cart
- `addToCart()` - Add product to cart
- `updateCartItem()` - Update quantity
- `removeFromCart()` - Remove item from cart
- `clearCart()` - Clear entire cart

### Wishlist API Service

- `getWishlist()` - Fetch wishlist
- `addToWishlist()` - Add product to wishlist
- `removeFromWishlist()` - Remove from wishlist

### Address API Service

- `getAddresses()` - Fetch all addresses
- `addAddress()` - Add new address
- `updateAddress()` - Update address
- `deleteAddress()` - Delete address
- `setDefaultAddress()` - Set default address

### Seller API Service

- `getSellerProfile()` - Fetch seller profile
- `updateSellerProfile()` - Update seller info
- `createProduct()` - Create new product
- `getSellerProducts()` - Fetch seller's products
- `updateProduct()` - Update product
- `deleteProduct()` - Delete product

---

## Custom Hooks

### useAuth()

Access authentication state and methods:

```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

### useCart()

Manage shopping cart:

```javascript
const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
```

### useProduct()

Fetch and manage products:

```javascript
const { products, loading, error, getProducts } = useProduct();
```

### useWishlist()

Manage wishlist:

```javascript
const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
```

### useAddress()

Manage user addresses:

```javascript
const { addresses, addAddress, updateAddress, deleteAddress } = useAddress();
```

### useSeller()

Manage seller operations:

```javascript
const { sellerProfile, products, createProduct, updateProduct } = useSeller();
```

### useSearch()

Search products:

```javascript
const { searchResults, search } = useSearch();
```

---

## Components

### Protected.jsx

Route wrapper that checks user authentication:

- Redirects to login if not authenticated
- Displays loading state during auth check
- Allows access to protected routes

### SellerProtected.jsx

Route wrapper for seller-only routes:

- Checks both authentication and seller status
- Redirects if not a seller
- Protects seller dashboard pages

### ContinewWithGoogle.jsx

Google OAuth button component:

- Handles Google sign-in flow
- Manages Google OAuth callback
- Updates authentication state

### Navbar.jsx

Navigation bar component:

- Shows user name when logged in
- Navigation links based on user type
- Logout functionality
- Responsive mobile menu

### ProductCard.jsx

Reusable product card component:

- Product image, name, price
- Add to cart button
- Add to wishlist button
- Click to view details

### LoadingLoder.jsx

Loading spinner component:

- Shows during data fetching
- Animated loading state

---

## Styling

### SCSS Architecture

- **Global Styles** - `shared/global.scss` - Base styles, typography, colors
- **Feature Styles** - Component-specific SCSS files in each feature
- **Variables** - `AuthVariables.scss` - Centralized color and size variables

### Key Style Files

- `AuthForm.scss` - Form styling for auth pages
- `LendingPage.scss` - Landing page styles
- `VerifyPage.scss` - Email verification page styles
- `ContinewWithGoogle.scss` - Google button styling

---

## Authentication Flow

1. **User Registration**
   - User fills registration form
   - Form validation on client side
   - API call to backend `/api/auth/register`
   - Receives JWT token and user data
   - Redirects to email verification page

2. **Email Verification**
   - User receives verification email
   - User clicks verification link or enters code
   - API call to `/api/auth/verify`
   - Account activated

3. **User Login**
   - User enters credentials
   - API call to `/api/auth/login`
   - Receives JWT token
   - Token stored in Redux state
   - Redirected to dashboard

4. **Google OAuth**
   - User clicks "Continue with Google"
   - Google OAuth popup opens
   - User authenticates with Google
   - Backend creates/updates user account
   - JWT token received and stored
   - User logged in

5. **Protected Routes**
   - Check if user is authenticated
   - Check if JWT token is valid
   - If not authenticated, redirect to login
   - If authenticated, allow access

---

## Development Workflow

### Code Quality

- Use ESLint to maintain code quality
- Run `npm run lint` before committing
- Follow React best practices and hooks patterns

### Component Creation

1. Create component in appropriate feature folder
2. Add styles in corresponding `.scss` file
3. Use custom hooks for state management
4. Export from feature's index file
5. Import in routes or parent components

### Adding New Features

1. Create new folder in `features/`
2. Follow the structure: pages, components, services, Hooks, states, styles
3. Create Redux slice for state management
4. Add API service for backend calls
5. Add routes in `app.routes.jsx`
6. Add custom hooks if needed

### Best Practices

- Use Redux Toolkit for state management
- Keep components small and reusable
- Use custom hooks for shared logic
- Separate API calls into service files
- Use React Router for navigation
- Implement error handling and loading states
- Write responsive CSS with SCSS

---

## Deployment

### Build Optimization

```bash
npm run build
```

The build creates optimized production files in the `dist/` folder.

### Deployment Platforms

- **Vercel** - Recommended for React/Vite apps
- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Free static hosting
- **AWS Amplify** - Full-stack AWS deployment

### Environment Setup

Update `.env` for production:

```env
VITE_API_URL=https://your-backend-url.com
VITE_API_BASE_PATH=/api
VITE_ENV=production
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
```

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

### Netlify Deployment

1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy

---

## Troubleshooting

### Issue: CORS errors when calling API

**Solution:** Ensure backend is running and CORS is properly configured. Check vite.config.js proxy settings.

### Issue: Google OAuth not working

**Solution:** Verify Google Client ID in .env. Check Google Console OAuth configuration matches your domain.

### Issue: Token expiration/authentication errors

**Solution:** Clear browser localStorage and cookies. Log in again to get fresh token.

### Issue: Page not loading

**Solution:** Check browser console for errors. Verify backend API is running. Check network tab for failed requests.

### Issue: Styles not applying

**Solution:** Ensure SCSS is properly imported. Clear browser cache and rebuild with `npm run build`.

---

## Performance Optimization

- **Code Splitting** - React Router lazy loading for routes
- **Image Optimization** - Use appropriate image formats and sizes
- **Caching** - API responses cached with Redux
- **Bundle Analysis** - Monitor build size
- **Lazy Loading** - Components loaded on demand

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Run ESLint: `npm run lint`
4. Test thoroughly
5. Commit with clear messages
6. Push to remote
7. Create Pull Request

---

## License

MIT License - See LICENSE file for details

---

## Support & Resources

- **Backend Documentation** - See Backend README.md
- **API Documentation** - See Backend API section
- **React Documentation** - https://react.dev
- **Vite Documentation** - https://vitejs.dev
- **Redux Documentation** - https://redux-toolkit.js.org
- **React Router** - https://reactrouter.com

---

## Team

Developed as part of the Luxelayer e-commerce platform

**Frontend Tech Lead**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## Changelog

### Version 1.0.0 (Current)

- Initial release
- User authentication with Google OAuth
- Product browsing and search
- Shopping cart functionality
- Wishlist feature
- User account management
- Seller dashboard
- Product upload for sellers
- Address management

---

Last Updated: April 2026
