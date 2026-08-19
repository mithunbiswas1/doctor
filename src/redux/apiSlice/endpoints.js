// src/redux/apiSlice/endpoints.js

export const endpoints = {
  //Auth API
  auth: {
    registration: "register",
    login: "login",
    refreshToken: "refresh-token",
    logout: "logout",
    profile: "profile",
    updateProfile: "update-profile",
    updatePassword: "update-password",
  },
  user: {
    listUsers: "list-users",
    updateUser: "update-user",
    deleteUser: "delete-user",
  },

  // Order endpoints
  order: {
    createOrder: "create-order",
  },

  //Product API
  product: {
    product: "product",
    search: "search",
  },

  //Product Review
  productReview: {
    productReview: "product-review",
  },

  //Profile API
  profile: {
    profile: "profile",
  },

  //Pages API
  pages: {
    contact: "contact",
  },

  //Setting API
  setting: {
    getSetting: "setting",
  },
  //Tracking API
  tracking: {
    getTracking: "track",
  },
};
