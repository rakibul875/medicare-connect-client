import React from "react";
import { Pencil, Clock } from "lucide-react";
import ScheduleDelete from "./ScheduleDelete";

const ScheduleTable = ({ schedules }) => {
  return (
    <div className="w-full bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[600px] lg:min-w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-4 sm:px-6 w-1/4">Available Day</th>
              <th className="py-4 px-4 sm:px-6 w-1/2">Time Slots Range</th>
              <th className="py-4 px-4 sm:px-6 text-right w-1/4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
            {schedules && schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr
                  key={schedule._id}
                  className="hover:bg-gray-50/40 transition-colors duration-150"
                >
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-flex items-center bg-[#006694]/5 text-[#006694] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#006694]/10">
                      {schedule.day}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-md lg:max-w-none">
                      {schedule.slots &&
                        schedule.slots.map((slot, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-gray-200/60 break-words"
                          >
                            <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span>{slot}</span>
                          </div>
                        ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-[#006694] p-1.5 sm:p-2 rounded-xl hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
                        title="Edit Slot"
                      >
                        <Pencil className="w-3.5 h-3.5 sm:w-4 h-4" />
                      </button>
                      <ScheduleDelete
                        doctorId={schedule.doctorId}
                        day={schedule.day}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-12 text-gray-400 font-medium text-sm"
                >
                  No active schedules available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
