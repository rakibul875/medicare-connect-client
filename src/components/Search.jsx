"use client";

import Link from "next/link";
import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import FindDoctor from "./FindDoctor"; // পাথ ঠিক করা হয়েছে

export default function Search({ initialDoctors }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("");
  const [doctors, setDoctors] = useState(initialDoctors || []); // শুরুতে সার্ভারের ডেটা সেট থাকবে
  const [loading, setLoading] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // সার্চ ট্র্যাকিং এর জন্য

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category !== "All") params.append("category", category);

    if (price) {
      const [min, max] = price.split("-");
      params.append("minPrice", min);
      params.append("maxPrice", max);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?${params}`,
      );
      const data = await res.json();
      setDoctors(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
      setShowRefresh(false);
    }
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setPrice("");
    setDoctors(initialDoctors);
    setHasSearched(false);
    setShowRefresh(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50/30">
      {/* Search Layout Panel */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        {/* Search Input field */}
        <input
          type="text"
          placeholder="Search doctor name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowRefresh(true);
          }}
          className="border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 focus:border-[#006694]/30 transition-all"
        />

        {/* Category Field */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setShowRefresh(true);
          }}
          className="border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 focus:border-[#006694]/30 transition-all bg-white"
        >
          <option>All</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
          <option>Pediatrics</option>
          <option>Dermatology</option>
        </select>

        {/* Price Level Field */}
        <select
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setShowRefresh(true);
          }}
          className="border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#006694]/5 focus:border-[#006694]/30 transition-all bg-white"
        >
          <option value="">All Prices</option>
          <option value="0-500">৳ 0 - 500</option>
          <option value="501-1000">৳ 501 - 1000</option>
          <option value="1001-2000">৳ 1001 - 2000</option>
        </select>

        {/* Form Action Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#006694] text-white text-xs sm:text-sm font-bold tracking-wide rounded-xl hover:bg-[#00557c] disabled:bg-slate-300 transition-colors shadow-sm active:scale-95 py-3 md:py-0"
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {/* Dynamic Reset Handler */}
        <div className="flex justify-center items-center">
          {showRefresh && (
            <button
              onClick={handleReset}
              className="border border-slate-200 text-slate-500 rounded-xl p-3 hover:bg-slate-50 transition active:scale-95"
              title="Reset Filters"
            >
              <FiRefreshCw size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="text-center py-12 font-bold text-slate-500 animate-pulse">
          Loading specialists...
        </div>
      )}

      {/* Dynamic Mapping List Layer */}
      {!loading && doctors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {doctors.map((doctor) => (
            <FindDoctor key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

      {/* No Data Found state */}
      {!loading && doctors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-400 font-bold text-xs sm:text-sm">
          {hasSearched
            ? "No doctors found matching your custom configurations."
            : "No doctors available at the moment."}
        </div>
      )}
    </div>
  );
}
