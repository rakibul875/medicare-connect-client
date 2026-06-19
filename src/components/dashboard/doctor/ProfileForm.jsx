"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Building,
  Calendar,
  Clock,
  Image,
  Plus,
  CheckCircle,
  ShieldAlert,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";


const ProfileForm = () => {
  const {data:session} = authClient.useSession();
  const user= session?.user
  console.log(user)
  // Toggle states
  const [hasProfile, setHasProfile] = useState(null); // Jodi backend data thake, true hobe
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "Cardiology",
    qualifications: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    profileImage: "",
    availableDays: [],
    availableSlots: [],
    verificationStatus: "Pending",
  });

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeSlots = [
    "09:00 AM - 12:00 PM",
    "02:00 PM - 05:00 PM",
    "06:00 PM - 09:00 PM",
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const imgBBAPIKey = process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY;
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`,
        {
          method: "POST",
          body: data,
        },
      );
      const result = await response.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, profileImage: result.data.url }));
        alert("Image uploaded successfully to ImgBB!");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (day) => {
    setFormData((prev) => {
      const currentDays = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: currentDays };
    });
  };

  const handleSlotToggle = (slot) => {
    setFormData((prev) => {
      const currentSlots = prev.availableSlots.includes(slot)
        ? prev.availableSlots.filter((s) => s !== slot)
        : [...prev.availableSlots, slot];
      return { ...prev, availableSlots: currentSlots };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Data = {
      ...formData,
      doctorId: user?.id,
    };
    console.log(Data)
    setHasProfile(true);
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {hasProfile && !isFormOpen && (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {formData.doctorName || "Dr. Sarah Chen"}
              </h2>
              <p className="text-sm font-semibold text-[#006694]">
                {formData.specialization}
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 mt-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Verification: {formData.verificationStatus}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#006694] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#00557c] transition-colors"
          >
            Edit Medical Profile Details
          </button>
        </div>
      )}

      {!hasProfile && !isFormOpen && (
        <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-[2rem] border border-gray-100 p-12 text-center space-y-4 shadow-sm">
          <div className="bg-[#006694]/5 text-[#006694] p-4 rounded-full inline-block">
            <User className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            No Doctor Profile Found
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto font-medium">
            Please set up your healthcare provider details to activate client
            scheduling panels.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 bg-[#149ddd] hover:bg-[#1080b5] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            <span>Create Profile Now</span>
          </button>
        </div>
      )}

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Setup Provider Credentials
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Complete fields explicitly matching corporate platform registry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Doctor Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Sarah Chen"
                  className="w-full bg-[#f1f5f9]/60 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Specialization
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full bg-[#f1f5f9]/60 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Qualifications
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  placeholder="e.g. MBBS, FCPS"
                  className="w-full bg-[#f1f5f9]/60 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Experience (Years)
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  className="w-full bg-[#f1f5f9]/60 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Consultation Fee ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="number"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  className="w-full bg-[#f1f5f9]/60 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Hospital Affiliation
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="e.g. Metro Health Hospital"
                  className="w-full bg-[#f1f5f9]/60 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/40 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Profile Image
            </label>
            <div className="flex items-center gap-4 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <label
                htmlFor="profile-upload"
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer shadow-sm inline-flex items-center gap-2 transition-all"
              >
                <Image className="w-4 h-4 text-gray-400" />
                <span>
                  {isUploading ? "Uploading..." : "Choose Image File"}
                </span>
              </label>
              {formData.profileImage && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Uploaded ready
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Available Days
            </label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => {
                const isChecked = formData.availableDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => handleCheckboxChange(day)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${isChecked ? "bg-[#006694] border-[#006694] text-white" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Clock className="w-4 h-4" /> Available Slots
            </label>
            <div className="flex flex-wrap gap-3">
              {timeSlots.map((slot) => {
                const isSelected = formData.availableSlots.includes(slot);
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => handleSlotToggle(slot)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${isSelected ? "bg-[#149ddd] border-[#149ddd] text-white shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-3 rounded-xl border border-gray-200 text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#006694] hover:bg-[#00557c] text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all"
            >
              Save Doctor Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
