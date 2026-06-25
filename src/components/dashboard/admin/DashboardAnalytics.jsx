"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Users,
  UserCheck,
  CalendarCheck,
  DollarSign,
  BarChart3,
} from "lucide-react";

const DashboardAnalytics = ({
  totalAppointment,
  doctor,
  totalUser,
  totalAmount,
}) => {
  const rawData = {
    totalPayment: totalAmount,
    totalAppointment: totalAppointment,
    totalDoctor: doctor,
    totalUser: totalUser,
  };

  const chartData = [
    { name: "Users", count: rawData.totalUser, color: "#3b82f6" },
    { name: "Appointments", count: rawData.totalAppointment, color: "#10b981" },
    { name: "Doctors", count: rawData.totalDoctor, color: "#8b5cf6" },
  ];

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${rawData.totalPayment.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      bgColor: "bg-emerald-50 border-emerald-100",
    },
    {
      label: "Total Active Users",
      value: rawData.totalUser.toLocaleString(),
      icon: <Users className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-50 border-blue-100",
    },
    {
      label: "Total Appointments",
      value: rawData.totalAppointment.toLocaleString(),
      icon: <CalendarCheck className="w-5 h-5 text-purple-600" />,
      bgColor: "bg-purple-50 border-purple-100",
    },
    {
      label: "Verified Doctors",
      value: rawData.totalDoctor.toLocaleString(),
      icon: <UserCheck className="w-5 h-5 text-amber-600" />,
      bgColor: "bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#006694]" />
          System Analytics Dashboard
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-400">
          Real-time transactional overview, appointment counts, and overall user
          metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white border rounded-2xl p-5 shadow-sm flex items-center justify-between transition-transform duration-200 hover:-translate-y-0.5`}
          >
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <span className="block text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                {card.value}
              </span>
            </div>
            <div
              className={`w-10 h-10 rounded-xl ${card.bgColor} border flex items-center justify-center flex-shrink-0`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 p-4 sm:p-6 rounded-3xl shadow-sm space-y-6">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Platform Distribution Chart
          </h3>
          <p className="text-[11px] sm:text-xs font-medium text-gray-400">
            Visual comparison across dynamic profiles and bookings.
          </p>
        </div>

        <div className="w-full h-80 sm:h-96 text-xs font-semibold">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                stroke="#94a3b8"
                fontSize={12}
                fontWeight={700}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                stroke="#94a3b8"
                fontSize={12}
                fontWeight={700}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "1rem",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]} maxBarSize={60}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
