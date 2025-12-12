import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#232d58] to-[#0F172A] text-gray-300 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* Logo section */}
          <div>
            <Logo />
            <p className="mt-3 text-sm opacity-80 leading-relaxed">
              ContestHub is the best platform for hosting, joining, and managing 
              all types of contests with a seamless experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 opacity-90">
              <li><a className="hover:text-primary transition" href="/aboutUs">About Us</a></li>
              <li><a className="hover:text-primary transition" href="/faq">FAQ</a></li>
              <li><a className="hover:text-primary transition" href="#">Browse Contests</a></li>
              <li><a className="hover:text-primary transition" href="#">Contact</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                support@contesthub.com
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary" />
                +880 1234-567890
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <p className="text-sm opacity-80 mb-3">Stay updated with contests & winners</p>

            <div className="flex gap-5 text-2xl">
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

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-5"></div>

        {/* Bottom Text */}
        <p className="text-center text-sm opacity-70">
          © {new Date().getFullYear()} <span className="font-semibold text-white">ContestHub</span>.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
