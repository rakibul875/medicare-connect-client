"use client";
import React from "react";
import PrescriptionEditForm from "./PrescriptionEditForm";


const PrescriptionCardList = ({ prescriptions }) => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prescriptions && prescriptions.length > 0 ? (
        prescriptions.map((item) => {
          const formattedDate = new Date(
            item.prescriptionAt,
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={item._id}
              className="bg-white rounded-[1.5rem] border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between border-b border-gray-50 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-bold text-[#006694] uppercase tracking-wider block">
                      Patient Name
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-0.5">
                      {item.patientName ||
                        `Patient (${item.patientId?.slice(-5) || "N/A"})`}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                    {formattedDate}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Diagnosis / Symptoms
                  </span>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5 line-clamp-1">
                    {item.diagnosis || "No Diagnosis Provided"}
                  </p>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Prescription Details
                  </span>
                  <p className="text-sm font-normal text-gray-600 mt-1 bg-gray-50/50 p-3 rounded-xl border border-gray-50 min-h-[60px] whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50/60 mt-auto">
                <span className="text-[11px] text-gray-400 font-medium">
                  Appt: #{item.appointmentId?.slice(-5)}
                </span>

                {/* <button
                  onClick={() => handleEdit(item._id)}
                  className="bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  Edit
                </button> */}
                <PrescriptionEditForm prescriptionId={item._id}/>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full text-center py-16 bg-white rounded-[1.5rem] border border-gray-100">
          <p className="text-gray-400 font-semibold text-sm">
            No prescriptions recorded yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionCardList;
