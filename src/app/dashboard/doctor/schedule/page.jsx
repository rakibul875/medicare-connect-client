import AddScheduleForm from "@/components/dashboard/doctor/AddScheduleForm";
import ScheduleTable from "@/components/dashboard/doctor/ScheduleTable";
import { getDoctor } from "@/lib/api/getDoctor";
import { getDoctorSchedule } from "@/lib/api/getDoctorSchedule";
import { getUserSession } from "@/lib/api/getUsers";
import { redirect } from "next/navigation";
import React from "react";

const Schedule = async () => {
  const user = await getUserSession();
  if (user?.role !== "doctor") {
    redirect("/unauthorized");
  }

  const doctorId = user?.id;
  const allDoctors = await getDoctor();
  const currentDoctorProfile = allDoctors.find(
    (doctor) => doctor.doctorId === doctorId,
  );
  const schedules = (await getDoctorSchedule(doctorId)) || [];

  const isApprovedByAdmin =
    currentDoctorProfile?.verificationStatus === "approved";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          Doctor Schedule Panel
        </h1>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">
          Manage your available time slots for patient appointments.
        </p>
      </div>
      {isApprovedByAdmin ? (
        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              Create New Schedule Slot
            </h2>
            <AddScheduleForm doctorId={doctorId} />
          </div>

          <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              Your Active Slots
            </h2>
            <ScheduleTable schedules={schedules} />
          </div>
        </div>
      ) : (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-[1.5rem] flex flex-col gap-2 shadow-sm">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base">
            <span> Access Restricted: Account Pending Approval</span>
          </div>
          <p className="text-sm text-amber-700 font-medium">
            Dear Doctor, your profile is currently under review by the
            administrator. Once the admin approves your account, your status
            will change, and you will be fully unlocked to create time slots and
            manage your schedules.
          </p>
        </div>
      )}
    </div>
  );
};

export default Schedule;
