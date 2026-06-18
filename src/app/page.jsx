import Banner from "@/components/home/Banner";
import MedicalSpecializations from "@/components/home/MedicalSpecializations";
import WhyChoose from "@/components/home/WhyChoose";

import React from "react";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <MedicalSpecializations />
      <WhyChoose />
    </div>
  );
};

export default HomePage;
