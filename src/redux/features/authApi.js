// src/redux/features/authApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Registration API
    registration: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.registration,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Login API
    login: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.login,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    // Refresh Token API
    refreshToken: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.refreshToken,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    // Logout API
    logout: builder.mutation({
      query: () => ({
        url: endpoints.auth.logout,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // Get User Profile
    getUserProfile: builder.query({
      query: () => ({
        url: endpoints.auth.profile,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update User Profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.updateProfile,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Update Password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: endpoints.auth.updatePassword,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = authApi;
