"use client";

import React, { useState } from "react";
import { Calendar, Clock, ChevronDown } from "lucide-react";

const BookingFormClient = ({ schedules, doctor }) => {
  console.log(schedules);
  const [selectedDateObj, setSelectedDateObj] = useState(schedules[0] || null);
  const [selectedSlot, setSelectedSlot] = useState(
    schedules[0]?.slots?.[0] || "",
  );

  const handleDateChange = (e) => {
    const targetDate = e.target.value;
    const foundSchedule = schedules.find((s) => s.computedDate === targetDate);

    if (foundSchedule) {
      setSelectedDateObj(foundSchedule);
      setSelectedSlot(foundSchedule.slots?.[0] || "");
    }
  };

  const handleBookingSubmit = (e) => {
    // e.preventDefault();
    if (!selectedDateObj || !selectedSlot) return;

    const bookingPayload = {
      scheduleId: selectedDateObj._id,
      doctorId: selectedDateObj.doctorId,
      day: selectedDateObj.day,
      date: selectedDateObj.computedDate,
      timeSlot: selectedSlot,
      doctorName: doctor.doctorName,
    };

    console.log("Premium Received Payload:", bookingPayload);
  };

  return (
    <form
      action="/api/checkout_sessions"
      method="POST"
      onSubmit={handleBookingSubmit}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block pl-1">
            Appointment Date
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#006694] transition-colors">
              <Calendar className="w-[18px] h-[18px]" />
            </div>

            <select
              value={selectedDateObj?.computedDate || ""}
              onChange={handleDateChange}
              className="w-full bg-[#f8fafc] hover:bg-gray-50/80 border border-gray-200/80 focus:border-[#006694]/50 rounded-[1.25rem] py-4 pl-12 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 appearance-none cursor-pointer transition-all shadow-sm/5"
            >
              {schedules.map((item) => (
                <option key={item._id} value={item.computedDate}>
                  {item.computedDate} &nbsp;•&nbsp; {item.day}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-500 transition-colors">
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block pl-1">
            Available Time Slots
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-gray-400 group-focus-within:text-[#006694] transition-colors">
              <Clock className="w-[18px] h-[18px]" />
            </div>

            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full bg-[#f8fafc] hover:bg-gray-50/80 border border-gray-200/80 focus:border-[#006694]/50 rounded-[1.25rem] py-4 pl-12 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 appearance-none cursor-pointer transition-all shadow-sm/5"
            >
              {selectedDateObj?.slots && selectedDateObj.slots.length > 0 ? (
                selectedDateObj.slots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))
              ) : (
                <option disabled>No active slots available</option>
              )}
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-gray-500 transition-colors">
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <input type="hidden" name="amount" value={doctor.consultationFee} />
        <input type="hidden" name="doctorId" value={doctor.doctorId} />
        <input type="hidden" name="doctorName" value={doctor.doctorName} />
        <input
          type="hidden"
          name="bookingPayload"
          value={JSON.stringify({
            scheduleId: selectedDateObj._id,
            doctorId: selectedDateObj.doctorId,
            day: selectedDateObj.day,
            date: selectedDateObj.computedDate,
            timeSlot: selectedSlot,
            doctorName: doctor.doctorName,
            profileImage:doctor.profileImage,
          })}
        />
        <button
          type="submit"
          className="w-full sm:w-auto min-w-[160px] bg-[#006694] hover:bg-[#00557c] text-white font-bold text-sm tracking-wide px-8 py-4 rounded-xl transition-all shadow-md shadow-[#006694]/10 hover:shadow-lg hover:shadow-[#006694]/20 active:scale-[0.98] text-center"
        >
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookingFormClient;
