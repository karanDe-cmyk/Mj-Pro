import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu on tab click
  };

  return (
    <nav className="bg-gradient-to-r from-[#8C162C] to-[#BF046B] fixed top-0 z-50 w-full shadow-2xl backdrop-blur-lg backdrop-filter bg-opacity-90 border-b border-[#F21BB9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="cursor-default">
                <img
                  className="block h-12 w-12 md:h-14 md:w-14 cursor-pointer rounded-lg border-2 border-[#18D9D9] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  src="/img/logo192.png"
                  alt="Madhur567"
                />
              </a>
            </div>
            <div className="ml-3">
              <span className="text-white font-bold text-lg md:text-xl bg-gradient-to-r from-[#18D9D9] to-[#D99962] bg-clip-text text-transparent">
                Madhur567
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-1">
              <a
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "howtoplay" 
                    ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                    : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B] hover:shadow-md"
                }`}
                href="/howtoplay"
                onClick={() => handleTabClick("howtoplay")}
              >
                How to Play
              </a>
              <a
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "gamerules" 
                    ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                    : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B] hover:shadow-md"
                }`}
                href="/gamerules"
                onClick={() => handleTabClick("gamerules")}
              >
                Game Rules
              </a>
              <a
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "charts" 
                    ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                    : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B] hover:shadow-md"
                }`}
                href="/charts"
                onClick={() => handleTabClick("charts")}
              >
                Charts
              </a>
              <a
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "aboutus" 
                    ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                    : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B] hover:shadow-md"
                }`}
                href="/aboutus"
                onClick={() => handleTabClick("aboutus")}
              >
                About Us
              </a>
              <a
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === "terms" 
                    ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                    : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B] hover:shadow-md"
                }`}
                href="/terms"
                onClick={() => handleTabClick("terms")}
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B] focus:outline-none focus:ring-2 focus:ring-[#18D9D9] transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gradient-to-b from-[#8C162C] to-[#BF046B] border-t border-[#F21BB9] shadow-2xl">
          <div className="px-2 pt-2 pb-4 space-y-2">
            <a
              href="/howtoplay"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "howtoplay" 
                  ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                  : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B]"
              }`}
              onClick={() => handleTabClick("howtoplay")}
            >
              How to Play
            </a>
            <a
              href="/gamerules"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "gamerules" 
                  ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                  : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B]"
              }`}
              onClick={() => handleTabClick("gamerules")}
            >
              Game Rules
            </a>
            <a
              href="/charts"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "charts" 
                  ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                  : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B]"
              }`}
              onClick={() => handleTabClick("charts")}
            >
              Charts
            </a>
            <a
              href="/aboutus"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "aboutus" 
                  ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                  : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B]"
              }`}
              onClick={() => handleTabClick("aboutus")}
            >
              About Us
            </a>
            <a
              href="/terms"
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === "terms" 
                  ? "bg-gradient-to-r from-[#18D9D9] to-[#D99962] text-white shadow-lg" 
                  : "text-white hover:bg-gradient-to-r hover:from-[#F21BB9] hover:to-[#BF046B]"
              }`}
              onClick={() => handleTabClick("terms")}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;