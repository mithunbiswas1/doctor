// src/app/appointments/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaStethoscope,
  FaComment,
} from "react-icons/fa";
import { useCreateAppointmentMutation } from "@/redux/features/appointmentApi";

export default function AppointmentsPage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    problem: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        patientName: user.fullName || "",
        patientPhone: user.phone || "",
        patientEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName) newErrors.patientName = "Name is required";
    if (!formData.patientPhone)
      newErrors.patientPhone = "Phone number is required";
    if (!formData.problem) newErrors.problem = "Problem is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await createAppointment(formData).unwrap();

      if (result?.success || result?.data) {
        toast.success("Appointment booked successfully!");
        setFormData((prev) => ({
          ...prev,
          problem: "",
          message: "",
        }));
        router.push("/");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to book appointment. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f0f7ff] via-[#f4f8ff] to-[#e8f4f8] pt-30 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-primary/10 rounded-xl shadow-xl shadow-primary/5 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Book an Appointment
            </h1>
            <p className="text-gray-600 mt-2">
              Fill in the details below to schedule your appointment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                <FaUser className="h-4 w-4 text-primary" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`bg-white border ${
                  errors.patientName ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              {errors.patientName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.patientName}
                </p>
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
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`flex-1 bg-white border ${
                    errors.patientPhone ? "border-red-500" : "border-gray-300"
                  } rounded-r-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                />
              </div>
              {errors.patientPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.patientPhone}
                </p>
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
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleChange}
                placeholder="Enter your email (optional)"
                className="bg-white border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Problem */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                <FaStethoscope className="h-4 w-4 text-primary" />
                Problem / Reason for visit{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Briefly describe your problem"
                className={`bg-white border ${
                  errors.problem ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              {errors.problem && (
                <p className="text-red-500 text-xs mt-1">{errors.problem}</p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                <FaComment className="h-4 w-4 text-primary" />
                Additional Message{" "}
                <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Any additional details you'd like to share..."
                className="bg-white border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Booking...
                </>
              ) : (
                "Book Appointment →"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {user ? (
              "Your information has been auto-filled from your profile"
            ) : (
              <>
                If you're a new patient, an account will be created
                automatically with your phone number as password.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
