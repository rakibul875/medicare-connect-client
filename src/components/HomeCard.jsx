import { lastDoctor } from "@/lib/api/getDoctor";
import React from "react";
import FindDoctor from "./FindDoctor";

const HomeCard = async () => {
  const doctorData = await lastDoctor();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {doctorData.map((doctor) => (
          <FindDoctor key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
