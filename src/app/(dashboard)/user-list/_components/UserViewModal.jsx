// src/app/(dashboard)/user-list/_components/UserViewModal.jsx

"use client";

import Image from "next/image";
import {
  FaTimes,
  FaUserTag,
  FaCheckCircle,
  FaExclamationCircle,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import { baseUriBackend } from "@/redux/url/url";

const UserViewModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">User Details</h3>
            <p className="text-gray-600 text-sm mt-1">
              Complete user information
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
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            {user?.image ? (
              <Image
                src={`${baseUriBackend}${user.image}`}
                alt={user.fullName}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-2xl font-bold">
                {user?.fullName?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">{user.fullName}</h4>
            <p className="text-sm text-gray-500">@{user.userName}</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full capitalize ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                <FaUserTag className="w-3 h-3" />
                {user.role}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${
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
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Email
            </p>
            <p className="text-sm text-gray-900">
              {user.email || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Phone
            </p>
            <p className="text-sm text-gray-900">{user.phone}</p>
          </div>
          {user.bio && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Bio
              </p>
              <p className="text-sm text-gray-900">{user.bio}</p>
            </div>
          )}
          {user.address && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Address
              </p>
              <p className="text-sm text-gray-900">{user.address}</p>
            </div>
          )}
          {user.city && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                City
              </p>
              <p className="text-sm text-gray-900">{user.city}</p>
            </div>
          )}
          {user.district && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                District
              </p>
              <p className="text-sm text-gray-900">{user.district}</p>
            </div>
          )}
          {user.state && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                State
              </p>
              <p className="text-sm text-gray-900">{user.state}</p>
            </div>
          )}
          {user.country && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Country
              </p>
              <p className="text-sm text-gray-900">{user.country}</p>
            </div>
          )}
          {user.postal_code && (
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Postal Code
              </p>
              <p className="text-sm text-gray-900">{user.postal_code}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Joined
            </p>
            <p className="text-sm text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Last Updated
            </p>
            <p className="text-sm text-gray-900">
              {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          </div>
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

export default UserViewModal;
