import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-6 text-center">
      
      {/* Animated 404 */}
      <h1 className="text-8xl font-extrabold text-primary drop-shadow-lg animate-bounce">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="max-w-md mt-3 opacity-70">
        Oops! The page you're looking for doesn’t exist or may have been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="btn btn-primary mt-6 px-8 shadow-lg hover:scale-105 transition-all"
      >
        Go Back Home
      </Link>

      {/* Decorative Element */}
      <div className="mt-10 opacity-40 text-sm">
        Error Code: <span className="font-semibold">404</span>
      </div>
    </div>
  );
};

export default NotFound;
