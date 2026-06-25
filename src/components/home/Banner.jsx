import React from "react";
import Image from "next/image";
import BannerImage from "@/assets/image/banner.jpg";
import Link from "next/link";

const Banner = ({totalAppointment,totalDoctor,averageRating,totalPatient}) => {
  // Stats Section Data Array
  const stats = [
    { value: totalDoctor, label: "Doctors" },
    { value: totalPatient, label: "Patients" },
    { value: totalAppointment, label: "Appointments" },
    { value: averageRating, label: "Rating", icon: true },
  ];

  return (
    <section className="bg-gradient-to-br from-[#f3f8fc] to-[#ffffff] min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6 z-10">
        
          <div className="inline-flex items-center space-x-2 bg-[#006694]/10 text-[#006694] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Healthcare Excellence</span>
          </div>

     
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-[#006694] block">Book Trusted Doctors</span>
            <span className="text-[#014d34] block">Anytime, Anywhere</span>
          </h1>

        
          <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
            Experience healthcare reimagined. Connect with world-class medical
            professionals through our secure, high-tech clinical platform.
          </p>

   
          <div className="flex flex-wrap gap-4 pt-2">
  
            <Link href={'/find-doctors'} className="bg-[#149ddd] hover:bg-[#1080b5] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-[#149ddd]/20 flex items-center space-x-2 transition-all group">
              <span>Find a Doctor</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:scale-110 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.642 10.642Z"
                />
              </svg>
            </Link>

      
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3.5 rounded-xl shadow-md border border-gray-100 flex items-center space-x-2 transition-all">
              <span>Book Appointment</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </button>
          </div>

          {/* Statistics Footnote Section */}
          <div className="grid grid-cols-4 gap-3 pt-6 max-w-lg">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm text-center"
              >
                <div className="text-lg sm:text-xl font-bold text-gray-900 flex items-center justify-center space-x-0.5">
                  <span>{stat.value}</span>
                  {stat.icon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-amber-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image Graphics with Float Overlay */}
        <div className="relative flex justify-center lg:justify-end w-full">
          {/* Main Wrapped Banner Frame */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-[500px] aspect-[4/3] sm:aspect-square lg:aspect-[5/4]">
            <Image
              src={BannerImage}
              alt="Healthcare Professional Team Platform"
              placeholder="blur"
              priority
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 50vw"
            />
          </div>

          {/* Secure Records Overlay Floating Badge */}
          <div className="absolute -bottom-5 left-4 sm:left-10 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center space-x-3 transition-transform hover:-translate-y-1 duration-300">
            <div className="bg-[#014d34]/10 p-2 rounded-xl text-[#014d34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 leading-none">
                Secure Records
              </h4>
              <p className="text-[10px] text-gray-500 font-medium mt-1">
                256-bit Encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
