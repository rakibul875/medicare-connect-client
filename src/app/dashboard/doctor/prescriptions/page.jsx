import { getDoctorPrescription } from "@/lib/api/prescription";
import { getUserSession } from "@/lib/api/getUsers";
import { redirect } from "next/navigation";
import React from "react";
import PrescriptionCardList from "@/components/dashboard/doctor/PrescriptionCardList";

const Prescriptions = async () => {
  const user = await getUserSession();
  if (user?.role !== "doctor") {
    redirect("/unauthorized");
  }
  const doctorId = user?.id;

  const prescriptionData = (await getDoctorPrescription(doctorId)) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Prescription History
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            View and manage all your previously submitted patient prescriptions.
          </p>
        </div>
        <span className="self-start sm:self-center bg-gray-100 text-gray-700 font-bold text-xs px-3 py-1.5 rounded-xl">
          Total: {prescriptionData.length}
        </span>
      </div>

      <PrescriptionCardList prescriptions={prescriptionData} />
    </div>
  );
};

export default Prescriptions;
