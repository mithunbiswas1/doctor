"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3 } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "@/redux/features/Slice/authSlice";
import {
  toggleMobileMenu,
  closeMobileMenu,
} from "@/redux/features/Slice/uiSlice";
import { navigation } from "./data";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { isMobileMenuOpen } = useSelector((state) => state.ui);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  const userRole = user?.role || null;

  // Update navigation - show login/registration if not logged in
  const updatedNavigation = navigation.map((item) => {
    if (item.isAccount && !isLoggedIn) {
      return {
        ...item,
        subMenu: [
          {
            name: "Login",
            href: "/login",
          },
          {
            name: "Register",
            href: "/registration",
          },
        ],
      };
    }
    if (item.isAccount && isLoggedIn) {
      // Filter submenu items based on user role
      const filteredSubMenu = item.subMenu.filter((subItem) => {
        if (!subItem.showFor) return true;
        return subItem.showFor.includes(userRole);
      });

      return {
        ...item,
        subMenu: filteredSubMenu,
      };
    }
    return item;
  });

  // Handle scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Toggle submenu in mobile menu
  const toggleSubMenu = (menuName) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Handle logout with Redux
  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(closeMobileMenu());
    router.push("/");
  };

  // Close menu on link click
  const handleLinkClick = () => {
    dispatch(closeMobileMenu());
  };

  // Check if item has submenu
  const hasSubMenu = (item) => {
    return item.subMenu && item.subMenu.length > 0;
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between py-2 backdrop-blur-2xl bg-white/90 shadow-md my-1 rounded-xl transition-all duration-300">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/chandsi_dawakhana.png"
                alt="Your Company Logo"
                width={200}
                height={80}
                className="w-auto h-12 transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation - Right */}
            <div className="hidden lg:flex lg:gap-x-1 items-center">
              {updatedNavigation.map((item) => (
                <div
                  key={item.name}
                  className="relative transition-all duration-300"
                  onMouseEnter={() => {
                    if (hasSubMenu(item)) {
                      setOpenSubMenu(item.name);
                    }
                    setHoveredItem(item.name);
                  }}
                  onMouseLeave={() => {
                    if (hasSubMenu(item)) {
                      setOpenSubMenu(null);
                    }
                    setHoveredItem(null);
                  }}
                >
                  <div className="flex items-center">
                    {item.isAccount ? (
                      <button className="text-base font-bold py-3 px-3 transition-colors duration-300 flex items-center gap-1 text-black hover:text-primary">
                        <span>{item.name}</span>
                        {hasSubMenu(item) && (
                          <motion.span
                            className="ml-1 inline-block"
                            animate={{
                              rotate: openSubMenu === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaChevronDown className="h-3 w-3" />
                          </motion.span>
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-base font-bold py-3 px-3 hover:text-primary transition-colors duration-300 flex items-center gap-1 ${
                          pathname === item.href
                            ? "text-primary"
                            : "text-black hover:text-primary"
                        }`}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span>{item.name}</span>
                        {hasSubMenu(item) && (
                          <motion.span
                            className="inline-block"
                            animate={{
                              rotate: openSubMenu === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaChevronDown className="h-3 w-3" />
                          </motion.span>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* Submenu */}
                  {hasSubMenu(item) && openSubMenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 pt-2"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl min-w-[200px] overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="h-1 bg-primary"></div>
                        <div className="">
                          {item.subMenu.map((subItem) =>
                            subItem.isLogout ? (
                              <button
                                key="logout"
                                onClick={handleLogout}
                                className="block w-full text-left px-6 py-3 text-sm hover:bg-red-50 transition-colors duration-200 text-red-600"
                              >
                                Logout
                              </button>
                            ) : (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-6 py-3 text-sm hover:bg-primary/10 transition-colors duration-200 text-gray-700 dark:text-gray-200"
                              >
                                {subItem.name}
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => dispatch(toggleMobileMenu())}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                <HiBars3 aria-hidden="true" className="text-black h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu - Drawer Style with Redux State */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => dispatch(closeMobileMenu())}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={handleLinkClick}
                >
                  <Image
                    src="/chandsi_dawakhana.png"
                    alt="Your Company Logo"
                    width={160}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                  <span className="sr-only">Close menu</span>
                  <FaXmark aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="px-4 py-6 space-y-4">
                {updatedNavigation.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-gray-100 pb-3"
                  >
                    <div className="flex items-center justify-between">
                      {item.isAccount ? (
                        <span className="text-lg font-medium text-gray-900">
                          {item.name}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className={`text-lg font-medium ${
                            pathname === item.href
                              ? "text-primary"
                              : "text-gray-900 hover:text-primary"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}

                      {hasSubMenu(item) && (
                        <motion.button
                          onClick={() => toggleSubMenu(item.name)}
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.span
                            className="inline-block"
                            animate={{
                              rotate: openSubMenu === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaChevronDown className="h-4 w-4 text-gray-600" />
                          </motion.span>
                        </motion.button>
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    {hasSubMenu(item) && openSubMenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 ml-4 space-y-2 overflow-hidden"
                      >
                        {item.subMenu.map((subItem) => (
                          <div key={subItem.name}>
                            {subItem.isLogout ? (
                              <button
                                onClick={() => {
                                  handleLogout();
                                }}
                                className="block w-full text-left text-sm text-red-600 hover:text-red-700 py-2"
                              >
                                {subItem.name}
                              </button>
                            ) : (
                              <Link
                                href={subItem.href}
                                onClick={handleLinkClick}
                                className="block text-sm text-gray-600 hover:text-primary py-2"
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Mobile Contact Link */}
                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className="mt-4 flex items-center justify-center w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
