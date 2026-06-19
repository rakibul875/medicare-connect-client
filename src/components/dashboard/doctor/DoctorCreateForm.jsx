"use client";

import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Building,
  Image as ImageIcon,
  CheckCircle,
  X,
  Edit,
} from "lucide-react";
import { Button, Modal, Surface } from "@heroui/react";
import { Envelope } from "@gravity-ui/icons";
import { updateDoctorProfile } from "@/lib/post/doctor-profile";


export default function DoctorCreateForm({ doctor }) {
  const [isOpen, setIsOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState(
    doctor?.profileImage || "https://i.ibb.co/zVqTgyFb/download-7.jpg",
  );
  const [isUploading, setIsUploading] = useState(false);

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
        alert("Image uploaded successfully to ImgBB!");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const doctorFormData = {
      doctorId: doctor?.doctorId,
      doctorName: formData.get("doctorName"),
      specialization: formData.get("specialization"),
      qualifications: formData.get("qualifications"),
      experience: formData.get("experience"),
      consultationFee: formData.get("consultationFee"),
      hospitalName: formData.get("hospitalName"),
      profileImage: imageUrl,
      verificationStatus: doctor?.verificationStatus || "Pending",
    };

    const res = await updateDoctorProfile(doctor?._id, doctorFormData);
    console.log(res);
    if (res.modifiedCount > 0) {
      alert("Profile Update Successful!");
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Button
        type="button"
        onPress={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 font-bold px-4 py-2.5 rounded-xl shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition-all"
      >
        <Edit className="w-4 h-4 text-gray-500" />
        <span>Update Profile</span>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="max-w-3xl mx-auto"
        scrollBehavior="inside"
      >
        <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
          <Modal.Container placement="center" className="p-4">
            <Modal.Dialog className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-2xl">
              <Modal.Header className="relative p-6 sm:p-8 border-b border-gray-50 bg-slate-50/50 flex flex-col items-start">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-11 h-11 bg-[#149ddd]/10 text-[#006694] rounded-xl flex items-center justify-center shadow-sm">
                    <Envelope className="size-5" />
                  </div>
                  <div>
                    <Modal.Heading className="text-xl font-bold text-gray-900 tracking-tight">
                      Update Provider Credentials
                    </Modal.Heading>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      Explicitly matching corporate platform registry
                    </p>
                  </div>
                </div>
              </Modal.Header>

              <Modal.Body className="p-6 sm:p-8 max-h-[calc(100vh-220px)] overflow-y-auto">
                <Surface
                  variant="default"
                  className="bg-transparent border-none shadow-none p-0"
                >
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Doctor Name */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Doctor Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="text"
                            name="doctorName"
                            defaultValue={doctor?.doctorName || "Anastasia"}
                            placeholder="e.g. Dr. Sarah Chen"
                            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all"
                          />
                        </div>
                      </div>

                      {/* Specialization */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Specialization
                        </label>
                        <select
                          name="specialization"
                          defaultValue={doctor?.specialization || "Neurology"}
                          className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 px-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all appearance-none cursor-pointer"
                        >
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Dermatology">Dermatology</option>
                        </select>
                      </div>

                      {/* Qualifications */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Qualifications
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="text"
                            name="qualifications"
                            defaultValue={
                              doctor?.qualifications || "Placeat nobis illum"
                            }
                            placeholder="e.g. MBBS, FCPS"
                            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all"
                          />
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Experience (Years)
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="number"
                            name="experience"
                            defaultValue={doctor?.experience || "14"}
                            placeholder="e.g. 10"
                            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all"
                          />
                        </div>
                      </div>

                      {/* Consultation Fee */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Consultation Fee ($)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="number"
                            name="consultationFee"
                            defaultValue={doctor?.consultationFee || "14"}
                            placeholder="e.g. 150"
                            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all"
                          />
                        </div>
                      </div>

                      {/* Hospital Affiliation */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Hospital Affiliation
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="text"
                            name="hospitalName"
                            defaultValue={doctor?.hospitalName || "Eagan Bass"}
                            placeholder="e.g. Metro Health Hospital"
                            className="w-full bg-gray-50/80 border border-gray-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#149ddd]/30 focus:border-[#149ddd] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Profile Image
                      </label>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all">
                        <div className="flex items-center gap-3">
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
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-sm inline-flex items-center gap-2 transition-all"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                            <span>
                              {isUploading ? "Uploading..." : "Change Image"}
                            </span>
                          </label>
                          {imageUrl && (
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-lg">
                              <CheckCircle className="w-3.5 h-3.5" /> Present
                            </span>
                          )}
                        </div>
                        {imageUrl && (
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                            <img
                              src={imageUrl}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="light"
                        onPress={() => setIsOpen(false)}
                        className="text-gray-500 font-semibold rounded-xl px-4 py-2 text-sm hover:bg-gray-100 transition-all"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isUploading}
                        className={`bg-[#006694] text-white font-semibold rounded-xl px-5 py-2 text-sm shadow-sm transition-all ${
                          isUploading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#00557c]"
                        }`}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
