import React, { useState } from "react";
import logo from "../../assets/newLogo.png";
import { Link } from "react-router-dom";
import { UserData } from "../../lib/types/auth";
import { useIsMobile } from "../../utils/hooks/useIsMobile"; // adjust the path based on your structure
import "./navbar.scss";

interface NavbarProps {
  accessToken: string;
  user: UserData | null;
}

export const Navbar: React.FC<NavbarProps> = ({ accessToken, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  console.log(isMobile, isOpen);
  const handleLogout = () => {
    console.log("Logging out...");
  };

  const settings = accessToken
    ? [
        { label: "Profile", link: `/${user?.userId}/userProfile` },
        { label: "Settings", link: `/settings/${user?.userId}` },
        { label: "Topics", link: "/topics" },
        { label: "Logout", action: handleLogout },
      ]
    : [
        { label: "About", link: "/about" },
        { label: "Login", link: "/login" },
        { label: "Register", link: "/register" },
      ];

  return (
    <nav className="navbar">
      <div className="left">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="right">
        {isMobile && (
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <ul className={`menu ${isMobile ? (isOpen ? "open" : "") : "desktop"}`}>
        {settings.map((item, index) =>
          item.link ? (
            <li key={index}>
              <Link to={item.link} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ) : (
            <li key={index}>
              <button
                onClick={() => {
                  item.action?.();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
