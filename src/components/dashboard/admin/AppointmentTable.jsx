import React from "react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const AppointmentTable = ({ data }) => {
  const renderStatusBadge = (status) => {
    const normalizeStatus = status?.toLowerCase();

    switch (normalizeStatus) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Approved</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Cancelled</span>
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-white rounded-[2rem] border border-gray-100 p-4 sm:p-6 shadow-sm">
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[850px] lg:min-w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-6">Doctor Details</th>
              <th className="py-4 px-6">Patient Identifier Name</th>
              <th className="py-4 px-6">Consultation Date</th>
              <th className="py-4 px-6">Schedule Range</th>
              <th className="py-4 px-6 text-center w-36">Request Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
            {data.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50/40 transition-all duration-150"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100/80 bg-gray-50 flex-shrink-0">
                      {item.doctorImage ? (
                        <img
                          src={item.doctorImage}
                          alt={item.doctorName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900 leading-tight">
                        {item.doctorName || "Medical Consultant"}
                      </span>
                      <span
                        className="block text-[10px] text-gray-400 font-mono mt-0.5"
                        title={item.doctorId}
                      >
                        ID: {item.doctorId?.slice(-6)}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    <span className="font-bold text-slate-800">
                      {item.userName || "Generic Patient"}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl w-fit">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.date}</span>
                  </div>
                </td>

                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-[#006694]/60" />
                    <span className="text-gray-700 font-bold">
                      {item.timeSlot}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center whitespace-nowrap">
                  {renderStatusBadge(item.AppointmentStatus)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
