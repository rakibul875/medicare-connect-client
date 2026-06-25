import { roleBaseSession } from "@/lib/api/getUsers";
import React from "react";

const DoctorLayout = async ({ children }) => {
  await roleBaseSession("doctor");

  return children;
};

export default DoctorLayout;
