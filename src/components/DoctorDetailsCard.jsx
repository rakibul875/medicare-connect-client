import React from "react";
import { HiCurrencyDollar } from "react-icons/hi";

const DoctorDetailsCard = ({ doctor }) => {
  return (
    <div className="max-w-[360px] w-full bg-white rounded-[2.5rem] border border-gray-100/70 p-8 shadow-sm flex flex-col items-center text-center mx-auto lg:mx-0 my-6">
      <div className="relative mb-4 mt-2">
        <div className="w-28 h-28 rounded-full overflow-hidden p-1 bg-white ring-4 ring-slate-50 shadow-sm">
          <img
            src={doctor.profileImage}
            alt={doctor.doctorName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2 w-full">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">
          {doctor.doctorName}
        </h3>

        <div className="inline-block bg-[#149ddd]/10 text-[#006694] text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
          {doctor.specialization}
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-6 mb-6 text-center">
        <div className="flex-1 px-2">
          <div className="text-base font-black text-gray-800">15</div>
          <div className="text-xs font-bold text-gray-400 mt-0.5 uppercase tracking-wide">
            Rating
          </div>
        </div>

        <div className="h-8 w-[1px] bg-gray-100"></div>

        <div className="flex-1 px-2">
          <div className="text-base font-black text-gray-800">
            {doctor.experience}
          </div>
          <div className="text-xs font-bold text-gray-400 mt-0.5 uppercase tracking-wide">
            Year Exp
          </div>
        </div>
      </div>

      <div className="w-full text-left space-y-2 pt-2 border-t border-gray-50">
        <h4 className="text-lg font-black text-gray-700 tracking-tight">
          About
        </h4>
        <p className="text-sm font-medium text-gray-500 leading-relaxed tracking-normal text-justify sm:text-left">
          Dr. {doctor.doctorName} specializes in non-invasive cardiology and preventative heart care.
          With over a decade of clinical excellence at top-tier institutions,
          she combines advanced diagnostic technology with a patient-centric
          approach to cardiovascular health.
        </p>
        <p className="text-2xl text-slate-500">Consultation Fee</p>
        <p className="text-cyan-700 font-bold text-3xl flex items-center gap-1">
          <HiCurrencyDollar />
          {doctor.consultationFee}
        </p>
      </div>
    </div>
  );
};

export default DoctorDetailsCard;
