"use client";
import {
  handelStatusByDoctor,
  handelStatusRejectedByDoctor,
} from "@/lib/post/appointment";
import { useRouter } from "next/navigation";
import React from "react";

const DoctorAppointmentList = ({ appointments }) => {
  const router = useRouter();
  const handleApprove = async (id) => {
    const res = await handelStatusByDoctor(id);
    if (res.modifiedCount > 0) {
      alert("Appointment Approve");
      router.refresh();
    }
  };

  const handleReject = async (id) => {
    const res = await handelStatusRejectedByDoctor(id);
    if (res.modifiedCount > 0) {
      alert("Appointment Rejected");
      router.refresh();
    }
  };

  const handleAddPrescription = (id) => {
    alert(`Redirecting to add prescription for ID: ${id}`);
  };

  return (
    <div className="w-full bg-white rounded-[1.5rem] border border-gray-100 p-4 sm:p-6 shadow-sm mt-4">
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 sm:px-6">Patient Info (ID)</th>
              <th className="py-4 px-4 sm:px-6">Date & Time</th>
              <th className="py-4 px-4 sm:px-6">Status</th>
              <th className="py-4 px-4 sm:px-6 text-center">Actions</th>
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
                    <span className="font-bold block text-gray-900">
                     {appointment.userName || 'patient'}
                    </span>
                    <span className="text-xs text-gray-400 font-normal block mt-0.5">
                      UID: {appointment.userId.slice(-6)}
                    </span>
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
                          : appointment.AppointmentStatus === "approved"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-rose-50 text-rose-600 border-rose-100"
                      }`}
                    >
                      {appointment.AppointmentStatus}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {appointment.AppointmentStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(appointment._id)}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(appointment._id)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {appointment.AppointmentStatus === "approved" && (
                        <>
                          <button
                            onClick={() =>
                              handleAddPrescription(appointment._id)
                            }
                            className="bg-[#006694]/10 text-[#006694] hover:bg-[#006694]/20 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                          >
                            + Add Prescription
                          </button>
                          <button
                            onClick={() => handleReject(appointment._id)}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {appointment.AppointmentStatus === "cancelled" && (
                        <span className="text-xs text-rose-400 font-bold italic select-none">
                          Cancelled
                        </span>
                      )}
                      {appointment.AppointmentStatus === "rejected" && (
                        <button
                          onClick={() => handleApprove(appointment._id)}
                          className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-gray-400 font-medium"
                >
                  No active appointments request found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointmentList;
