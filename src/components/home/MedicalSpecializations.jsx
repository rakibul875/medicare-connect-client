import React from "react";
import Link from "next/link";

const MedicalSpecializations = () => {
  
  const specializations = [
    {
      name: "Cardiology",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m-2-2h4"
          />
        </svg>
      ),
    },
    {
      name: "Neurology",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 0-2.133-1A3.75 3.75 0 0 0 3 7.5A3.75 3.75 0 0 0 6 13.8a3.75 3.75 0 0 0 6 4.2Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 0 1-.495-7.467 5.99 5.99 0 0 1 1.925-3.546 5.974 5.974 0 0 1 2.133-1A3.75 3.75 0 0 1 21 7.5a3.75 3.75 0 0 1-3 6.3a3.75 3.75 0 0 1-6 4.2Z"
          />
        </svg>
      ),
    },
    {
      name: "Orthopedics",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M4.5 3v18M19.5 3v18"
          />
        </svg>
      ),
    },
    {
      name: "Pediatrics",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm6 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z"
          />
        </svg>
      ),
    },
    {
      name: "Dermatology",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21a4.5 4.5 0 0 1-4.5-4.5M21 16.5a4.5 4.5 0 0 1-4.5 4.5m0-18A4.5 4.5 0 0 1 21 7.5M3 7.5A4.5 4.5 0 0 1 7.5 3M12 7.5h.008v.008H12V7.5ZM12 12h.008v.008H12V12Zm0 4.5h.008v.008H12v-.008Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
   
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#006694] tracking-tight">
            Medical Specializations
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Find experts across all medical disciplines
          </p>
        </div>

      
        <Link
          href="/specializations"
          className="inline-flex items-center space-x-1 text-sm font-bold text-[#006694] hover:text-[#00557c] transition-colors group self-start sm:self-center"
        >
          <span>View All</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {specializations.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-200 rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
       
            <div className="bg-[#006694]/5 text-[#006694] p-4 rounded-2xl mb-4 group-hover:bg-[#006694] group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>

            <span className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-[#006694] transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MedicalSpecializations;
