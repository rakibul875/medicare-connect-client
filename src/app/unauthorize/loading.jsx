import React from "react";

const UnauthorizeLoading = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-pulse">
      <div className="bg-white rounded-3xl shadow-sm border border-red-50 w-full max-w-lg p-10 text-center">
        {/* Animated icon skeleton */}
        <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 relative">
          <div className="w-12 h-12 bg-red-100 rounded-full"></div>
        </div>
        
        {/* Text Skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-8 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-100 rounded-md w-3/4 mx-auto"></div>
        </div>

        {/* Action Button Skeleton */}
        <div className="h-12 bg-gray-100 rounded-xl w-40 mx-auto"></div>
      </div>
    </div>
  );
};

export default UnauthorizeLoading;
