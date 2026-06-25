"use client";
import React from "react";

const DoctorTable = ({initialDoctors}) => {

const handleApprove=(id)=>{
    alert('button Click',id)
}
const handleReject=(id)=>{
    alert('button Click',id)
}

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="py-4 px-6">Doctor Info</th>
              <th className="py-4 px-6">Specialization</th>
              <th className="py-4 px-6">Hospital & Fee</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 text-sm">
            {initialDoctors.map((doctor) => {
              const status = doctor.verificationStatus?.toLowerCase();

              return (
                <tr
                  key={doctor._id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  {/* ডক্টর ইনফো */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          doctor.profileImage ||
                          "https://via.placeholder.com/150"
                        }
                        alt={doctor.doctorName}
                        className="w-11 h-11 rounded-full object-cover border border-gray-100"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm leading-tight">
                          {doctor.doctorName}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                          Exp: {doctor.experience} Years |{" "}
                          {doctor.qualifications?.slice(0, 20)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* স্পেশালাইজেশন */}
                  <td className="py-4 px-6 font-semibold text-gray-600">
                    {doctor.specialization}
                  </td>

                  {/* হসপিটাল ও ভিজিট ফি */}
                  <td className="py-4 px-6">
                    <p className="text-gray-700 font-medium text-xs">
                      {doctor.hospitalName}
                    </p>
                    <p className="text-[#006694] font-bold text-xs mt-0.5">
                      ${doctor.consultationFee}
                    </p>
                  </td>

                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block ${
                        status === "approved"
                          ? "bg-green-50 text-green-600 border border-green-100"
                          : status === "pending"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                      }`}
                    >
                      {doctor.verificationStatus}
                    </span>
                  </td>

                  {/* 🎯 আপনার রিকোয়ারমেন্ট অনুযায়ী পিওর বাটন অ্যাকশন (ক্লিক করলে শুধু _id পাস হবে) */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApprove(doctor._id)}
                        className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(doctor._id)}
                        className="bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {initialDoctors.length === 0 && (
        <div className="text-center py-12 text-gray-400 font-semibold text-sm">
          No doctor data found.
        </div>
      )}
    </div>
  );
};

export default DoctorTable;
