import SideBare from "@/components/dashboard/SideBare";
import React from "react";
export const metadata = {
  title: "MediCare Dashboard",
}
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-5">
      <SideBare />

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
