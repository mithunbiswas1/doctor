// src/redux/features/userApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const userApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Get all users (Admin only)
    getListUsers: builder.query({
      query: (params) => ({
        url: endpoints.user.listUsers,
        method: "GET",
        params: params,
      }),
      providesTags: ["Users"],
    }),

    // Get prescribed users (Admin only)
    getPrescribedUsers: builder.query({
      query: (params) => ({
        url: endpoints.user.prescribedListUsers,
        method: "GET",
        params: params,
      }),
      providesTags: ["Users"],
    }),

    // Update user by admin (Admin only)
    updateUserByAdmin: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${endpoints.user.updateUser}/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users", "User"],
    }),

    // Delete user by admin (Admin only)
    deleteUserByAdmin: builder.mutation({
      query: (userId) => ({
        url: `${endpoints.user.deleteUser}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetListUsersQuery,
  useGetPrescribedUsersQuery,
  useUpdateUserByAdminMutation,
  useDeleteUserByAdminMutation,
} = userApi;
