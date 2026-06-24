import { getUserSession } from "@/lib/api/getUsers";
import { Bars, Envelope, Gear, Magnifier, Person } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import {
  BarChart3,
  Bell,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  HeartPulse,
  House,
  LayoutGrid,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { IoBagAdd } from "react-icons/io5";

const SideBare = async () => {
  const user = await getUserSession();
  const roleNavItems = {
    patient: [
      {
        icon: LayoutGrid,
        label: "Dashboard Overview",
        path: "/dashboard/patient",
      },
      {
        icon: Calendar,
        label: "My Appointments",
        path: "/dashboard/patient/appointments",
      },
      {
        icon: CreditCard,
        label: "Payment History",
        path: "/dashboard/patient/payments",
      },
      { icon: Star, label: "My Reviews", path: "/dashboard/patient/reviews" },
    ],
    doctor: [
      {
        icon: LayoutGrid,
        label: "Dashboard Overview",
        path: "/dashboard/doctor",
      },
      {
        icon: Calendar,
        label: "Manage Schedule",
        path: "/dashboard/doctor/schedule",
      },
      {
        icon: ClipboardList,
        label: "Appointment Requests",
        path: "/dashboard/doctor/appointments",
      },
      {
        icon: FileText,
        label: "Prescription Management",
        path: "/dashboard/doctor/prescriptions",
      },
      {
        icon: Person,
        label: "Profile Management",
        path: "/dashboard/doctor/profile",
      },
    ],
    admin: [
      {
        icon: LayoutGrid,
        label: "Dashboard Overview",
        path: "/admin/dashboard",
      },
      { icon: Users, label: "Manage Users", path: "/admin/users" },
      { icon: HeartPulse, label: "Manage Doctors", path: "/admin/doctors" },
      {
        icon: Calendar,
        label: "Manage Appointments",
        path: "/admin/appointments",
      },
      {
        icon: CreditCard,
        label: "Payment Management",
        path: "/admin/payments",
      },
      { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    ],
  };
  const navItems = roleNavItems[user?.role || []];

  const neviCationItems = (
    <>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.label}
            className="flex items-center gap-3 rounded-2xl px-3 py-4 text-sm text-foreground transition-colors hover:bg-cyan-100"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border border-default p-4 lg:block">
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-[#006694]"
          >
            <path d="M19 6h-3V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-9-2h4v2h-4V4zm5 11h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z" />
          </svg>
          <span className="text-lg sm:text-xl font-bold text-[#006694] tracking-tight">
            MediCare Connect
          </span>
        </Link>
        <div className="flex items-center gap-3 my-5">
          <div className="">
            <Avatar>
              <Avatar.Image alt="Junior Garcia" src={user?.profilePhoto} />
              <Avatar.Fallback delayMs={600}>
                {user?.name.charAt(0)}
              </Avatar.Fallback>
            </Avatar>
          </div>
          <div className="">
            <h1 className="text-xl font-bold">{user?.name}</h1>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        {neviCationItems}
      </aside>
      <div className="lg:hidden shadow p-3">
        <Drawer>
          <div className="flex justify-between mx-3 items-center">
            <div className="flex items-center gap-3">
              <IoBagAdd className="text-2xl font-bold text-[#006694]" />
              <h1 className="text-2xl font-bold text-[#006694]">
                MediCare Connect
              </h1>
            </div>
            <Button variant="secondary">
              <Bars />
            </Button>
          </div>
          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>Navigation</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>{neviCationItems}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
};

export default SideBare;
