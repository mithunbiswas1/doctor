// src/components/common/Navbar/data.js

export const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Menu",
    href: "/menu",
  },
  {
    name: "Catering",
    href: "/catering",
    subMenu: [
      {
        name: "Catering Request",
        href: "/catering-request",
      },
      {
        name: "Catering Request",
        href: "/catering-request",
      },
    ],
  },
  {
    name: "Account",
    href: "#",
    isAccount: true,
    subMenu: [
      {
        name: "Dashboard",
        href: "/dashboard",
        showFor: ["admin", "super_admin", "author"],
      },
      {
        name: "My Orders",
        href: "/orders",
        showFor: ["admin", "super_admin", "author", "customer"],
      },
      {
        name: "My Profile",
        href: "/profile",
        showFor: ["admin", "super_admin", "author", "customer"],
      },
      {
        name: "Logout",
        href: "#",
        isLogout: true,
        showFor: ["admin", "super_admin", "author", "customer"],
      },
    ],
  },
];
