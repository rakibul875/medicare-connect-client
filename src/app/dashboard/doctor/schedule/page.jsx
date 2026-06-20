import AddScheduleForm from "@/components/dashboard/doctor/AddScheduleForm";
import ScheduleTable from "@/components/dashboard/doctor/ScheduleTable";
import { getDoctorSchedule } from "@/lib/api/getDoctorSchedule";
import { getUserSession } from "@/lib/api/getUsers";

import React from "react";

const Schedule = async () => {
  const user = await getUserSession();
  if (!user?.role === "doctor") {
    return;
  }
  const doctorId=user?.id
  const schedules= await getDoctorSchedule(doctorId)
  console.log(schedules)

  return (
    <div>
      <AddScheduleForm doctorId={doctorId} />
      <ScheduleTable schedules={schedules}/>
    </div>
  );
};

export default Schedule;
