import DoctorTable from "@/components/dashboard/admin/DoctorTable";
import { getDoctor } from "@/lib/api/getDoctor";
import React from "react";


const DoctorPage = async () => {
  const doctors = (await getDoctor()) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
     
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Doctor Verification Panel
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            Manage onboarding requests, approve or reject doctor profiles.
          </p>
        </div>
        <div className="bg-sky-50 text-[#006694] px-4 py-2 rounded-xl text-xs font-bold self-start sm:self-center">
          Total Applications: {doctors.length}
        </div>
      </div>

      
      <DoctorTable initialDoctors={doctors} />
    </div>
  );
};

export default DoctorPage;
