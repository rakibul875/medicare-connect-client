import React from "react";

const FindDoctorsLoading = () => {
  return (
    <div className="container mx-auto min-h-screen px-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="mx-10 my-5 space-y-3">
        <div className="h-10 bg-cyan-100 rounded-md w-1/3"></div>
        <div className="h-6 bg-slate-100 rounded-md w-1/2"></div>
        <div className="h-6 bg-slate-100 rounded-md w-2/5"></div>
      </div>

      {/* Search Form Skeleton */}
      <div className="mx-10 my-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-12 bg-gray-100 rounded-lg flex-1"></div>
          <div className="h-12 bg-gray-100 rounded-lg flex-1"></div>
          <div className="h-12 w-full md:w-32 bg-cyan-100 rounded-lg"></div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 mx-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center"
          >
            {/* Image Skeleton */}
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
            
            {/* Content Skeleton */}
            <div className="w-3/4 h-5 bg-gray-200 rounded-md mb-3"></div>
            <div className="w-1/2 h-4 bg-gray-100 rounded-md mb-5"></div>
            
            {/* Details Skeleton */}
            <div className="w-full space-y-2 mb-6">
              <div className="w-full h-3 bg-gray-100 rounded"></div>
              <div className="w-5/6 h-3 bg-gray-100 rounded"></div>
            </div>
            
            {/* Button Skeleton */}
            <div className="w-full h-10 bg-cyan-50 rounded-lg mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDoctorsLoading;
