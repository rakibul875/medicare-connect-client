"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Find Doctors", path: "/find-doctors" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

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
            <Link href="/login">
              <Button variant="outline" className='text-cyan-700 rounded-none border-cyan-500 border-2 px-7 py-1 hover:bg-cyan-500 hover:text-white transition-colors duration-300'>
                Login
              </Button>
            </Link>
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
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center text-[#006694] font-medium py-2 rounded-md border border-[#006694] hover:bg-gray-50"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
