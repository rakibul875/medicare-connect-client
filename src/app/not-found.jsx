"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, Activity, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <Activity className="w-[600px] h-[600px] text-[#006694] animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="relative inline-block">
          <h1 className="text-9xl font-black text-slate-200 tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center mt-4">
            <div className="w-16 h-16 rounded-2xl bg-[#006694]/5 border border-[#006694]/10 flex items-center justify-center text-[#006694] shadow-sm animate-bounce">
              <Search className="w-7 h-7" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed max-w-sm mx-auto">
            The medical page, appointment register, or specialist schedule line
            you are looking for has been moved or doesn`t exist anymore.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-bold tracking-wide rounded-xl transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#006694] hover:bg-[#00557c] text-white text-xs sm:text-sm font-bold tracking-wide rounded-xl transition-all shadow-md shadow-[#006694]/10 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

      
        <div className="pt-8 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Need urgent help?{" "}
            <Link
              href="/contact"
              className="text-[#006694] underline hover:text-[#00557c]"
            >
              Contact Support Desk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
