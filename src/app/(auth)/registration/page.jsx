// src/components/auth/RegisterForm.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegistrationMutation } from "@/redux/features/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterForm = () => {
  const router = useRouter();

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
    if (!formData.email) newErrors.email = "Email is required";
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
      // Prepare payload for API - No userName needed, backend will generate it
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        password: formData.password,
        role: "customer",
      };

      // Call registration API
      const result = await registration(payload).unwrap();

      // Handle success response
      if (result?.success || result?.data) {
        toast.success(
          result?.message ||
            "Registration successful! Please login to continue.",
        );

        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
        });

        // Redirect to login page
        router.push("/login");
      } else {
        // Handle unexpected response
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      // Handle API error response
      console.error("Registration error:", err);

      // Check for specific error messages
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.data?.errors) {
        // Handle array of errors
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

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0f7ff] via-[#f4f8ff] to-[#e8f4f8] pt-30 pb-10 px-4">
      {/* Mobile promo panel */}
      <div className="block lg:hidden bg-white border border-primary/10 shadow-lg shadow-primary/5 text-gray-800 px-4 py-8 rounded-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Join us today!
        </h2>
        <p className="text-gray-600">
          Create an account with your mobile number to get started
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center lg:max-w-3xl mx-auto p-4 lg:p-6 bg-white border border-primary/10 rounded-xl shadow-xl shadow-primary/5">
        {/* Desktop promo panel */}
        <div className="hidden lg:block lg:col-span-2 lg:h-full bg-linear-to-br from-primary to-primary/90 text-white p-8 rounded-lg shadow-lg shadow-primary/20">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Join us today!
          </h2>
          <p className="text-white/90">
            Create an account with your mobile number to get started
          </p>
        </div>

        {/* Right form panel */}
        <div className="lg:col-span-3 lg:pr-4 lg:py-4">
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
                "Create Account →"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-5 space-y-2">
            <Link
              href="/login"
              className="block text-sm text-gray-600 hover:text-gray-800 transition-colors text-center"
            >
              Already have an account?{" "}
              <span className="text-primary hover:text-primary/80 underline cursor-pointer font-medium">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
