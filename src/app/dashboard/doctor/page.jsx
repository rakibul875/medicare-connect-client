import DoctorAppointmentList from "@/components/dashboard/doctor/DoctorAppointmentList";
import HomeCard from "@/components/dashboard/doctor/HomeCard";
import { getTodayAppointment } from "@/lib/api/getAppointment";
import { getUserSession } from "@/lib/api/getUsers";
import { getPaymentHistoryDoctor } from "@/lib/api/paymentHistory";
import React from "react";

const DoctorDashboard = async () => {
  const user = await getUserSession();
  const doctorId = user?.id;

  const paymentData = await getPaymentHistoryDoctor(doctorId);
  let totalAmount = 0;
  for (let i = 0; i < paymentData.length; i++) {
    totalAmount += paymentData[i].amount;
  }
  const totalPatient = paymentData.length;
  const todayAppointment = await getTodayAppointment(doctorId);
  const todayAppointmentLength = todayAppointment.length;

  return (
    <div>
      <HomeCard
        totalAmount={totalAmount}
        totalPatient={totalPatient}
        todayAppointment={todayAppointmentLength}
      />
      <div className="">
        <div className="">
          <h1 className="text-3xl font-bold">Today Appointments</h1>
          <DoctorAppointmentList appointments={todayAppointment} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
