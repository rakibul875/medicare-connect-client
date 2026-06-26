import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto mt-20 mb-10 px-4 min-h-screen">
      <div className="bg-[#f4f8fa] rounded-2xl p-10 md:p-20">       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl p-5 shadow-sm animate-pulse"
            >
              <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>

              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;