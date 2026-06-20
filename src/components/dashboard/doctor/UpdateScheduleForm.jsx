"use client";

import React, { useState } from "react";
import { Clock, Plus, Save, Calendar, X, Pencil } from "lucide-react";
import { handelScheduleUpdate } from "@/lib/post/doctorSchedule";
import { useRouter } from "next/navigation";

const UpdateScheduleForm = ({ day, schedule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [slotsList, setSlotsList] = useState([]);
  const router = useRouter();
  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const availableHours = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const handleOpenModal = () => {
    if (day) {
      setSelectedDays([day]);
    }
    if (schedule && schedule.slots) {
      setSlotsList(schedule.slots);
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDays([]);
    setSlotsList([]);
    setSelectedTime("");
    setIsOpen(false);
  };

  const handleDayToggle = (dayName) => {
    if (selectedDays.includes(dayName)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayName));
    } else {
      setSelectedDays([...selectedDays, dayName]);
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();

    if (selectedDays.length === 0) {
      alert("Please select at least one day first!");
      return;
    }
    if (!selectedTime) {
      alert("Please select a valid time slot first!");
      return;
    }
    if (slotsList.includes(selectedTime)) {
      alert("This slot is already added.");
      return;
    }
    setSlotsList([...slotsList, selectedTime]);
    setSelectedTime("");
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();

    if (selectedDays.length === 0) {
      alert("Please select at least one day!");
      return;
    }
    if (slotsList.length === 0) {
      alert("Please add at least one time slot before saving!");
      return;
    }

    const formattedScheduleList = selectedDays.map((selectedDay) => ({
      _id: schedule?._id || undefined,
      doctorId: schedule?.doctorId || "",
      day: selectedDay,
      slots: slotsList,
    }));

    console.log("Updated Data Structure:", formattedScheduleList);

    const res = await handelScheduleUpdate(
      schedule?.doctorId,
      schedule?.day,
      formattedScheduleList,
    );
    if (res.success) {
      alert("Time slots updated successfully!");
      router.refresh();
    } else {
      alert(res.message || "Something went wrong!");
    }

    handleCloseModal();
  };

  const handleRemoveSlot = (e, indexToRemove) => {
    e.preventDefault();
    setSlotsList(slotsList.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={handleOpenModal}
        className="text-gray-400 hover:text-[#006694] p-1.5 sm:p-2 rounded-xl hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
        title="Edit Slot"
      >
        <Pencil className="w-3.5 h-3.5 sm:w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative p-6 sm:p-8 border-b border-gray-50 bg-slate-50/50 flex flex-col items-start">
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-[#149ddd]/10 text-[#006694] rounded-xl flex items-center justify-center shadow-sm">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    Edit Schedule ({day})
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    Modify the active time slots for this specific schedule.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSaveSchedule}
              className="p-6 sm:p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto"
            >
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Select Days (Multiple choice)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {daysOfWeek.map((dayName, idx) => {
                    const isSelected = selectedDays.includes(dayName);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDayToggle(dayName)}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#149ddd] text-white border-[#149ddd] shadow-sm shadow-[#149ddd]/20"
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {dayName}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Available Time Slots
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-10 text-sm font-semibold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all cursor-pointer"
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

              {slotsList.length > 0 && (
                <div className="p-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                  <h4 className="text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wide">
                    Active Slots for:{" "}
                    {selectedDays.join(", ") || "Selected Days"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {slotsList.map((slot, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 bg-[#149ddd]/10 text-[#006694] font-semibold text-xs px-3 py-1.5 rounded-lg border border-[#149ddd]/20"
                      >
                        {slot}
                        <button
                          type="button"
                          onClick={(e) => handleRemoveSlot(e, index)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-1 font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-500 font-semibold rounded-xl px-4 py-2 text-sm hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="bg-[#149ddd] hover:bg-[#1080b5] text-white font-bold py-2 px-4 rounded-xl text-sm shadow-sm flex items-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                  <span>Add Slot</span>
                </button>

                <button
                  type="submit"
                  className="bg-[#006694] hover:bg-[#00557c] text-white font-semibold rounded-xl px-5 py-2 text-sm shadow-sm flex items-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                >
                  <Save className="w-4 h-4" strokeWidth={2.5} />
                  <span>Save Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateScheduleForm;
