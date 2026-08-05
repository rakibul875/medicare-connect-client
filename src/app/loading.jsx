import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-cyan-500 border-b-blue-600 animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

        <div
          className="absolute w-16 h-16 rounded-full border-4 border-transparent border-l-cyan-400 border-r-blue-500 opacity-80"
          style={{ animation: "spin 1.5s linear infinite reverse" }}
        ></div>

        <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 animate-pulse">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center animate-pulse">
        <h2 className="text-xl font-extrabold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
          MEDICARE
        </h2>
        <p className="text-sm font-medium text-slate-500 tracking-widest mt-1">
          CONNECT
        </p>
      </div>
    </div>
  );
};

export default Loading;
