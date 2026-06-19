import { roleBaseSession } from "@/lib/api/getUsers";
import React from "react";

const PatientLayout = async ({ children }) => {
  await roleBaseSession("admin");
  return children;
};

export default PatientLayout;