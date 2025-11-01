import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaHeart } from 'react-icons/fa';

function Footer() {
    return (
        <>
            <footer className="bg-gradient-to-br from-[#8C162C] to-[#BF046B] text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#18D9D9] rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#D99962] rounded-full translate-x-24 translate-y-24"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#F21BB9] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                    {/* Main Content */}
                    <div className="text-center">
                        {/* Logo Section */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <img 
                                    src="/img/footerlogo.png" 
                                    alt="kalyan 787 Logo" 
                                    className="w-24 h-24 rounded-2xl border-4 border-[#18D9D9] shadow-2xl transform hover:scale-105 transition-all duration-300" 
                                />
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#18D9D9] to-[#D99962] rounded-2xl blur-sm opacity-50 -z-10"></div>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="mb-8 flex justify-center space-x-6">
                            <a 
                                href="https://facebook.com" 
                                className="bg-black bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transform hover:scale-110 transition-all duration-300 hover:shadow-lg border border-white border-opacity-20"
                            >
                                <span className="sr-only">Facebook</span>
                                <FaFacebook size={22} className="text-white" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                className="bg-black bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transform hover:scale-110 transition-all duration-300 hover:shadow-lg border border-white border-opacity-20"
                            >
                                <span className="sr-only">Instagram</span>
                                <FaInstagram size={22} className="text-white" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                className="bg-black bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transform hover:scale-110 transition-all duration-300 hover:shadow-lg border border-white border-opacity-20"
                            >
                                <span className="sr-only">Twitter</span>
                                <FaTwitter size={22} className="text-white" />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                className="bg-black bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transform hover:scale-110 transition-all duration-300 hover:shadow-lg border border-white border-opacity-20"
                            >
                                <span className="sr-only">YouTube</span>
                                <FaYoutube size={22} className="text-white" />
                            </a>
                        </div>

                        {/* Age Restriction */}
                        <div className="mb-8 flex justify-center">
                            <div className="bg-gradient-to-r from-[#18D9D9] to-[#D99962] p-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                                <img src="/img/18plus.svg" alt="18+" className="h-10 w-auto" />
                            </div>
                        </div>

                        {/* Warning Text */}
                        <p className="mb-8 text-lg font-semibold bg-black bg-opacity-10 p-4 rounded-xl max-w-2xl mx-auto backdrop-blur-sm border border-white border-opacity-20">
                            Players need to be 18+ in order to register. Underage gambling is prohibited.
                        </p>

                        {/* Responsible Gambling */}
                        <div className="mb-8 flex justify-center space-x-8 flex-wrap gap-4">
                            <a 
                                href="https://www.begambleaware.org" 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-black bg-opacity-10 p-4 rounded-xl hover:bg-opacity-20 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20"
                            >
                                <img src="/img/gambleaware.svg" alt="BeGambleAware Logo" className="h-12 w-auto" />
                            </a>
                            <a 
                                href="https://www.gamblingtherapy.org" 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-black bg-opacity-10 p-4 rounded-xl hover:bg-opacity-20 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20"
                            >
                                <img src="/img/gamblingtherapy.svg" alt="Gambling Therapy Logo" className="h-12 w-auto" />
                            </a>
                        </div>

                        {/* Address */}
                        <p className="mb-6 text-xl font-bold bg-gradient-to-r from-[#18D9D9] to-[#D99962] bg-clip-text text-transparent">
                            Cambridge CB2 1TN, United Kingdom
                        </p>

                        {/* Company Info */}
                        <div className="mb-8 bg-black bg-opacity-5 p-6 rounded-2xl max-w-4xl mx-auto backdrop-blur-sm border border-white border-opacity-10">
                            <p className="text-base leading-relaxed">
                                Our website is operated by Madhur567 International B.V., a company established under the laws of United Kingdom, with registered address at #506 IT Park Towers Cambridge CB2 1TN, United Kingdom, and having its gaming sublicence issued, by United Kingdom e-Gaming and all rights to operate the gaming software worldwide.
                            </p>
                        </div>

                        {/* Copyright */}
                        <div className="flex flex-col items-center space-y-2">
                            <p className="text-lg font-semibold flex items-center space-x-2">
                                <span>Copyright Madhur567 | All rights reserved</span>
                                <FaHeart className="text-[#F21BB9] animate-pulse" size={16} />
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#18D9D9] to-[#D99962] rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Gradient Border */}
                <div className="h-1 bg-gradient-to-r from-[#18D9D9] via-[#F21BB9] to-[#D99962]"></div>
            </footer>
        </>
    );
}

export default Footer;