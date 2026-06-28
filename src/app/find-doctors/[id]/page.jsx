import DoctorBookingCard from "@/components/DoctorBookingCard";
import DoctorDetailsCard from "@/components/DoctorDetailsCard";
import { getDoctorById } from "@/lib/api/getDoctor";
import React from "react";
export const metadata = {
  title: "Booking Doctor",
}
const DoctorDetails = async ({ params }) => {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  const doctorId=doctor.doctorId
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row mx-0 sm:mx-auto">
        <DoctorDetailsCard doctor={doctor} />
        <DoctorBookingCard doctorId={doctorId} doctor={doctor}/>
      </div>
    </div>
  );
};

export default DoctorDetails;
