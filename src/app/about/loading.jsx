import React from "react";

const AboutLoading = () => {
  return (
    <div className="container mx-auto min-h-screen px-4 py-16 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-16 space-y-4">
        <div className="h-12 bg-cyan-100 rounded-lg w-1/2 md:w-1/3 mx-auto"></div>
        <div className="h-6 bg-gray-100 rounded-md w-3/4 md:w-1/2 mx-auto"></div>
        <div className="h-6 bg-gray-100 rounded-md w-2/3 md:w-2/5 mx-auto"></div>
      </div>

      {/* Content Section Skeleton */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
        {/* Image Skeleton */}
        <div className="w-full md:w-1/2">
          <div className="aspect-video bg-gray-200 rounded-3xl shadow-sm"></div>
        </div>
        
        {/* Text Skeleton */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="h-8 bg-cyan-50 rounded-md w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="h-20 bg-gray-50 rounded-2xl border border-gray-100"></div>
            <div className="h-20 bg-gray-50 rounded-2xl border border-gray-100"></div>
          </div>
        </div>
      </div>
      
      {/* Values/Team Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 text-center">
            <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-full mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutLoading;
