// src/app/(dashboard)/prescribed-users/page.jsx

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
  FaPrescription,
  FaEye,
  FaUserPlus,
} from "react-icons/fa";
import { useGetPrescribedUsersQuery } from "@/redux/features/userApi";
import { baseUriBackend } from "@/redux/url/url";
import Pagination from "@/components/ui/Pagination";
import RegisterModal from "@/components/auth/RegisterModal";

export default function PrescribedUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 10;

  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPrescribedUsersQuery({
    page,
    limit,
    search: search || undefined,
  });

  const users = usersData?.data?.users || [];
  const pagination = usersData?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  };

  const resetFilters = () => {
    setSearch("");
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModalSuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prescribed users...</p>
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
            Failed to load users
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
            Prescribed Patients
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            List of all patients with active prescriptions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <FaUserPlus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>
          {search && (
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
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <FaUser className="w-16 h-16 text-gray-300" />
              <p className="text-xl font-medium text-gray-900">
                No prescribed patients found
              </p>
              <p className="text-gray-500">
                Patients will appear here once they receive prescriptions
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FaUserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </button>
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
                      Visit Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Visit Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {user?.image ? (
                              <Image
                                src={`${baseUriBackend}${user.image}`}
                                alt={user.fullName}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white font-bold text-sm">
                                {user?.fullName?.charAt(0) || "U"}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {user.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              @{user.userName}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          {user.email && (
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <FaEnvelope className="w-3 h-3 text-gray-400" />
                              {user.email}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaPhone className="w-3 h-3 text-gray-400" />
                            {user.phone}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                          {user.nextVisitDate ? (
                            new Date(user.nextVisitDate).toLocaleDateString()
                          ) : (
                            <span className="text-gray-400">Not scheduled</span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/prescribed-users/${user.userName}`}
                            className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View Prescriptions"
                          >
                            <FaEye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/prescribed-users/${user.userName}`}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Create Prescription"
                          >
                            <FaPrescription className="w-4 h-4" />
                          </Link>
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

      {/* Register Modal */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
