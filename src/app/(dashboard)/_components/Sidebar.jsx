// src/app/(dashboard)/_components/Sidebar.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import {
  FaUser,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaHome,
  FaCalendarCheck,
  FaPrescription,
  FaUsers,
} from "react-icons/fa";
import { toast } from "sonner";
import { setLogout } from "@/redux/features/Slice/authSlice";
import { baseUriBackend } from "@/redux/url/url";
import { useLogoutMutation } from "@/redux/features/authApi";

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const userRole = user?.role || "customer";

  // Role-based navigation items
  const getNavItems = () => {
    // Admin specific items
    if (userRole === "admin") {
      return [
        {
          name: "Profile",
          href: "/profile",
          icon: FaUser,
        },
        {
          name: "Booking List",
          href: "/booking-list",
          icon: FaCalendarCheck,
        },
        {
          name: "Prescription List",
          href: "/prescription-list",
          icon: FaPrescription,
        },
        {
          name: "User List",
          href: "/user-list",
          icon: FaUsers,
        },
      ];
    }

    // Customer/Patient specific items
    else if (userRole === "customer") {
      return [
        {
          name: "Profile",
          href: "/profile",
          icon: FaUser,
        },
        {
          name: "My Bookings",
          href: "/my-bookings",
          icon: FaCalendarCheck,
        },
        {
          name: "My Prescriptions",
          href: "/my-prescriptions",
          icon: FaPrescription,
        },
      ];
    }

    // Fallback for any other role
    else {
      return [
        {
          name: "Profile",
          href: "/profile",
          icon: FaUser,
        },
      ];
    }
  };

  const navItems = getNavItems();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(setLogout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      toast.error(
        error?.data?.message || "Failed to logout. Please try again.",
      );
      window.location.href = "/";
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.avif"
              alt="Your Company Logo"
              width={200}
              height={80}
              className="w-auto transition-all duration-300 h-12"
              priority
            />
          </Link>
        )}
        {isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Your Company Logo"
              width={200}
              height={80}
              className="w-auto transition-all duration-300 h-4"
              priority
            />
          </Link>
        )}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <FaChevronRight className="text-gray-500" />
          ) : (
            <FaChevronLeft className="text-gray-500" />
          )}
        </button>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* User Profile Section */}
      <div
        className={`flex items-center gap-3 px-4 py-4 border-b border-gray-200 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {user?.image ? (
            <Image
              src={`${baseUriBackend}${user.image}`}
              alt={user?.fullName || "User"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white font-bold text-lg">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.fullName || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize truncate">
              {user?.role || "Customer"}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button - Bottom */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 group text-red-600 hover:text-red-700 hover:bg-red-50 ${
            isCollapsed ? "justify-center" : ""
          } ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaSignOutAlt
            className={`w-5 h-5 transition-colors text-red-500 group-hover:text-red-600 ${
              isCollapsed ? "mx-0" : ""
            }`}
          />
          {!isCollapsed && (
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Logout
            </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
    </>
  );
};

export default Sidebar;
