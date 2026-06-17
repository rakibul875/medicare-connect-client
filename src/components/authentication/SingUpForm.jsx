"use client";

import React, { useState } from "react";
import {
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Description,
  FieldError,
} from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const SingUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    status:'pending',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setLoading(true);

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY;
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formDataImage,
        },
      );
      const result = await response.json();

      if (result.success) {
        setImageUrl(result.data.url);
        alert("Photo uploaded successfully");
      } else {
        alert("Image upload failed. Try again.");
      }
    } catch (error) {
      alert("Network error during image upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalUserData = {
      ...formData,
      profilePhoto: imageUrl, 
      role: formData.role || "patient",
    };
    console.log("form Data",finalUserData)
    const { data, error } = await authClient.signUp.email({
      ...finalUserData,
    });

    console.log("Submitted Data object to Backend:", data);
    if (data) {
      alert("singUp Successful");
    } else {
      error.message;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-[#006694]">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join MediCare Connect platform today
          </p>
          <p className="text-sm text-gray-600 text-center">
            You have already an account?{" "}
            <Link
              href="/login"
              className="font-medium text-lg text-[#006694] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <TextField className="w-full">
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                name="name"
                type="text"
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </TextField>

            <TextField className="w-full">
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                name="email"
                type="email"
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </TextField>

            <TextField
              className="w-full"
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter your password"
                onChange={handleInputChange}
              />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>

            <TextField className="w-full">
              <Label className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                name="phone"
                type="tel"
                onChange={handleInputChange}
                required
                placeholder="Enter phone number (e.g., +8801xxx)"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </TextField>

            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-1">
                User Role
              </Label>
              <Select
                fullWidth
                placeholder="Select Role"
                onSelectionChange={(selected) =>
                  setFormData((prev) => ({ ...prev, role: selected }))
                }
              >
                <Select.Trigger className="w-full border border-gray-300 rounded-md p-2 bg-white flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 rounded-md shadow-lg">
                  <ListBox>
                    <ListBox.Item
                      id="doctor"
                      textValue="Doctor"
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Doctor
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="patient"
                      textValue="Patient"
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Patient
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-1">
                Gender
              </Label>
              <Select
                fullWidth
                placeholder="Select Gender"
                onSelectionChange={(selected) =>
                  setFormData((prev) => ({ ...prev, gender: selected }))
                }
              >
                <Select.Trigger className="w-full border border-gray-300 rounded-md p-2 bg-white flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 rounded-md shadow-lg">
                  <ListBox>
                    <ListBox.Item
                      id="male"
                      textValue="Male"
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Male
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="female"
                      textValue="Female"
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Female
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-gray-700">
                Upload Profile Photo
              </span>
              <label className="w-full flex flex-col items-center px-4 py-3 bg-white text-gray-500 rounded-md border border-dashed border-gray-300 tracking-wide uppercase cursor-pointer hover:bg-gray-50 transition-colors">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="mt-1 text-xs lowercase">
                  {loading
                    ? "Uploading to Imgbb..."
                    : imageFile
                      ? imageFile.name
                      : "Select a picture"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {imageUrl && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Live Link generated from Imgbb
                </p>
              )}
            </div>
          </div>

          {/* Submit Action Button */}
          <div>
            <button
              type="submit"
              disabled={loading || !imageUrl}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#006694] hover:bg-[#00557c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006694] transition-all ${
                loading || !imageUrl ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing Images..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUpForm;
