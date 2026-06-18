import React from "react";
import { Calendar, Users, DollarSign, Star } from "lucide-react";

const HomeCard = () => {
  // Dynamic card data matching image_916ce7.png layout
  const analyticsData = [
    {
      title: "TODAY'S VISITS",
      value: "08",
      change: "+12%",
      isPositive: true,
      icon: <Calendar className="w-5 h-5 text-[#006694]" />,
      iconBg: "bg-[#006694]/10",
    },
    {
      title: "TOTAL PATIENTS",
      value: "1,284",
      change: "+4%",
      isPositive: true,
      icon: <Users className="w-5 h-5 text-[#014d34]" />,
      iconBg: "bg-[#014d34]/10",
    },
    {
      title: "MONTHLY EARNINGS",
      value: "$12,450",
      change: "+8%",
      isPositive: true,
      icon: <DollarSign className="w-5 h-5 text-[#006694]" />,
      iconBg: "bg-[#006694]/10",
    },
    {
      title: "AVG. RATING",
      value: "4.9 / 5",
      badge: "Top Rated",
      icon: <Star className="w-5 h-5 text-amber-500" fill="currentColor" />,
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-white">
      {/* Top Welcome / Greeting Section */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Morning, Sarah.
        </h1>
        <p className="text-gray-500 text-sm sm:text-base font-medium">
          You have{" "}
          <span className="text-gray-800 font-semibold">8 appointments</span>{" "}
          scheduled for today. Your first patient is in 15 minutes.
        </p>
      </div>

      {/* Analytics Responsive Grid System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((data, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[160px]"
          >
            {/* Upper row: Icon & Status Badge */}
            <div className="flex items-center justify-between w-full">
              <div
                className={`${data.iconBg} p-3 rounded-2xl flex items-center justify-center`}
              >
                {data.icon}
              </div>

              {/* Conditional Indicator Badge rendering */}
              {data.change && (
                <span className="text-[11px] font-bold text-[#014d34] bg-[#014d34]/5 px-2.5 py-1 rounded-lg">
                  {data.change}
                </span>
              )}
              {data.badge && (
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg tracking-wide">
                  {data.badge}
                </span>
              )}
            </div>

            {/* Lower row: Metadata & Figures */}
            <div className="mt-5 space-y-1">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {data.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {data.value}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
