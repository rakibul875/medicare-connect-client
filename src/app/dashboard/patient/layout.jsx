import { roleBaseSession } from "@/lib/api/getUsers";
import React from "react";

const PatientLayout = async ({ children }) => {
  await roleBaseSession("patient");
  return children;
};

export default PatientLayout;