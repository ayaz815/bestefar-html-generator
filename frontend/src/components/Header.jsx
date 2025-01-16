/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Title */}
        <h1 className="text-xl font-semibold tracking-wide">Quiz Builder</h1>

        {/* Menu Icon */}
        <button
          className={`block focus:outline-none transition-transform duration-300 ${
            isMenuOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
          </svg>
        </button>

        {/* Pop-up Menu */}
        {isMenuOpen && (
          <div
            className="absolute top-16 right-6 bg-white text-gray-800 shadow-lg rounded-lg w-40 p-4 transition-transform transform translate-y-0 opacity-100"
            style={{ animation: "slideDown 0.3s ease-out" }}
          >
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href="#"
                  className="block text-sm font-medium px-2 py-1 rounded-md hover:bg-indigo-500 hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="block text-sm font-medium px-2 py-1 rounded-md hover:bg-indigo-500 hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-sm font-medium px-2 py-1 rounded-md hover:bg-indigo-500 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Keyframe Animation for Smooth Pop-up (from Top) */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
