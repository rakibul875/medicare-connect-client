import UserReviewList from "@/components/dashboard/patient/UserReviewList";
import Banner from "@/components/home/Banner";
import MedicalSpecializations from "@/components/home/MedicalSpecializations";
import WhyChoose from "@/components/home/WhyChoose";
import HomeCard from "@/components/HomeCard";
import Review from "@/components/Review";
import { getAppointment } from "@/lib/api/getAppointment";
import { getDoctor } from "@/lib/api/getDoctor";
import { getUser } from "@/lib/api/getUsers";
import { getLastReview, getReview } from "@/lib/api/review";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

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
  const review=await getLastReview()
  

  return (
    <div className="">
      <Banner
        totalAppointment={totalAppointment}
        totalDoctor={totalDoctor}
        averageRating={averageRating.toFixed(1)}
        totalPatient={totalPatient}
      />
      <MedicalSpecializations />
      <div className="my-5 container mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#006694] tracking-tight">
            Upcoming Doctor
          </h1>
          <Link
            href="/find-doctors"
            className="inline-flex items-center space-x-1 text-sm font-bold text-[#006694] hover:text-[#00557c] transition-colors group self-start sm:self-center"
          >
            <span>View All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
        <HomeCard />
      </div>
      <WhyChoose />
      <div className="my-5 container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#006694] text-center my-3">Patient Reviews</h1>
        <Review reviews={review}/>
      </div>
    </div>
  );
};

export default HomePage;
