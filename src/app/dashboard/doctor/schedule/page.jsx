import AddScheduleForm from "@/components/dashboard/doctor/AddScheduleForm";
import { getDoctor } from "@/lib/api/getDoctor";
import { getUserSession } from "@/lib/api/getUsers";
import { redirect } from "next/navigation";
import React from "react";

const Schedule = async () => {
  const user = await getUserSession();
  if (!user?.role === "doctor") {
    return;
  }
  const doctorId=user?.id
  console.log('doctorId',doctorId)

  return (
    <div>
      <AddScheduleForm doctorId={doctorId} />
    </div>
  );
};

export default Schedule;
