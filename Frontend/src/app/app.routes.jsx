import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import LendingPage from "../features/auth/pages/LendingPage";
import Dashboard from "../features/dashboard/pages/Dashboard";
import VerifyPage from "../features/auth/pages/VerifyPage";
import Protected from "../features/auth/components/Protected";
import AccountPage from "../features/dashboard/pages/AccountPage";
import SellerBusinessPage from "../features/dashboard/pages/SellerBusinessPage";
import SellerCreateProductPage from "../features/dashboard/pages/SellerCreateProductPage";
import ProductVeiw from "../features/dashboard/pages/ProductVeiw";
import WishlistPage from "../features/dashboard/pages/WishlistPage";
import ShopPage from "../features/dashboard/pages/ShopPage";
import CartPage from "../features/dashboard/pages/CartPage";
import SellerProtected from "../features/auth/components/SellerProtected";
import NotFoundPage from "../features/404 page/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <LendingPage />,
  },

  {
    path: "/verify-email",
    element: <VerifyPage />,
  },

  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/shop",
    element: (
      <Protected>
        <ShopPage />
      </Protected>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <Protected>
        <ProductVeiw />
      </Protected>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <Protected>
        <WishlistPage />
      </Protected>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },

  {
    path: "/account",
    element: (
      <Protected>
        <AccountPage />
      </Protected>
    ),
  },
  {
    path: "/seller-account",
    element: (
      <SellerProtected>
        <SellerBusinessPage />
      </SellerProtected>
    ),
  },
  {
    path: "/create-product-page",
    element: (
      <SellerProtected>
        <SellerCreateProductPage />
      </SellerProtected>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
