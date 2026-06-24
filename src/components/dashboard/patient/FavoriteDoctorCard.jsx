"use client";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";

const FavoriteDoctorCard = ({ favoriteDoctor }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteDoctor && favoriteDoctor.length > 0 ? (
        favoriteDoctor.map((doctor) => {
          return (
            <div
              key={doctor._id}
              className="bg-white rounded-[1.5rem] border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative group"
            >
              <button
                className="absolute top-4 right-4 bg-red-50 hover:bg-red-100 text-red-500 p-2.5 rounded-full transition-all cursor-pointer shadow-sm active:scale-90"
                title="Remove from favorites"
              >
                <FaHeart size={16} />
              </button>

              <div className="w-24 h-24 mb-4 mt-2 relative">
                <img
                  src={doctor.doctorImage || "https://via.placeholder.com/150"}
                  alt="Doctor"
                  className="w-full h-full rounded-full object-cover border-4 border-sky-50 shadow-inner group-hover:scale-105 transition-transform duration-200"
                />

                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              <div className="w-full border-b border-gray-50 pb-4 mb-3">
                <h3 className="text-base font-extrabold text-gray-800 tracking-tight">
                  Specialist Doctor
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">
                  ID: #{doctor.doctorId?.slice(-6)}
                </p>
              </div>

              <div className="w-full flex gap-2.5 mt-auto">
                <Link href={`/find-doctors`} className="flex-1 bg-[#006694] hover:bg-[#00557c] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all active:scale-95 cursor-pointer">
                  Book Appointment
                </Link>
              </div>
            </div>
          );
        })
      ) : (
     
        <div className="col-span-full text-center py-16 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-red-50 rounded-full text-red-400 animate-pulse">
              <FaHeart size={28} />
            </div>
          </div>
          <p className="text-gray-400 font-semibold text-sm">
            No favorite doctors added yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoriteDoctorCard;
