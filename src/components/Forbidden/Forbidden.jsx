import React from "react";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-600/20 rounded-full">
            <FiLock className="text-red-500" size={80} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-3">
          403 Forbidden
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg max-w-lg mx-auto mb-8">
          You don't have permission to access this page.  
          Please contact the administrator if you believe this is a mistake.
        </p>

        {/* Back Home Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-red-700/40"
        >
          ⟵ Go Back Home
        </Link>

        {/* Optional: Contact Button */}
        <div className="mt-4">
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
