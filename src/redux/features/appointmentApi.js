// src/redux/features/appointmentApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const appointmentApi = apiSlice.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Public: Create appointment
    createAppointment: builder.mutation({
      query: (data) => ({
        url: endpoints.appointment.createAppointment,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointments", "MyAppointments"],
    }),

    // Admin: Get all appointments
    getAllAppointments: builder.query({
      query: (params) => ({
        url: endpoints.appointment.adminAllAppointments,
        method: "GET",
        params,
      }),
      providesTags: ["Appointments"],
    }),

    // User: Get my appointments
    getMyAppointments: builder.query({
      query: () => ({
        url: endpoints.appointment.myAppointments,
        method: "GET",
      }),
      providesTags: ["MyAppointments"],
    }),

    // Get appointment by ID
    getAppointmentById: builder.query({
      query: (appointmentId) => ({
        url: `${endpoints.appointment.singleAppointmentById}/${appointmentId}`,
        method: "GET",
      }),
      providesTags: ["Appointment"],
    }),

    // Admin: Update appointment
    updateAppointment: builder.mutation({
      query: ({ appointmentId, data }) => ({
        url: `${endpoints.appointment.adminUpdateAppointmentById}/${appointmentId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Appointments", "MyAppointments", "Appointment"],
    }),

    // Admin: Delete appointment
    deleteAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `${endpoints.appointment.adminDeleteAppointmentById}/${appointmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointments", "MyAppointments"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetMyAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
