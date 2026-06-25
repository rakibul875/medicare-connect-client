import { getDoctorSchedule } from "@/lib/api/getDoctorSchedule";
import React from "react";
import BookingFormClient from "./BookingFormClient";
import { getUserSession } from "@/lib/api/getUsers";
import { redirect } from "next/navigation";

const DoctorBookingCard = async ({ doctorId, doctor }) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }
  if (user?.status === "suspend") {
    return (
      <div className="text-center p-10">
        <h2 className="text-red-500 font-bold">
          Your account has been suspended.
        </h2>
      </div>
    );
  }
  const doctorSchedule = await getDoctorSchedule(doctorId);

  if (!doctorSchedule || doctorSchedule.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-[2rem] border border-gray-100 p-12 text-center shadow-sm">
        <p className="text-gray-400 font-semibold text-sm tracking-wide">
          No active availability schedules or dates found for this provider.
        </p>
      </div>
    );
  }

  const getNextDateForDay = (targetDayStr) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const currentDayIndex = today.getDay();
    const targetDayIndex = daysOfWeek.indexOf(targetDayStr);

    if (targetDayIndex === -1) return null;

    let daysUntilTarget = targetDayIndex - currentDayIndex;

    if (daysUntilTarget < 0) {
      daysUntilTarget += 7;
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilTarget);
    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const date = String(nextDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };
  const processedSchedules = doctorSchedule
    .map((item) => ({
      ...item,
      computedDate: getNextDateForDay(item.day),
    }))
    .filter((item) => item.computedDate !== null);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[2rem] border border-gray-100 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
          Add Schedule / Book Appointment
        </h3>
        <p className="text-xs font-semibold text-gray-400 mt-1">
          Select your available consultation date and time slots.
        </p>
      </div>
      <BookingFormClient schedules={processedSchedules} doctor={doctor} />
    </div>
  );
};

export default DoctorBookingCard;
