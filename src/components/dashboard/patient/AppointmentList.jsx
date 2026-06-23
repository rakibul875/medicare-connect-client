"use client";
import React from "react";
import Cancel from "./Cancel";
import ReviewForm from "./ReviewForm";

const AppointmentList = ({ appointments }) => {
  const handleReview = (id) => {
    alert(`Open review modal for ID: ${id}`);
  };

  return (
    <div className="w-full bg-white rounded-[1.5rem] border border-gray-100 p-4 sm:p-6 shadow-sm mt-4">
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 sm:px-6">Doctor Information</th>
              <th className="py-4 px-4 sm:px-6">Date & Time</th>
              <th className="py-4 px-4 sm:px-6">Status</th>
              <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-50/40 transition-colors"
                >
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      {appointment.doctorImage && (
                        <img
                          src={appointment.doctorImage}
                          alt={appointment.doctorName}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                        />
                      )}
                      <div>
                        <span className="font-bold block text-gray-900">
                          {appointment.doctorName}
                        </span>
                        <span className="text-xs text-gray-400 font-normal">
                          ID: {appointment.doctorId.slice(-6)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-gray-600">
                    <div className="font-semibold">{appointment.date}</div>
                    <div className="text-xs text-gray-400 font-normal mt-0.5">
                      {appointment.timeSlot}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span
                      className={`inline-flex items-center text-[10px] font-extrabold px-2.5 py-1 rounded-xl uppercase border tracking-wider ${
                        appointment.AppointmentStatus === "pending"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : appointment.AppointmentStatus === "completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : appointment.AppointmentStatus === "approved"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-gray-50 text-red-500 border-gray-100"
                      }`}
                    >
                      {appointment.AppointmentStatus}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-right">
                    {appointment.AppointmentStatus === "pending" && (
                      <Cancel id={appointment._id} appointment={appointment} />
                    )}
                    {appointment.AppointmentStatus === "cancelled" && (
                      <p className="text-red-300 text-sm ">cancelled</p>
                    )}
                    {appointment.AppointmentStatus === "approved" && (
                      <p className="text-emerald-600 text-sm ">
                        withing for prescription
                      </p>
                    )}

                    {appointment.AppointmentStatus === "confirmed" && (
                      <div className="flex mr-0 px-0">
                        <button className="bg-[#006694]/10 text-[#006694] hover:bg-[#006694]/20 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95">
                          +Add To Favorite
                        </button>
                        {appointment.AppointmentStatus === "reviewed" ? (
                          ""
                        ) : (
                          <div className="">
                            <ReviewForm  appointmentId={appointment._id}/>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-gray-400 font-medium"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
