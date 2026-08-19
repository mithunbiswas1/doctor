// src/app/(dashboard)/appointment-booking/page.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes as FaClose,
  FaClock,
  FaStethoscope,
  FaComment,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "sonner";
import {
  useGetAllAppointmentsQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "@/redux/features/appointmentApi";
import { baseUriBackend } from "@/redux/url/url";
import Pagination from "@/components/ui/Pagination";
import AppointmentViewModal from "./_components/AppointmentViewModal";
import AppointmentEditModal from "./_components/AppointmentEditModal";
import AppointmentDeleteModal from "./_components/AppointmentDeleteModal";

export default function AppointmentBookingPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: appointmentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllAppointmentsQuery({
    page,
    limit,
    search: search || undefined,
    status: statusFilter || undefined,
  });

  const [updateAppointment, { isLoading: isUpdating }] =
    useUpdateAppointmentMutation();
  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const appointments = appointmentsData?.data?.appointments || [];
  const pagination = appointmentsData?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (formData) => {
    try {
      await updateAppointment({
        appointmentId: selectedAppointment._id,
        data: formData,
      }).unwrap();
      toast.success("Appointment updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update appointment");
    }
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAppointment(selectedAppointment._id).unwrap();
      toast.success("Appointment deleted successfully");
      setIsDeleteModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete appointment");
    }
  };

  const handleStatusToggle = async (appointment, newStatus) => {
    try {
      await updateAppointment({
        appointmentId: appointment._id,
        data: { status: newStatus },
      }).unwrap();
      toast.success(`Appointment ${newStatus} successfully`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update appointment status");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: "bg-yellow-100 text-yellow-700", icon: FaClock },
      confirmed: { color: "bg-blue-100 text-blue-700", icon: FaCheckCircle },
      completed: { color: "bg-green-100 text-green-700", icon: FaCheckCircle },
      cancelled: {
        color: "bg-red-100 text-red-700",
        icon: FaExclamationCircle,
      },
    };
    const statusInfo = statusMap[status] || statusMap.pending;
    const Icon = statusInfo.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusInfo.color}`}
      >
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
          <p className="mt-4 text-gray-600">Loading appointments...</p>
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
            Failed to load appointments
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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Bookings
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage all patient appointments and bookings
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

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, or problem..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all bg-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Reset Filters */}
          {(search || statusFilter) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {appointments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <FaCalendarAlt className="w-16 h-16 text-gray-300" />
              <p className="text-xl font-medium text-gray-900">
                No appointments found
              </p>
              <p className="text-gray-500">
                Appointments will appear here once patients book them
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {appointment?.patientId?.image ? (
                              <Image
                                src={`${baseUriBackend}${appointment.patientId.image}`}
                                alt={appointment.patientName}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white font-bold text-sm">
                                {appointment?.patientName?.charAt(0) || "U"}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {appointment.patientName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {appointment.patientId
                                ? `ID: ${appointment.patientId._id?.slice(-6)}`
                                : "Guest"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaPhone className="w-3 h-3 text-gray-400" />
                            {appointment.patientPhone}
                          </p>
                          {appointment.patientEmail && (
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <FaEnvelope className="w-3 h-3 text-gray-400" />
                              {appointment.patientEmail}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-800 font-medium">
                          {appointment.problem}
                        </p>
                        {appointment.message && (
                          <p className="text-xs text-gray-500 truncate max-w-xs">
                            {appointment.message}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {getStatusBadge(appointment.status)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                          {new Date(
                            appointment.appointmentDate,
                          ).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewClick(appointment)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditClick(appointment)}
                            className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit Appointment"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(appointment)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Appointment"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalCount={pagination.totalCount}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={handlePageChange}
              itemsPerPage={limit}
            />
          </>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedAppointment && (
        <AppointmentViewModal
          appointment={selectedAppointment}
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedAppointment && (
        <AppointmentEditModal
          appointment={selectedAppointment}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditSubmit}
          isLoading={isUpdating}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedAppointment && (
        <AppointmentDeleteModal
          appointment={selectedAppointment}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
