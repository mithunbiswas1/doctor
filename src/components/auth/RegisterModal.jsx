// src/components/auth/RegisterModal.jsx

"use client";

import { useState } from "react";
import { useRegistrationMutation } from "@/redux/features/authApi";
import { toast } from "sonner";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaTimes } from "react-icons/fa";

const RegisterModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [registration, { isLoading: regLoading }] = useRegistrationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        password: formData.password,
        role: "customer",
        is_prescribed: true,
      };

      const result = await registration(payload).unwrap();

      if (result?.success || result?.data) {
        toast.success(result?.message || "Patient registered successfully!");

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
        });

        onSuccess?.();
        onClose();
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);

      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.data?.errors) {
        if (Array.isArray(err.data.errors)) {
          err.data.errors.forEach((error) => toast.error(error));
        } else {
          toast.error(err.data.errors);
        }
      } else if (err?.error) {
        toast.error(err.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Add New Patient</h3>
            <p className="text-gray-600 text-sm mt-1">
              Create a new patient account
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaUser className="h-4 w-4 text-primary" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className={`bg-white border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaPhone className="h-4 w-4 text-primary" />
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-600">
                +1
              </span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className={`flex-1 bg-white border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-r-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaEnvelope className="h-4 w-4 text-primary" />
              Email <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email (optional)"
              className={`bg-white border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
              <FaLock className="h-4 w-4 text-primary" />
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password (min 6 characters)"
              className={`bg-white border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={regLoading}
            className={`w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 ${
              regLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {regLoading ? (
              <>
                <span className="inline-block animate-spin mr-2">⟳</span>
                Creating Account...
              </>
            ) : (
              "Add Patient →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
