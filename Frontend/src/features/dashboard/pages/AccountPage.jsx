import React, { useState } from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Bell,
  BriefcaseBusiness,
} from "lucide-react";
import "../styles/AccountPage.scss";

// Component Imports
import PersonalDetail from "../components/account_page_comp/PersonalDetail";
import OrdersDetail from "../components/account_page_comp/OrdersDetail";
import AddressDetail from "../components/account_page_comp/AddressDetail";
import PaymentDetail from "../components/account_page_comp/PaymentDetail";
import SecurityDetail from "../components/account_page_comp/SecurityDetail";
import CreateBusinessAccount from "../components/account_page_comp/CreateBusinessAccount";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/Hooks/useAuth";
import Footer from "../components/Footer"

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { logoutUser } = useAuth();

  const navigate = useNavigate();

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: <User size={18} /> },
    { id: "orders", label: "My Orders", icon: <Package size={18} /> },
    { id: "address", label: "Manage Address", icon: <MapPin size={18} /> },
    { id: "payment", label: "Payment Method", icon: <CreditCard size={18} /> },
    {
      id: "account",
      label: "Create Business Account",
      icon: <BriefcaseBusiness size={18} />,
    },
    {
      id: "security",
      label: "Password Manager",
      icon: <ShieldCheck size={18} />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetail />;
      case "orders":
        return <OrdersDetail />;
      case "address":
        return <AddressDetail />;
      case "payment":
        return <PaymentDetail />;
      case "security":
        return <SecurityDetail />;
      case "account":
        return <CreateBusinessAccount />;
      default:
        return null;
    }
  };

  return (
   <>
    <div className="account-page">
      {/* Premium Navbar */}
      <nav className="account-navbar">
        <div className="nav-inner">
          <div className="mobile-toggle" onClick={() => setIsDrawerOpen(true)}>
            <Menu size={22} />
          </div>
          <div className="logo">LUXELAYER</div>
          <div className="nav-actions">
            <Bell size={18} className="nav-icon" />
            <span className="divider"></span>
            <span
              className="back-link"
              onClick={() => {
                navigate("/shop");
              }}
            >
              Return to Shop
            </span>
          </div>
        </div>
      </nav>

      <div className="page-main-container">
        {/* Editorial Header */}
        <header className="account-header">
          <h1>My Account</h1>
          <p>
            Welcome back,{" "}
            <strong>
              {user.FirstName} {user.Lastname}
            </strong>
            . Manage your settings and orders below.
          </p>
        </header>

        <div className="account-layout">
          {/* Mobile Overlay */}
          <div
            className={`sidebar-overlay ${isDrawerOpen ? "open" : ""}`}
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          {/* Sidebar */}
          <aside
            className={`account-sidebar ${isDrawerOpen ? "drawer-open" : ""}`}
          >
            <div className="drawer-header mobile-only">
              <h3>Navigation</h3>
              <X size={20} onClick={() => setIsDrawerOpen(false)} />
            </div>

            <div className="user-profile-summary">
              <div className="avatar-container">
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt={`${user.FirstName} Profile`}
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-initials">
                    {user.FirstName?.charAt(0)}
                    {user.Lastname?.charAt(0)}
                  </div>
                )}
                {user.isVerified && <span className="verified-badge">✦</span>}
              </div>
              <div className="user-meta">
                <h4>
                  {user.FirstName} {user.Lastname}
                </h4>
                <span className="membership-tag">Platinum Member</span>
              </div>
            </div>

            <ul className="sidebar-menu">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={activeTab === item.id ? "active" : ""}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsDrawerOpen(false);
                  }}
                >
                  <span className="icon-box">{item.icon}</span>
                  <span className="label">{item.label}</span>
                  <ChevronRight className="arrow" size={14} />
                </li>
              ))}
              <li
                className="logout"
                onClick={() => {
                  logoutUser();
                }}
              >
                <span className="icon-box">
                  <LogOut size={18} />
                </span>
                <span className="label">Logout</span>
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="account-content">
            <div className="content-card">{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default AccountPage;
