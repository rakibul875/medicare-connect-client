import Banner from "@/components/home/Banner";
import MedicalSpecializations from "@/components/home/MedicalSpecializations";
import WhyChoose from "@/components/home/WhyChoose";
import { getAppointment } from "@/lib/api/getAppointment";
import { getDoctor } from "@/lib/api/getDoctor";
import { getUser, } from "@/lib/api/getUsers";
import { getReview } from "@/lib/api/review";

import React from "react";

const HomePage = async () => {
  const appointment = await getAppointment();
  const totalAppointment = appointment.length;
  const doctor = await getDoctor();
  const totalDoctor = doctor.length;
  const reviews = await getReview();
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  const user = await getUser();
  const totalPatient = user?.filter((item) => item.role === "patient").length;

  return (
    <div>
      <Banner
        totalAppointment={totalAppointment}
        totalDoctor={totalDoctor}
        averageRating={averageRating.toFixed(1)}
        totalPatient={totalPatient}
      />
      <MedicalSpecializations />
      <WhyChoose />
    </div>
  );
};

export default HomePage;
