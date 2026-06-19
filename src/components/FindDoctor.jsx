import React from "react";
import Link from "next/link";
import { Briefcase, CheckCircle2, Star } from "lucide-react";

const FindDoctor = ({ doctor }) => {
  // Destructuring properties with fallback values from the data structure
  const {
    _id,
    doctorName,
    specialization,
    qualifications,
    experience,
    consultationFee,
    hospitalName,
    profileImage,
    verificationStatus,
  } = doctor || {};

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100/80 p-6 max-w-md w-full shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Top Details Section */}
      <div className="flex items-start gap-4">
        {/* Profile Image & Online Badge Container */}
        <div className="relative flex-shrink-0">
          <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={
                profileImage ||
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
              }
              alt={doctorName || "Doctor Profile"}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Status Badge */}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#006652] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase">
            ONLINE
          </span>
        </div>

        {/* Doctor Info Middle Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">
              {doctorName ? `Dr. ${doctorName}` : "Dr. Sarah Jenkins"}
            </h3>
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-1 bg-[#f1f5f9] px-2 py-0.5 rounded-lg text-xs font-bold text-gray-700">
              <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
              <span>4.9</span>
            </div>
          </div>

          <p className="text-sm font-semibold text-[#008070] tracking-wide">
            {specialization || "Senior Cardiologist"}
          </p>

          {/* Subtitle / Qualifications */}
          <p
            className="text-xs font-medium text-gray-400 truncate max-w-[200px]"
            title={qualifications}
          >
            {qualifications || hospitalName}
          </p>

          {/* Meta Badges (Experience & Verification) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs font-semibold text-gray-500">
            <div className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
              <span>{experience || "15"}+ Years Exp.</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
              <span className="capitalize">
                {verificationStatus === "Pending"
                  ? "Board Certified"
                  : verificationStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thin Divider Line */}
      <hr className="border-gray-100 my-5" />

      {/* Bottom Fee & Call to Action Layout */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 tracking-wide uppercase">
            Consultation Fee
          </span>
          <span className="text-2xl font-black text-[#006694] tracking-tight">
            ${consultationFee || "120"}
          </span>
        </div>

        <Link
          href={`/appointments/book/${_id}`}
          className="bg-[#006694] hover:bg-[#00557c] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-[0.98] text-center"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default FindDoctor;
