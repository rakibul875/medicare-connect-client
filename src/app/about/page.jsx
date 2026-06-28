import React from "react";
import {
  HeartPulse,
  Users,
  ShieldCheck,
  Award,
  Target,
  Activity,
} from "lucide-react";

export const metadata = {
  title: "MediCare About",
}

const AboutPage = () => {
  const hospitalStats = [
    { label: "Expert Medical Consultants", value: "150+" },
    { label: "Successful Consultations", value: "98k+" },
    { label: "Modern Clinical Chambers", value: "45+" },
    { label: "Positive Patient Feedback", value: "99.4%" },
  ];

  const coreValues = [
    {
      icon: <HeartPulse className="w-6 h-6 text-[#006694]" />,
      title: "Patient-Centric Care",
      desc: "Our primary objective is to deliver customized clinical assessments and specialized healthcare solutions tailored to every patient's needs.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#006694]" />,
      title: "Advanced Security & Integrity",
      desc: "Patients' electronic health records (EHR) and dynamic payment gateways strictly adhere to secure, full end-to-end encrypted protocols.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#006694]" />,
      title: "Certified Professionals",
      desc: "Only highly vetted medical practitioners with verified performance records are eligible to join our specialized clinical boards.",
    },
  ];

  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-16">
    
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#006694]/5 text-[#006694] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Who We Are</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Redefining Healthcare Diagnostics & Management
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We are committed to transitioning traditional medical workflows into a
          smart, integrated tracking ecosystem. Through transparent online
          booking, instant payment verification, and automated specialist
          scheduling, we ensure every life remains secure.
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreValues.map((value, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#006694]/5 flex items-center justify-center">
              {value.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{value.title}</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
              {value.desc}
            </p>
          </div>
        ))}
      </div>

   
      <div className="max-w-6xl mx-auto bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
       
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Our Dedicated Mission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            Empowering Families Through Seamless Medical Operations
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
            To eliminate the hassles of long hospital queues, analog receipt
            desks, and disconnected offline scheduling, we operate a highly
            analytical data pipeline. With our next-gen digital portal, patients
            can securely confirm their clinical appointments instantly from the
            comfort of their homes.
          </p>

          <div className="pt-2 border-t border-slate-50 flex items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                DR
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                MD
              </div>
              <div className="w-8 h-8 rounded-full bg-[#006694] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                +50
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Supported by Global Hospital Networks
            </span>
          </div>
        </div>

        {/* Right Side Statistics Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 bg-slate-50/70 p-4 sm:p-6 rounded-3xl border border-slate-100/50">
          {hospitalStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-100 text-center space-y-1"
            >
              <span className="block text-2xl sm:text-3xl font-black text-[#006694] tracking-tight">
                {stat.value}
              </span>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
