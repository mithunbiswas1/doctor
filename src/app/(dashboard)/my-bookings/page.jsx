// src/app/(dashboard)/my-bookings/page.jsx

"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaStethoscope,
  FaComment,
  FaClock,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
} from "react-icons/fa";
import { useGetMyAppointmentsQuery } from "@/redux/features/appointmentApi";
import { baseUriBackend } from "@/redux/url/url";

export default function MyBookingsPage() {
  const { user } = useSelector((state) => state.auth);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    data: appointmentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyAppointmentsQuery();

  const appointments = appointmentsData?.data || [];

  const handleViewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: "bg-yellow-100 text-yellow-700", icon: FaClock },
      confirmed: { color: "bg-blue-100 text-blue-700", icon: FaCheckCircle },
      completed: { color: "bg-green-100 text-green-700", icon: FaCheckCircle },
      cancelled: { color: "bg-red-100 text-red-700", icon: FaExclamationCircle },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    const Icon = statusInfo.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusInfo.color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load bookings
          </h3>
          <p className="text-gray-600">
            {error?.data?.message || "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 text-sm mt-1">
            View all your appointment bookings
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <FaCalendarAlt className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* User Info Card */}
      {user && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              {user?.image ? (
                <Image
                  src={`${baseUriBackend}${user.image}`}
                  alt={user.fullName}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white font-bold text-lg">
                  {user?.fullName?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.fullName}</p>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaPhone className="w-3 h-3" />
                  {user?.phone}
                </span>
                {user?.email && (
                  <span className="flex items-center gap-1">
                    <FaEnvelope className="w-3 h-3" />
                    {user?.email}
                  </span>
                )}
              </div>
            </div>
            <div className="ml-auto">
              <span className="text-sm font-medium text-gray-500">
                Total Bookings: <span className="text-primary font-bold">{appointments.length}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <FaCalendarAlt className="w-16 h-16 text-gray-300" />
            <p className="text-xl font-medium text-gray-900">No bookings found</p>
            <p className="text-gray-500">
              You haven't made any appointments yet
            </p>
            <a
              href="/appointments"
              className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Status & Date */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {getStatusBadge(appointment.status)}
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(appointment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Problem */}
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <FaStethoscope className="w-3 h-3 text-primary" />
                      Problem:
                    </p>
                    <p className="text-sm text-gray-800 mt-0.5">{appointment.problem}</p>
                  </div>

                  {/* Message */}
                  {appointment.message && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <FaComment className="w-3 h-3 text-primary" />
                        Message:
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">{appointment.message}</p>
                    </div>
                  )}

                  {/* Patient Info */}
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaUser className="w-3 h-3 text-primary" />
                      {appointment.patientName}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaPhone className="w-3 h-3 text-primary" />
                      {appointment.patientPhone}
                    </span>
                    {appointment.patientEmail && (
                      <span className="flex items-center gap-1">
                        <FaEnvelope className="w-3 h-3 text-primary" />
                        {appointment.patientEmail}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewClick(appointment)}
                    className="px-3 py-1.5 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1"
                  >
                    <FaEye className="w-3 h-3" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Complete appointment information
                </p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                {selectedAppointment?.patientId?.image ? (
                  <Image
                    src={`${baseUriBackend}${selectedAppointment.patientId.image}`}
                    alt={selectedAppointment.patientName}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-2xl font-bold">
                    {selectedAppointment?.patientName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  {selectedAppointment.patientName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(selectedAppointment.status)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                  <FaPhone className="w-3 h-3 text-primary" />
                  {selectedAppointment.patientPhone}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                  <FaEnvelope className="w-3 h-3 text-primary" />
                  {selectedAppointment.patientEmail || "Not provided"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Problem / Reason
                </p>
                <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                  <FaStethoscope className="w-3 h-3 text-primary" />
                  {selectedAppointment.problem}
                </p>
              </div>
              {selectedAppointment.message && (
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Additional Message
                  </p>
                  <p className="text-sm text-gray-900 flex items-start gap-1 mt-1">
                    <FaComment className="w-3 h-3 text-primary mt-0.5" />
                    {selectedAppointment.message}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Appointment Date
                </p>
                <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                  <FaCalendarAlt className="w-3 h-3 text-primary" />
                  {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Booked On
                </p>
                <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                  <FaClock className="w-3 h-3 text-primary" />
                  {new Date(selectedAppointment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}