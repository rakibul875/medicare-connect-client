"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { getUserSession } from "@/lib/api/getUsers";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare } from "@gravity-ui/icons";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  if (pathname.includes("dashboard")) {
    return null;
  }
  const handelLogOut = async () => {
    await authClient.signOut();
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];
  const Active = pathname === `/dashboard/${user?.role}`;

  return (
    <nav className="bg-[#f8fafc] border-b border-gray-100 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`transition-colors pb-1 ${
                    isActive
                      ? "text-[#006694] border-b-2 border-[#006694] font-semibold"
                      : "text-gray-500 hover:text-[#006694]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {isPending ? (
              "Loading.."
            ) : user ? (
              <div>
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full">
                    <Avatar>
                      <Avatar.Image
                        alt="Junior Garcia"
                        src={user?.profilePhoto}
                      />
                      <Avatar.Fallback delayMs={600}>
                        {user?.name.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>
                  <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-1">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-0">
                          <p className="text-sm leading-5 font-medium">
                            {user?.name}
                          </p>
                          <p className="text-xs leading-none text-muted">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Dropdown.Menu>
                      <Dropdown.Item id="dashboard" textValue="Dashboard">
                        <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="logout"
                        textValue="Logout"
                        variant="danger"
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <button
                            onClick={handelLogOut}
                            className="rounded-none border-none text-red-600"
                          >
                            Log Out
                          </button>
                          <ArrowRightFromSquare className="size-3.5 text-danger" />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-cyan-700 rounded-none border-cyan-500 border-2 px-7 py-1 hover:bg-cyan-500 hover:text-white transition-colors duration-300"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#006694] focus:outline-none p-2 rounded-md hover:bg-gray-100"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-3 shadow-inner absolute top-full left-0 w-full z-50">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-[#006694]/10 text-[#006694]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#006694]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <hr className="border-gray-100 my-2" />

          <div className="px-3 space-y-3">
            {user ? (
              <div className="flex flex-col space-y-5">
                <div
                  className={`block py-2 rounded-md text-base font-medium ${
                    Active
                      ? "bg-[#006694]/10 text-[#006694]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#006694]"
                  }`}
                >
                  <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>
                </div>
                <Button
                  variant="outline"
                  onClick={handelLogOut}
                  className="text-red-700 rounded-none border-red-500 border-2 px-7 py-1 hover:bg-red-500 hover:text-red-500 transition-colors duration-300"
                >
                  LogOut
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-cyan-700 rounded-none border-cyan-500 border-2 px-7 py-1 hover:bg-cyan-500 hover:text-white transition-colors duration-300"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
