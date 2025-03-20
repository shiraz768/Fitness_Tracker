import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Website_Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // This function will close the menu on mobile when a link is clicked
  const handleNavLinkClick = () => setMenuOpen(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-black text-white">
        <div className="container mx-auto px-14 py-3 flex flex-col sm:flex-row items-center justify-between">
          {/* Logo Section */}
          <div className="navLogo flex justify-center items-center">
            {/* <img src="./logo.jpg" alt="" height={40} width={40} /> */}
            <span className="text-3xl font-bold text-blue-500">𝓕</span>
            <p className="italic ml-2">
              it <span className="font-bold text-xl text-blue-500">Tracker</span>
            </p>
          </div>

          <button
            onClick={toggleMenu}
            className="sm:hidden flex items-center text-white mt-3 sm:mt-0"
            aria-label="Toggle Navigation Menu"
          >
            <span>&#9776;</span>
          </button>

          <div className={`navItems ${menuOpen ? "block" : "hidden"} sm:block`}>
            <ul className="flex flex-col items-center justify-center w-full text-center sm:flex-row sm:space-y-0 sm:ml-auto space-y-4 sm:space-x-6">
              <li>
                <NavLink
                  to="/"
                  onClick={handleNavLinkClick}
                  className="rounded hover:bg-blue-500 py-5 px-2"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={handleNavLinkClick}
                  className="rounded hover:bg-blue-500 py-5 px-2"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  onClick={handleNavLinkClick}
                  className="rounded hover:bg-blue-500 py-5 px-2"
                >
                  Reviews
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feedback"
                  onClick={handleNavLinkClick}
                  className="rounded hover:bg-blue-500 py-5 px-2"
                >
                  Feedback
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={handleNavLinkClick}
                  className="rounded bg-blue-500 py-3 px-5"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Website_Navbar;
