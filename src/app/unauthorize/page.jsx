"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft, Lock } from "lucide-react";

const UnauthorizePage = () => {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
        <ShieldAlert className="w-[600px] h-[600px] text-rose-600" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-[2rem] bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm mx-auto relative group">
            <ShieldAlert className="w-10 h-10 animate-pulse" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-white border-2 border-white shadow-sm">
              <Lock className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest text-rose-500 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100/50 inline-block">
            Error 401: Restricted Access
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Unauthorized Clearance
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed max-w-sm mx-auto">
            Your current account credentials do not hold the required clearance
            parameters to access this dashboard terminal or administrative
            panel.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
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

        <div className="pt-8 border-t border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <span>
            Security logs have automatically logged this profile entry sequence.
          </span>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizePage;
