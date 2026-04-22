import React from "react";
// Ri = Remix Icons, Fa = FontAwesome, Hi = HeroIcons
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterXLine,
  RiYoutubeLine,
  RiArrowRightLine,
} from "react-icons/ri";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import "../styles/Footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND & NEWSLETTER */}
        <div className="footer-top">
          <div className="footer-brand-area">
            <h2 className="footer-logo">
              LuxeLayer<span>.</span>
            </h2>
            <p className="brand-desc">
              Redefining modern luxury through curated essentials and timeless
              couture. Designed for those who appreciate the finer details.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <RiInstagramLine />
              </a>
              <a href="#" aria-label="Facebook">
                <RiFacebookCircleLine />
              </a>
              <a href="#" aria-label="Twitter">
                <RiTwitterXLine />
              </a>
              <a href="#" aria-label="Youtube">
                <RiYoutubeLine />
              </a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h3>Subscribe to Luxe</h3>
            <p>Get early access to drops and exclusive style insights.</p>
            <div className="subscribe-box">
              <input type="email" placeholder="Email Address" />
              <button>
                <RiArrowRightLine />
              </button>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* LINKS GRID */}
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Boutique</h4>
            <ul>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Best Sellers</a>
              </li>
              <li>
                <a href="#">Men's Collection</a>
              </li>
              <li>
                <a href="#">Women's Collection</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Assistance</h4>
            <ul>
              <li>
                <a href="#">Order Tracking</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
              <li>
                <a href="#">Easy Returns</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">Our Heritage</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Affiliates</a>
              </li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4>Concierge</h4>
            <ul>
              <li>
                <HiOutlineLocationMarker className="contact-icon" />{" "}
                <span>Heritage Square, DLF Phase 5, Gurgaon</span>
              </li>
              <li>
                <HiOutlinePhone className="contact-icon" />{" "}
                <span>+91 124 456 7890</span>
              </li>
              <li>
                <HiOutlineMail className="contact-icon" />{" "}
                <span>care@luxelayer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} LuxeLayer Design. Crafted for Excellence.</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <span className="currency">India | INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
