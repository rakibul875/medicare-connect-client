"use client";

import React from "react";
import { User, Phone, Mail, Ban, Trash2, ShieldAlert } from "lucide-react";
import { handelUserStatus, userDelete } from "@/lib/post/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PatientTable = ({ patients }) => {
  const router = useRouter();
  const handelSuspend = async (id) => {
    const res = await handelUserStatus(id, { status: "suspend" });
    if (res.modifiedCount > 0) {
      toast.success(`User Suspend Successful`);
      router.refresh();
    }
  };
  const handelDelete = async (id) => {
    const res = await userDelete(id);
    if (res.deletedCount > 0) {
      toast.success("User deleted successfully");
      router.refresh();
    }
  };

  return (
    <div className="w-full bg-white rounded-[2rem] border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-6">Patient Info</th>
              <th className="py-4 px-6">Contact</th>
              <th className="py-4 px-6">Gender</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right w-48">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
            {patients && patients.length > 0 ? (
              patients.map((patient) => {
                const isPending = patient.status === "pending";
                const isSuspended = patient.status === "suspend";

                return (
                  <tr
                    key={patient._id}
                    className="hover:bg-gray-50/40 transition-colors duration-150"
                  >
                    {/* Column 1: Profile Photo & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                          {patient.profilePhoto ? (
                            <img
                              src={patient.profilePhoto}
                              alt={patient.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="block font-bold text-gray-900 leading-snug">
                            {patient.name || "N/A"}
                          </span>
                          <span className="block text-[11px] text-gray-400 font-semibold tracking-wide uppercase mt-0.5">
                            {patient.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                          <Phone className="w-3.5 h-3.5 text-gray-300" />
                          <span>{patient.phone || "No phone"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="capitalize text-xs font-bold text-gray-500 bg-gray-100/70 px-2.5 py-1 rounded-lg">
                        {patient.gender}
                      </span>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      ) : isSuspended ? (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase">
                          <Ban className="w-3 h-3" />
                          <span>Suspended</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-gray-100 text-gray-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase">
                          {patient.status}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      {isPending ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => handelSuspend(patient._id)}
                            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all active:scale-95 shadow-sm shadow-amber-600/10"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Suspend</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handelDelete(patient._id)}
                            className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold px-3 py-2 rounded-xl transition-all active:scale-95"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium italic pr-4">
                          No actions
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 text-gray-400 font-medium text-sm"
                >
                  No active patients profile registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;
