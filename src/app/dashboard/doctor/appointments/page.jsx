import DoctorAppointmentList from "@/components/dashboard/doctor/DoctorAppointmentList";
import { getDoctorAppointment } from "@/lib/api/getAppointment";
import { getUserSession } from "@/lib/api/getUsers";
import React from "react";

const AppointmentPage = async () => {
  const user = await getUserSession();
  const doctorId = user?.id;
  const appointments = (await getDoctorAppointment(doctorId)) || [];
 
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Patient Appointment Requests
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            Manage your incoming bookings, approve requests, or write
            prescriptions.
          </p>
        </div>
        <span className="bg-gray-100 text-gray-700 font-bold text-xs px-3 py-1.5 rounded-xl">
          Total: {appointments.length}
        </span>
      </div>
      <DoctorAppointmentList appointments={appointments} />
    </div>
  );
};

export default AppointmentPage;
