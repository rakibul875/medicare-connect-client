import AppointmentList from "@/components/dashboard/patient/AppointmentList";
import FavoriteDoctorCard from "@/components/dashboard/patient/FavoriteDoctorCard";
import HomeCard from "@/components/dashboard/patient/HomeCard";
import { handelGetFavorite } from "@/lib/api/favorite";
import { getPatientAppointment } from "@/lib/api/getAppointment";
import { getUserSession } from "@/lib/api/getUsers";
import { getPaymentHistory } from "@/lib/api/paymentHistory";
import { handelGetUserReview } from "@/lib/api/review";
import React from "react";

const PatientDashboard = async () => {
  const user = await getUserSession();
  const userId = user?.id;

  const paymentData = await getPaymentHistory(userId);
  let totalAmount = 0;
  for (let i = 0; i < paymentData.length; i++) {
    totalAmount += paymentData[i].amount;
  }
  const data = await getPatientAppointment(userId);
  const upComingAppointment = data.filter(
    (item) => item.AppointmentStatus === "pending",
  ).length;
  const totalAppointment = data.filter(
    (item) => item.AppointmentStatus === "confirmed",
  ).length;

  const upComingAppointmentData = data.filter(
    (item) => item.AppointmentStatus === "pending",
  );

  const Review = await handelGetUserReview(userId);
  const totalReview = Review.length;
  const favoriteDoctor = await handelGetFavorite(userId);
  return (
    <div>
      <HomeCard
        totalAmount={totalAmount}
        upComingAppointment={upComingAppointment}
        totalAppointment={totalAppointment}
        totalReview={totalReview}
      />
      <div className="">
        <h1 className="text-3xl font-bold">Upcoming Appointment</h1>
        <AppointmentList appointments={upComingAppointmentData} />
      </div>
      <div className="my-5">
        <h1 className="text-3xl font-bold my-10">Favorite Doctors</h1>
        <FavoriteDoctorCard favoriteDoctor={favoriteDoctor} />
      </div>
    </div>
  );
};

export default PatientDashboard;
