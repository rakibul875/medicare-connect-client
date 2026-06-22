import AppointmentList from "@/components/dashboard/patient/AppointmentList";
import { getPatientAppointment } from "@/lib/api/getAppointment";
import { getUserSession } from "@/lib/api/getUsers";
import React from "react";


const Appointment = async () => {
  const user = await getUserSession();
  const userId = user?.id;
  const appointments = (await getPatientAppointment(userId)) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          All Appointments
        </h1>
        <span className="bg-gray-100 text-gray-700 font-bold text-xs px-3 py-1.5 rounded-xl">
          Total: {appointments.length}
        </span>
      </div>

      
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default Appointment;
