"use client";

import React, { useState } from "react";
import { Calendar, Clock, Plus, Save } from "lucide-react";

const AddScheduleForm = () => {
  const [appointmentDate, setAppointmentDate] = useState("2026-06-19");
  const [selectedTime, setSelectedTime] = useState("");
  const [slotsList, setSlotsList] = useState([]);
  const availableHours = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const handleAddSlot = () => {
    if (!selectedTime) {
      alert("Please select a valid time slot first!");
      return;
    }
    if (slotsList.includes(selectedTime)) {
      alert("This slot is already added.");
      return;
    }
    setSlotsList([...slotsList, selectedTime]);
  };

  const handleSaveSchedule = () => {
    const schedule = {
      date: appointmentDate,
      slots: slotsList,
    };
    console.log(schedule);
    alert("Schedule saved successfully!");
  };

  const handleRemoveSlot = (indexToRemove) => {
    setSlotsList(slotsList.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-8 max-w-2xl mx-auto shadow-sm my-8">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Add Schedule
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm font-medium">
          Select your available consultation date and time slots.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
            Appointment Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full bg-[#f1f5f9]/60 border border-gray-200/80 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
            Available Time Slots
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-[#f1f5f9]/60 border border-gray-200/80 rounded-xl py-3 pl-11 pr-10 text-sm font-semibold text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all cursor-pointer"
            >
              <option value="">Choose a time</option>
              {availableHours.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {slotsList.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
          <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
            Selected Slots:
          </h4>
          <div className="flex flex-wrap gap-2">
            {slotsList.map((slot, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 bg-[#149ddd]/10 text-[#006694] font-semibold text-xs px-3 py-1.5 rounded-lg border border-[#149ddd]/20"
              >
                {slot}
                <button
                  onClick={() => handleRemoveSlot(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-1 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleAddSlot}
          className="w-full bg-[#149ddd] hover:bg-[#1080b5] text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-[#149ddd]/10 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
        >
          <Plus className="w-4 h-4" strokeWidth={3} />
          <span>Add Slot</span>
        </button>
        <button
          onClick={handleSaveSchedule}
          className="w-full bg-[#e2e8f0] hover:bg-[#cbd5e1] text-gray-700 font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all border border-gray-200/50 active:scale-[0.99]"
        >
          <Save className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
          <span>Save Schedule</span>
        </button>
      </div>
    </div>
  );
};

export default AddScheduleForm;
