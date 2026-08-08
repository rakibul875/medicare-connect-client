import React from "react";

const DashboardLoading = () => {
  return (
    <div className="p-8 w-full animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 bg-gray-200 rounded-md w-48 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded-md w-32"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-cyan-50 rounded-xl"></div>
              <div className="h-4 w-16 bg-gray-100 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded-md w-3/4"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="h-6 bg-gray-200 rounded-md w-48 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-100 rounded w-24"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-100 rounded-full w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
