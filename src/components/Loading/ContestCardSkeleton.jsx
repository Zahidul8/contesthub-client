import React from "react";

const ContestCardSkeleton = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-pulse">
      
      {/* Image Placeholder */}
      <div className="relative h-52 bg-gray-300 rounded-t-3xl" />

      <div className="p-5 space-y-3">
        {/* Title Placeholder */}
        <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>

        {/* Participants Placeholder */}
        <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>

        {/* Description Placeholder */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-300 rounded-md"></div>
          <div className="h-3 w-full bg-gray-300 rounded-md"></div>
          <div className="h-3 w-5/6 bg-gray-300 rounded-md"></div>
        </div>

        {/* Footer Placeholder */}
        <div className="flex justify-between items-center mt-4">
          <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-24 bg-gray-300 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ContestCardSkeleton;
