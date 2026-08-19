// src/app/(dashboard)/user-list/_components/UserTable.jsx

"use client";

import Image from "next/image";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUserTag,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { baseUriBackend } from "@/redux/url/url";

const UserTable = ({
  users,
  currentUser,
  onView,
  onEdit,
  onDelete,
  onStatusToggle,
}) => {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <FaUser className="w-16 h-16 text-gray-300" />
          <p className="text-xl font-medium text-gray-900">No users found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                {/* User Info */}
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
                      <p className="text-xs text-gray-500">@{user.userName}</p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
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

                {/* Role */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <FaUserTag className="w-3 h-3" />
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                      user.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.is_active ? (
                      <FaCheckCircle className="w-3 h-3" />
                    ) : (
                      <FaExclamationCircle className="w-3 h-3" />
                    )}
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Joined */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(user)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onStatusToggle(user)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        user.is_active
                          ? "text-yellow-600 hover:bg-yellow-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                      title={user.is_active ? "Deactivate" : "Activate"}
                    >
                      {user.is_active ? (
                        <FaTimes className="w-4 h-4" />
                      ) : (
                        <FaCheck className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit User"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    {user._id !== currentUser?._id && (
                      <button
                        onClick={() => onDelete(user)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
