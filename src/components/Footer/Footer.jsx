import React from 'react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className=" bg-secondary text-base-content py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          
          {/* Logo + Name */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />


            <p className="text-sm opacity-70 max-w-xs mt-1">
              The best platform for hosting and managing all types of contests.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="font-semibold text-lg">Follow us</p>
            
            <div className="flex items-center gap-5 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-base-300 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-70">
          Copyright © 2025 <span className="font-semibold">ContestHub</span>  
          — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
