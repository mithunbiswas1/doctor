// src/components/common/Navbar/data.js

export const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Appointments",
    href: "/appointments",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Account",
    href: "#",
    isAccount: true,
    subMenu: [
      {
        name: "Dashboard",
        href: "/dashboard",
        showFor: ["admin"],
      },
      {
        name: "My Appointments",
        href: "/my-appointments",
        showFor: ["admin", "customer"],
      },
      {
        name: "My Profile",
        href: "/profile",
        showFor: ["admin", "customer"],
      },
      {
        name: "Patients",
        href: "/patients",
        showFor: ["admin"],
      },
      {
        name: "Logout",
        href: "#",
        isLogout: true,
        showFor: ["admin", "customer"],
      },
    ],
  },
];
