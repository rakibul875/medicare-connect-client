import FindDoctor from "@/components/FindDoctor";
import { getDoctor,  } from "@/lib/api/getDoctor";
import React from "react";

const FindDoctorsPage = async () => {
  
  const doctorData = await getDoctor();


  return (
    <div className="container mx-auto min-h-screen">
      <div className="mx-10 my-5 space-y-3">
        <h1 className='text-4xl font-bold text-cyan-500'>Find Your Specialist</h1>
        <p className="text-xl text-slate-500">Clinical excellence meets digital calm. Browse our network of certified <br /> healthcare professionals and book your appointment in seconds.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {doctorData.map((doctor) =>
          <FindDoctor key={doctor._id} doctor={doctor} />
        )}
      </div>
    </div>
  );
};

export default FindDoctorsPage;

