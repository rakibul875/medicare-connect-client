import { getUserSession } from "@/lib/api/getUsers";
import { Bars, Envelope, Gear, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
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
      { icon: LayoutGrid, label: "Dashboard Overview", path: "/dashboard" },
      {
        icon: Calendar,
        label: "My Appointments",
        path: "/dashboard/appointments",
      },
      {
        icon: CreditCard,
        label: "Payment History",
        path: "/dashboard/payments",
      },
      { icon: Star, label: "My Reviews", path: "/dashboard/reviews" },
    ],
    doctor: [
      { icon: LayoutGrid, label: "Dashboard Overview", path: "/dashboard/doctor" },
      { icon: Calendar, label: "Manage Schedule", path: "/dashboard/doctor/schedule" },
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
      { icon: Person, label: "Profile Management", path: "/dashboard/doctor/profile" },
    ],
    admin:
      [
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
  console.log(user?.role);
  const navItems = roleNavItems[user?.role||[]];

  const neviCationItems = (
    <>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.label}
            className="flex items-center gap-3 rounded-2xl px-3 py-4 text-sm text-foreground transition-colors hover:bg-cyan-300"
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
      <aside className="hidden w-64 shrink-0 border border-default p-4 lg:block bg-cyan-50">
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
