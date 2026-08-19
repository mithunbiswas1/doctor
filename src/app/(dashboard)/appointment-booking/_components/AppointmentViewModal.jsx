// src/app/(dashboard)/appointment-booking/_components/AppointmentViewModal.jsx

"use client";

import Image from "next/image";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaStethoscope,
  FaComment,
  FaClock,
  FaUserTag,
} from "react-icons/fa";
import { baseUriBackend } from "@/redux/url/url";

const AppointmentViewModal = ({ appointment, isOpen, onClose }) => {
  if (!isOpen || !appointment) return null;

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return statusMap[status] || statusMap.pending;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Appointment Details
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Complete appointment information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {appointment?.patientId?.image ? (
              <Image
                src={`${baseUriBackend}${appointment.patientId.image}`}
                alt={appointment.patientName}
                width={64}
                height={64}
                className="object-cover w-full h-full"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-2xl font-bold">
                {appointment?.patientName?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">
              {appointment.patientName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${getStatusBadge(
                  appointment.status,
                )}`}
              >
                {appointment.status}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {appointment.patientId ? "Registered Patient" : "Guest"}
              </span>
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
              {appointment.patientPhone}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Email
            </p>
            <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
              <FaEnvelope className="w-3 h-3 text-primary" />
              {appointment.patientEmail || "Not provided"}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Problem / Reason
            </p>
            <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
              <FaStethoscope className="w-3 h-3 text-primary" />
              {appointment.problem}
            </p>
          </div>
          {appointment.message && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Additional Message
              </p>
              <p className="text-sm text-gray-900 flex items-start gap-1 mt-1">
                <FaComment className="w-3 h-3 text-primary mt-0.5" />
                {appointment.message}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Appointment Date
            </p>
            <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
              <FaCalendarAlt className="w-3 h-3 text-primary" />
              {new Date(appointment.appointmentDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Created At
            </p>
            <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
              <FaClock className="w-3 h-3 text-primary" />
              {new Date(appointment.createdAt).toLocaleString()}
            </p>
          </div>
          {appointment.createdBy && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Created By
              </p>
              <p className="text-sm text-gray-900 flex items-center gap-1 mt-1">
                <FaUserTag className="w-3 h-3 text-primary" />
                {appointment.createdBy?.fullName || "System"}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewModal;
