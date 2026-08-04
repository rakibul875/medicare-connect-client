import React from "react";

const AuthLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 animate-pulse">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-cyan-100 rounded-2xl rotate-3"></div>
        </div>

      
        <div className="space-y-3 text-center mb-8">
          <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-100 rounded-md w-1/2 mx-auto"></div>
        </div>

       
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-4 bg-cyan-50 rounded w-1/4"></div>
          </div>

        
          <div className="h-12 bg-cyan-200 rounded-xl w-full mt-6"></div>
        </div>

     
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-8"></div>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-12 bg-gray-50 rounded-xl w-full border border-gray-100"></div>
            <div className="h-12 bg-gray-50 rounded-xl w-full border border-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
