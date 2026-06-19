import FindDoctor from "@/components/FindDoctor";
import { getDoctor } from "@/lib/api/getDoctor";
import React from "react";

const FindDoctorsPage = async () => {
  const doctorData = await getDoctor();

  return (
    <div className="container mx-auto h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {doctorData.map(doctor=>{
            <FindDoctor key={doctor._id} doctor={doctor}/>
        })}
      </div>
    </div>
  );
};

export default FindDoctorsPage;
