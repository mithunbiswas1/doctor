// src/redux/features/prescriptionApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const prescriptionApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Admin: Create prescription by username
    adminCreatePrescriptionByUsername: builder.mutation({
      query: ({ username, data }) => ({
        url: `${endpoints.prescription.createByUsername}/${username}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Prescriptions", "MyPrescriptions"],
    }),

    // Admin: Get prescriptions by username
    adminGetPrescriptionsByUsername: builder.query({
      query: (username) => ({
        url: `${endpoints.prescription.getByUsername}/${username}`,
        method: "GET",
      }),
      providesTags: ["Prescriptions"],
    }),

    // Admin: Update prescription by ID
    adminUpdatePrescription: builder.mutation({
      query: ({ prescriptionId, data }) => ({
        url: `${endpoints.prescription.update}/${prescriptionId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Prescriptions", "MyPrescriptions"],
    }),

    // Admin: Delete prescription by ID
    adminDeletePrescription: builder.mutation({
      query: (prescriptionId) => ({
        url: `${endpoints.prescription.delete}/${prescriptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prescriptions", "MyPrescriptions"],
    }),

    // User: Get my prescriptions
    userGetMyPrescriptions: builder.query({
      query: () => ({
        url: endpoints.prescription.myPrescriptions,
        method: "GET",
      }),
      providesTags: ["MyPrescriptions"],
    }),
  }),
});

export const {
  useAdminCreatePrescriptionByUsernameMutation,
  useAdminGetPrescriptionsByUsernameQuery,
  useAdminUpdatePrescriptionMutation,
  useAdminDeletePrescriptionMutation,
  useUserGetMyPrescriptionsQuery,
} = prescriptionApi;
