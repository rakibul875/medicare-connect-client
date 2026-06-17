"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaPhoneAlt, FaTwitter } from "react-icons/fa";

import { MdOutlineMail } from "react-icons/md";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [email, setEmail] = useState("");
  const pathname=usePathname()
  if(pathname.includes('dashboard')){
    return null
  }

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    setEmail("");
  };

  const quickLinks = [
    { label: "About Our Platform", path: "/about" },
    { label: "Find a Specialist", path: "/find-doctors" },
    { label: "Health Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
  ];

  return (
    <footer className="bg-[#f8fafc] border-t border-gray-100 text-gray-600 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#006694] tracking-tight">
              MediCare Connect
            </h2>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Clinical Excellence meets Digital Calm.
            </p>
            <h1 className="text-sm font-bold text-black">CONTACT</h1>
            <p className="text-sm flex items-center gap-2 text-cyan-600">
              <FaPhoneAlt />
              +88 01607420771
            </p>
            <p className="text-sm flex items-center gap-2 text-cyan-600">
              <MdOutlineMail />
              rakibulislamashik@gmail.com
            </p>
            <div className="flex items-center space-x-4 pt-2 text-[#006694]">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="text-[#006694] hover:underline underline-offset-4 decoration-1 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Emergency Hotline
            </h3>
            <a
              href="tel:1-800-MED-HELP"
              className="text-lg font-semibold text-[#006694] hover:opacity-90 block"
            >
              1-800-MED-HELP
            </a>
            <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
              Available 24/7 for critical medical assistance.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-xs text-gray-500">
              Stay updated with health tips and news.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center space-x-2 max-w-xs"
            >
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#f1f5f9] rounded-xl text-sm px-4 py-2.5 w-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006694]/50 transition-all"
              />
              <button
                type="submit"
                className="bg-[#006694] hover:bg-[#00557c] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/60 text-center">
          <p className="text-xs text-gray-500 tracking-tight">
            © 2026 MediCare Connect. Clinical Excellence meets Digital Calm.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
