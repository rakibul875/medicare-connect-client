import DoctorDetailsCard from "@/components/DoctorDetailsCard";
import { getDoctorById } from "@/lib/api/getDoctor";
import React from "react";

const DoctorDetails = async ({ params }) => {
  const { id } = await params;
  const doctor = await getDoctorById(id);
  console.log(doctor);
  return (
    <div className="container mx-auto">
      <div className="">
        <DoctorDetailsCard doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorDetails;
