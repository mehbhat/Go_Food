import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div>
      <nav className="bg-white relative w-full z-20 top-0 start-0 ">
        <div className="ml-[40px] max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="\images\Foodapp_logo-removebg-preview.png"
              className="ml-10 w-[120px]"
              alt="Go_Food_Logo"
            />
          </Link>

          {/* Right Side Buttons */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse justify-between">
            {isLoggedIn ? (
              <>
                {/* Cart */}
                <Link
                  to="/cart"
                  className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-200"
                >
                  Cart
                </Link>

                {/* My Profile */}
                <Link
                  to="/profile"
                  className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-200"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-200"
                >
                  Login
                </Link>

                {/* Sign Up */}
                <Link
                  to="/register"
                  className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-green-700 rounded-sm md:bg-transparent md:text-green-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {/* About */}
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors duration-200"
                >
                  About
                </Link>
              </li>

              {/* Services */}
              <li>
                <Link
                  to="/services"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors duration-200"
                >
                  Services
                </Link>
              </li>

              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
