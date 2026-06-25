import DashboardAnalytics from "@/components/dashboard/admin/DashboardAnalytics";
import RatingTable from "@/components/dashboard/admin/RatingTable";
import { getAppointment } from "@/lib/api/getAppointment";
import { getDoctor } from "@/lib/api/getDoctor";
import { getUser } from "@/lib/api/getUsers";
import { getAllPaymentHistory } from "@/lib/api/paymentHistory";
import { getRating } from "@/lib/api/rating";
import React from "react";

const AdminDashboard = async () => {
  const appointment = await getAppointment();
  const totalAppointment = appointment.length;
  const doctor = await getDoctor();
  const totalDoctor = doctor.length;
  const user = await getUser();
  const totalUser = user?.filter(
    (item) => item.role !== "patient" && item.status !== "suspend",
  ).length;
  const payment = await getAllPaymentHistory();
  let totalAmount = 0;
  for (let i = 0; i < payment.length; i++) {
    totalAmount += payment[i].amount;
  }

  const ratingBase = await getRating();

  return (
    <div>
      <DashboardAnalytics
        totalAppointment={totalAppointment}
        doctor={totalDoctor}
        totalUser={totalUser}
        totalAmount={totalAmount}
      />
      <div className="my-10">
        <RatingTable ratingBase={ratingBase} />
      </div>
    </div>
  );
};

export default AdminDashboard;
