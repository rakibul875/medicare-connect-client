import PatientTable from "@/components/dashboard/admin/PatientTable";
import { getUser } from "@/lib/api/getUsers";
import React from "react";
 // 🚀 পেশেন্টদের জন্য আলাদা টেবিল কম্পোনেন্ট

const UserPage = async () => {
  const user = await getUser() || [];
  // শুধুমাত্র পেশেন্টদের ফিল্টার করে নেওয়া হয়েছে
  const patients = user.filter((item) => item.role === "patient");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* হেডার সেকশন */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Patient Management Panel
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5">
            View and manage all registered patients in the system.
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold self-start sm:self-center">
          Total Patients: {patients.length}
        </div>
      </div>

      {/* আলাদা পেশেন্ট টেবিল কম্পোনেন্ট */}
      <PatientTable patients={patients} />
    </div>
  );
};

export default UserPage;
