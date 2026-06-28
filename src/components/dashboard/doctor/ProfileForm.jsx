"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Building,
  Image,
  Plus,
  CheckCircle,
  ShieldAlert,
  Edit,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { doctorProfile } from "@/lib/post/doctor-profile";
import DoctorCreateForm from "./DoctorCreateForm";
import toast from "react-hot-toast";


export default function ProfileForm({ doctorId, doctor, onSaveProfile }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  
  const [currentDoctor, setCurrentDoctor] = useState(doctor);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


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
        setImageUrl(result.data.url);
        toast.success("Image uploaded successfully to ImgBB!");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      toast.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newDoctorData = {
      doctorName: formData.get("doctorName"),
      specialization: formData.get("specialization"),
      qualifications: formData.get("qualifications"),
      experience: formData.get("experience"),
      consultationFee: formData.get("consultationFee"),
      hospitalName: formData.get("hospitalName"),
      profileImage: imageUrl,
      verificationStatus: "Pending",
      doctorId: user?.id || doctorId,
    };

    const res = await doctorProfile(newDoctorData);
    if (res?.insertedId) {
      toast.success("Submit Successful");
      setCurrentDoctor(newDoctorData); 
      setIsSubmitted(true);

    }

    if (onSaveProfile) {
      await onSaveProfile(newDoctorData);
    }
  };


  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-[2rem] border border-gray-100 p-12 text-center space-y-4 shadow-sm">
          <div className="bg-green-50 text-green-600 p-4 rounded-full inline-block">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Profile Created Successfully
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto font-medium">
            Your healthcare provider details have been submitted and are
            currently pending verification.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsOpenForm(false);
            }}
            className="mt-2 bg-[#006694] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#00557c] transition-colors"
          >
            View Profile Info
          </button>
        </div>
      </div>
    );
  }


  if (currentDoctor && Object.keys(currentDoctor).length > 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
          <div className="flex justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
              <div className="relative w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
                {currentDoctor.profileImage ? (
                  <img
                    src={currentDoctor.profileImage}
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
                  {currentDoctor.doctorName}
                </h2>
                <p className="text-sm font-semibold text-[#006694]">
                  {currentDoctor.specialization}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 mt-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>
                    Verification:{" "}
                    {currentDoctor.verificationStatus || "Pending"}
                  </span>
                </div>
              </div>
            </div>
            <div className="">
                <DoctorCreateForm doctor={doctor}/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-medium text-gray-700">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-xs text-gray-400 block uppercase">
                Qualifications
              </span>
              {currentDoctor.qualifications}
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-xs text-gray-400 block uppercase">
                Experience
              </span>
              {currentDoctor.experience} Years
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-xs text-gray-400 block uppercase">
                Consultation Fee
              </span>
              {currentDoctor.consultationFee
                ? `$${currentDoctor.consultationFee}`
                : "N/A"}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-sm font-medium text-gray-700">
            <span className="text-xs text-gray-400 block uppercase">
              Hospital Affiliation
            </span>
            {currentDoctor.hospitalName}
          </div>
        </div>
      </div>
    );
  }


  if (!isOpenForm) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-[2rem] border border-gray-100 p-12 text-center space-y-4 shadow-sm">
          <div className="bg-[#006694]/5 text-[#006694] p-4 rounded-full inline-block">
            <User className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            No Doctor Profile Found
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto font-medium">
            Please set up your healthcare provider details to complete your
            registration.
          </p>
          <button
            onClick={() => setIsOpenForm(true)}
            className="inline-flex items-center gap-2 bg-[#149ddd] hover:bg-[#1080b5] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            <span>Create Profile Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
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
              defaultValue="Cardiology"
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
              <span>{isUploading ? "Uploading..." : "Choose Image File"}</span>
            </label>
            {imageUrl && (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Uploaded ready
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setIsOpenForm(false)}
            className="border border-gray-200 bg-transparent text-gray-500 hover:bg-gray-50 font-semibold rounded-xl px-5 py-2.5 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className={`bg-[#006694] text-white font-semibold rounded-xl px-6 py-2.5 text-sm ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#00557c]"}`}
          >
            Create Profile
          </button>
        </div>
      </form>
    </div>
  );
}
