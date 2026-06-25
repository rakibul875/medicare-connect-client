import AppointmentTable from "@/components/dashboard/admin/AppointmentTable";
import { getAppointment } from "@/lib/api/getAppointment";
import React from "react";


const AppointmentPage = async () => {
  const appointment = await getAppointment();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
    
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Appointment Schedules
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-400">
          View and monitor all doctor consultations, time configurations, and
          request verification metrics.
        </p>
      </div>


      {!appointment || appointment.length === 0 ? (
        <div className="w-full bg-white rounded-[2rem] border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-gray-400 font-semibold text-sm tracking-wide">
            No appointment logs registry found on this cluster.
          </p>
        </div>
      ) : (
        <AppointmentTable data={appointment} />
      )}
    </div>
  );
};

export default AppointmentPage;
