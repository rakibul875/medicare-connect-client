import DoctorAppointmentList from "@/components/dashboard/doctor/DoctorAppointmentList";
import HomeCard from "@/components/dashboard/doctor/HomeCard";
import UserReviewList from "@/components/dashboard/patient/UserReviewList";
import { getTodayAppointment } from "@/lib/api/getAppointment";
import { getUserSession } from "@/lib/api/getUsers";
import { getPaymentHistoryDoctor } from "@/lib/api/paymentHistory";
import { handelGetDoctorReview } from "@/lib/api/review";
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
  const reviews = await handelGetDoctorReview(doctorId);
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  

  return (
    <div>
      <HomeCard
        totalAmount={totalAmount}
        totalPatient={totalPatient}
        todayAppointment={todayAppointmentLength}
        averageRating={averageRating}
        
      />
      <div className="">
        <div className="">
          <h1 className="text-3xl font-bold">Today Appointments</h1>
          <DoctorAppointmentList appointments={todayAppointment} />
        </div>
      </div>
      <div className="my-5">
        <div className="">
          <h1 className="text-3xl font-bold mt-5">Reviews</h1>
          <UserReviewList reviews={reviews}/>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
