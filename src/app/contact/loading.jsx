import React from "react";

const ContactLoading = () => {
  return (
    <div className="container mx-auto min-h-screen px-4 py-16 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-16 space-y-4">
        <div className="h-12 bg-cyan-100 rounded-lg w-1/3 mx-auto"></div>
        <div className="h-6 bg-gray-100 rounded-md w-1/2 mx-auto"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 overflow-hidden">
        {/* Contact Info Skeleton */}
        <div className="w-full lg:w-1/3 space-y-8 bg-cyan-50 rounded-2xl p-8">
          <div className="space-y-4">
            <div className="h-8 bg-cyan-200 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-cyan-100 rounded w-5/6"></div>
            <div className="h-4 bg-cyan-100 rounded w-4/5"></div>
          </div>
          
          <div className="space-y-6 pt-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-200 rounded-full flex-shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-cyan-100 rounded w-1/2"></div>
                  <div className="h-3 bg-cyan-100 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="w-full lg:w-2/3 p-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-1/6"></div>
              <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-1/6"></div>
              <div className="h-32 bg-gray-50 rounded-xl border border-gray-100"></div>
            </div>
            
            <div className="h-14 bg-cyan-200 rounded-xl w-48 mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLoading;
