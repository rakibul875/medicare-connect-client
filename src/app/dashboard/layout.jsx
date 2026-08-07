import SideBare from "@/components/dashboard/SideBare";
import React from "react";
import { getUserSession } from "@/lib/api/getUsers";

export const metadata = {
  title: "MediCare Dashboard",
};

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-5">
      <SideBare user={user} />

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
