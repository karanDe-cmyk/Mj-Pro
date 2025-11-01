import React from 'react';
import { FaCrown, FaGlobe, FaUsers, FaAward, FaChartLine, FaLock, FaUserShield } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen pt-24 pb-16 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#18D9D9] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[#F21BB9] rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-[#D99962] rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-[#8C162C] rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <FaCrown className="text-5xl text-[#D99962] mr-4" />
              <div className="absolute -inset-4 bg-[#D99962] rounded-full opacity-20 blur-lg"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#F21BB9] via-[#18D9D9] to-[#D99962] bg-clip-text text-transparent">
              About Us
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#18D9D9] to-[#F21BB9] mx-auto rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl border border-gray-600 p-8 mb-12">
          {/* Company Info */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-gradient-to-r from-[#8C162C] to-[#BF046B] px-6 py-3 rounded-full mb-6">
              <FaLock className="text-white mr-3" />
              <p className="text-white font-semibold text-sm">
                Licensed & Regulated Platform
              </p>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed italic mb-8 max-w-4xl mx-auto">
              King is operated by S S international, a company incorporated under the laws of United Kingdom and regulated by the UK authority as the regulatory body responsible holding a (Sub-license with License number 392/JAZ Sub-License GLH-OCCHKTV0707086017 granted on 21.08.2020).
            </p>
          </div>

          {/* Stats Highlight */}
          <div className="bg-gradient-to-r from-[#18D9D9] to-[#D99962] rounded-xl p-6 text-center mb-10 transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <FaUsers className="text-gray-900 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                30+ Years of Excellence
              </h2>
            </div>
            <p className="text-gray-900 text-lg font-semibold">
              Serving more than 1.38 lac + trusted members worldwide
            </p>
          </div>

          {/* Company Story */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 border border-gray-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#F21BB9] to-[#BF046B] rounded-lg flex items-center justify-center mr-4">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">Global Presence</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We have proudly taken our culture from offline to online business and now stand as India's most trusted betting platform. King is an international betting platform with presence in more than 18 countries.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 border border-gray-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#18D9D9] to-[#8C162C] rounded-lg flex items-center justify-center mr-4">
                  <FaAward className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white">Customer Commitment</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We truly value our customers and our endeavor is to provide best customer service and enable our customers to play online games with ease, security, and confidence.
              </p>
            </div>
          </div>

          {/* Security Warning */}
          <div className="bg-gradient-to-r from-[#BF046B] to-[#F21BB9] rounded-xl p-6 border border-[#F21BB9] transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <FaUserShield className="text-white text-xl mr-3" />
              <h3 className="text-xl font-bold text-white text-center">
                Security Advisory
              </h3>
            </div>
            <p className="text-white text-center font-semibold text-lg">
              Players are requested not to contact any untrusted sources for King accounts.
            </p>
            <p className="text-white text-center text-sm mt-2 opacity-90">
              Always use official channels for account creation and support.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 text-center border border-gray-600 hover:border-[#18D9D9] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#18D9D9] to-[#8C162C] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-bold mb-2">Secure & Licensed</h4>
            <p className="text-gray-300 text-sm">
              Fully licensed and regulated under UK gaming authorities
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 text-center border border-gray-600 hover:border-[#F21BB9] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#F21BB9] to-[#D99962] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartLine className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-bold mb-2">30+ Years Experience</h4>
            <p className="text-gray-300 text-sm">
              Decades of trusted service in the gaming industry
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 text-center border border-gray-600 hover:border-[#D99962] transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-[#D99962] to-[#18D9D9] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlobe className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-bold mb-2">Global Reach</h4>
            <p className="text-gray-300 text-sm">
              Serving customers across 18+ countries worldwide
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4 rounded-2xl border border-gray-500">
            <FaCrown className="text-[#D99962] text-2xl mr-3" />
            <div>
              <p className="text-white font-semibold">Trusted Since 1994</p>
              <p className="text-gray-400 text-sm">30 Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;