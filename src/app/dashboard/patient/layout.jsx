import { getUserSession, roleBaseSession } from "@/lib/api/getUsers";
import React from "react";

const PatientLayout = async ({ children }) => {
  await roleBaseSession("patient");
  const user= await getUserSession()
  if (user?.status === "suspend") {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-500 font-bold">
          Your account has been suspended.
        </h2>
      </div>
    );
  }
  return children;
};

export default PatientLayout;
