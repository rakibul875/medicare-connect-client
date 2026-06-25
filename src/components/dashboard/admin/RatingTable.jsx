'use client'

import React from "react";
import { Star, Award, MessageSquare, Building } from "lucide-react";

const RatingTable = ({ ratingBase }) => {
  if (!ratingBase || ratingBase.length === 0) {
    return (
      <div className="w-full bg-white border border-slate-100 p-8 rounded-[2rem] text-center text-sm font-bold text-slate-400">
        No doctor rating data found.
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h3 className="text-base font-black text-slate-900 tracking-tight">
          Doctor Leaderboard & Feedback Ratings
        </h3>
        <p className="text-xs font-medium text-slate-400">
          Overview of average physician evaluations based on patient
          satisfaction loops.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/30 text-[11px] font-black text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Doctor Info</th>
              <th className="py-4 px-6">Specialization</th>
              <th className="py-4 px-6">Hospital Facility</th>
              <th className="py-4 px-6 text-center">Total Reviews</th>
              <th className="py-4 px-6 text-right">Avg Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs sm:text-sm font-bold text-slate-700">
            {ratingBase.map((doctor) => (
              <tr
                key={doctor.doctorId}
                className="hover:bg-slate-50/60 transition-colors duration-150"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={doctor.profileImage}
                      alt={doctor.doctorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-100 bg-slate-100 flex-shrink-0"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150";
                      }}
                    />
                    <div>
                      <span className="block font-black text-slate-900 leading-snug">
                        {doctor.doctorName}
                      </span>
                      <span className="block text-[10px] font-medium text-slate-400 font-mono">
                        ID: {doctor.doctorId.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 bg-sky-50 text-[#006694] px-2.5 py-1 rounded-lg text-[11px] font-extrabold tracking-wide">
                    <Award className="w-3.5 h-3.5" />
                    {doctor.specialization}
                  </span>
                </td>

                <td className="py-4 px-6 text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{doctor.hospitalName}</span>
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                    <MessageSquare className="w-3 h-3" />
                    <span>{doctor.totalReviews}</span>
                  </div>
                </td>

                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span className="font-black text-slate-900 text-sm">
                      {doctor.averageRating.toFixed(1)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingTable;
