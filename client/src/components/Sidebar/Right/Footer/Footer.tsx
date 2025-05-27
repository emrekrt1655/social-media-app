import "./Footer.scss";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-text">&copy; 2025 MyApp. All rights reserved.</p>
      <div className="social-media">
        <span>Follow us on:</span>
        <div className="icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
