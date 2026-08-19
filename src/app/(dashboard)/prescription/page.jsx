// src/app/(dashboard)/prescription/page.jsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPrescription,
  FaCalendarAlt,
  FaPills,
  FaClock,
  FaEye,
  FaTimes,
  FaUserMd,
  FaPhoneAlt,
  FaEnvelope,
  FaStethoscope,
  FaDownload,
} from "react-icons/fa";
import { NotebookTabs } from "lucide-react";
import { useUserGetMyPrescriptionsQuery } from "@/redux/features/prescriptionApi";
import { baseUriBackend } from "@/redux/url/url";

export default function UserPrescriptionsPage() {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const {
    data: prescriptionsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserGetMyPrescriptionsQuery();

  const prescriptions = prescriptionsData?.data || [];

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const downloadPrescription = async (prescription) => {
    try {
      const html2canvas = (await import("html2canvas")).default;

      const doctorName =
        prescription?.doctorName ||
        prescription?.doctorId?.fullName ||
        "Dr. AK BISWAS";

      const doctorImage = prescription?.doctorId?.image
        ? `${baseUriBackend}${prescription.doctorId.image.replace(/^\/+/, "")}`
        : null;

      const content = document.createElement("div");

      content.style.cssText = `
        position: fixed;
        left: -10000px;
        top: 0;
        width: 794px;
        background: #ffffff;
        color: #111827;
        font-family: Arial, Helvetica, sans-serif;
        z-index: -1;
      `;

      content.innerHTML = `
        <div style="
          width: 794px;
          box-sizing: border-box;
          background: #ffffff;
          color: #111827;
          padding: 0;
        ">

          <!-- HEADER -->
          <div style="
            padding: 35px 40px 28px;
            border-bottom: 4px solid #2563eb;
          ">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            ">
              <div style="
                display: flex;
                align-items: center;
                gap: 18px;
              ">
                <div style="
                  width: 72px;
                  height: 72px;
                  border-radius: 50%;
                  background: #eff6ff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                ">
                  ${
                    doctorImage
                      ? `<img
                          src="${doctorImage}"
                          crossorigin="anonymous"
                          style="
                            width: 72px;
                            height: 72px;
                            object-fit: cover;
                          "
                        />`
                      : `
                        <div style="
                          font-size: 32px;
                          font-weight: bold;
                          color: #2563eb;
                        ">
                          Dr
                        </div>
                      `
                  }
                </div>
                <div>
                  <div style="
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    color: #2563eb;
                    text-transform: uppercase;
                  ">
                    Medical Prescription
                  </div>
                  <div style="
                    margin-top: 5px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #111827;
                  ">
                    Dr. ${doctorName.replace(/^Dr\.\s*/i, "")}
                  </div>
                  <div style="
                    margin-top: 4px;
                    font-size: 13px;
                    color: #6b7280;
                  ">
                    Physician & Medical Consultant
                  </div>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="
                  font-size: 10px;
                  color: #9ca3af;
                  text-transform: uppercase;
                ">
                  Prescription No.
                </div>
                <div style="
                  margin-top: 4px;
                  font-size: 13px;
                  font-weight: bold;
                  color: #374151;
                ">
                  #${prescription?._id?.slice(-8).toUpperCase() || "N/A"}
                </div>
                <div style="
                  margin-top: 12px;
                  font-size: 10px;
                  color: #9ca3af;
                ">
                  Date
                </div>
                <div style="
                  margin-top: 3px;
                  font-size: 13px;
                  font-weight: bold;
                  color: #374151;
                ">
                  ${formatDate(prescription?.prescriptionDate)}
                </div>
              </div>
            </div>
          </div>

          <!-- PATIENT INFORMATION -->
          <div style="padding: 25px 40px 0;">
            <div style="
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 10px;
              padding: 18px;
            ">
              <div style="
                font-size: 14px;
                font-weight: bold;
                color: #111827;
                margin-bottom: 15px;
              ">
                Patient Information
              </div>
              <div style="
                display: flex;
                justify-content: space-between;
              ">
                <div style="width: 32%;">
                  <div style="
                    font-size: 9px;
                    color: #9ca3af;
                    text-transform: uppercase;
                  ">
                    Full Name
                  </div>
                  <div style="
                    margin-top: 5px;
                    font-size: 13px;
                    font-weight: bold;
                    color: #374151;
                  ">
                    ${prescription?.patientName || "Patient"}
                  </div>
                </div>
                <div style="width: 32%;">
                  <div style="
                    font-size: 9px;
                    color: #9ca3af;
                    text-transform: uppercase;
                  ">
                    Phone
                  </div>
                  <div style="
                    margin-top: 5px;
                    font-size: 13px;
                    color: #374151;
                  ">
                    ${prescription?.patientPhone || "Not provided"}
                  </div>
                </div>
                <div style="width: 32%;">
                  <div style="
                    font-size: 9px;
                    color: #9ca3af;
                    text-transform: uppercase;
                  ">
                    Email
                  </div>
                  <div style="
                    margin-top: 5px;
                    font-size: 12px;
                    color: #374151;
                    word-break: break-all;
                  ">
                    ${prescription?.patientEmail || "Not provided"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BODY -->
          <div style="padding: 25px 40px 35px;">
            ${
              prescription?.symptoms?.length > 0
                ? `
                  <div style="margin-bottom: 25px;">
                    <div style="
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      margin-bottom: 10px;
                    ">
                      <div style="
                        width: 4px;
                        height: 18px;
                        background: #2563eb;
                        border-radius: 4px;
                      "></div>
                      <div style="
                        font-size: 15px;
                        font-weight: bold;
                        color: #111827;
                      ">
                        Clinical Symptoms
                      </div>
                    </div>
                    <div>
                      ${prescription.symptoms
                        .map(
                          (symptom) => `
                            <span style="
                              display: inline-block;
                              padding: 6px 11px;
                              margin: 0 5px 5px 0;
                              border: 1px solid #e5e7eb;
                              background: #f9fafb;
                              border-radius: 20px;
                              font-size: 11px;
                              color: #4b5563;
                            ">
                              ${symptom}
                            </span>
                          `,
                        )
                        .join("")}
                    </div>
                  </div>
                `
                : ""
            }

            <!-- MEDICINES -->
            <div style="margin-bottom: 25px;">
              <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 10px;
              ">
                <div style="
                  width: 4px;
                  height: 18px;
                  background: #2563eb;
                  border-radius: 4px;
                "></div>
                <div style="
                  font-size: 15px;
                  font-weight: bold;
                  color: #111827;
                ">
                  Prescription
                </div>
              </div>
              <div style="
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                overflow: hidden;
              ">
                <div style="
                  display: flex;
                  padding: 11px 14px;
                  background: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                  font-size: 9px;
                  font-weight: bold;
                  color: #6b7280;
                  text-transform: uppercase;
                ">
                  <div style="width: 8%;">#</div>
                  <div style="width: 42%;">Medicine</div>
                  <div style="width: 25%;">Dosage</div>
                  <div style="width: 25%;">Instruction</div>
                </div>
                ${prescription?.medicines
                  ?.map(
                    (medicine, index) => `
                      <div style="
                        display: flex;
                        padding: 13px 14px;
                        border-bottom: 1px solid #f3f4f6;
                        align-items: center;
                      ">
                        <div style="
                          width: 8%;
                          font-size: 12px;
                          font-weight: bold;
                          color: #2563eb;
                        ">
                          ${String(index + 1).padStart(2, "0")}
                        </div>
                        <div style="width: 42%;">
                          <div style="
                            font-size: 13px;
                            font-weight: bold;
                            color: #111827;
                          ">
                            ${medicine?.medicine_name || "-"}
                          </div>
                          ${
                            medicine?.notes
                              ? `
                                <div style="
                                  margin-top: 3px;
                                  font-size: 10px;
                                  color: #6b7280;
                                ">
                                  ${medicine.notes}
                                </div>
                              `
                              : ""
                          }
                        </div>
                        <div style="
                          width: 25%;
                          font-size: 11px;
                          color: #4b5563;
                        ">
                          ${medicine?.dosage_time || "-"}
                        </div>
                        <div style="width: 25%;">
                          <span style="
                            display: inline-block;
                            padding: 5px 8px;
                            border-radius: 5px;
                            font-size: 9px;
                            font-weight: bold;
                            background: ${
                              medicine?.aftermeal ? "#eff6ff" : "#fff7ed"
                            };
                            color: ${medicine?.aftermeal ? "#1d4ed8" : "#c2410c"};
                          ">
                            ${medicine?.aftermeal ? "After Meal" : "Before Meal"}
                          </span>
                        </div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </div>

            ${
              prescription?.notes
                ? `
                  <div style="
                    margin-bottom: 25px;
                    padding: 16px;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 10px;
                  ">
                    <div style="
                      margin-bottom: 6px;
                      font-size: 12px;
                      font-weight: bold;
                      color: #374151;
                      text-transform: uppercase;
                    ">
                      Doctor's Advice
                    </div>
                    <div style="
                      font-size: 11px;
                      line-height: 1.7;
                      color: #6b7280;
                    ">
                      ${prescription.notes}
                    </div>
                  </div>
                `
                : ""
            }

            ${
              prescription?.next_visit
                ? `
                  <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 14px 18px;
                    background: #eff6ff;
                    border-radius: 10px;
                    margin-bottom: 35px;
                  ">
                    <div>
                      <div style="
                        font-size: 9px;
                        color: #6b7280;
                        text-transform: uppercase;
                      ">
                        Follow-up Appointment
                      </div>
                      <div style="
                        margin-top: 3px;
                        font-size: 13px;
                        font-weight: bold;
                        color: #1e3a8a;
                      ">
                        Next Visit
                      </div>
                    </div>
                    <div style="
                      font-size: 13px;
                      font-weight: bold;
                      color: #2563eb;
                    ">
                      ${formatDate(prescription.next_visit)}
                    </div>
                  </div>
                `
                : ""
            }

            <!-- SIGNATURE -->
            <div style="
              display: flex;
              justify-content: space-between;
              padding-top: 25px;
              border-top: 1px solid #e5e7eb;
            ">
              <div>
                <div style="
                  font-size: 9px;
                  color: #9ca3af;
                ">
                  Prescription Status
                </div>
                <div style="
                  margin-top: 5px;
                  font-size: 11px;
                  font-weight: bold;
                  color: ${prescription?.isActive ? "#16a34a" : "#dc2626"};
                ">
                  ${prescription?.isActive ? "Active Prescription" : "Inactive Prescription"}
                </div>
              </div>
              <div style="
                width: 190px;
                text-align: center;
              ">
                <div style="
                  padding-bottom: 6px;
                  border-bottom: 1px solid #9ca3af;
                  font-size: 12px;
                  font-weight: bold;
                  color: #374151;
                ">
                  Dr. ${doctorName.replace(/^Dr\.\s*/i, "")}
                </div>
                <div style="
                  margin-top: 6px;
                  font-size: 9px;
                  color: #9ca3af;
                ">
                  Authorized Physician
                </div>
              </div>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="
            padding: 15px 40px;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          ">
            <div style="
              font-size: 9px;
              color: #9ca3af;
            ">
              This is a computer-generated medical prescription.
            </div>
            <div style="
              margin-top: 3px;
              font-size: 8px;
              color: #d1d5db;
            ">
              Generated on ${formatDate(new Date())}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(content);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        windowWidth: 794,
      });

      const link = document.createElement("a");
      link.download = `prescription-${prescription?._id || "document"}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();

      document.body.removeChild(content);
    } catch (error) {
      console.error("Prescription download failed:", error);
    }
  };

  const handleViewClick = (prescription) => {
    setSelectedPrescription(prescription);
    setIsViewModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prescriptions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load prescriptions
          </h3>
          <p className="text-gray-600">
            {error?.data?.message || "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-600 text-sm mt-1">
            View all your medical prescriptions
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <FaPrescription className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Prescriptions List */}
      {prescriptions.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <FaPrescription className="w-16 h-16 text-gray-300" />
            <p className="text-xl font-medium text-gray-900">
              No prescriptions found
            </p>
            <p className="text-gray-500">
              You don't have any prescriptions yet
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => {
            const doctorName =
              prescription?.doctorName ||
              prescription?.doctorId?.fullName ||
              "Dr. AK BISWAS";

            const doctorImage = prescription?.doctorId?.image
              ? `${baseUriBackend}${prescription.doctorId.image.replace(/^\/+/, "")}`
              : null;

            return (
              <div
                key={prescription._id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/5">
                        {doctorImage ? (
                          <Image
                            src={doctorImage}
                            alt={doctorName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FaUserMd className="text-xl text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-primary">
                          Prescribed By
                        </p>
                        <p className="font-semibold text-gray-900">
                          {doctorName}
                        </p>
                      </div>
                    </div>

                    {/* Prescription Details */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <FaCalendarAlt className="w-3 h-3" />
                        {formatDate(prescription.prescriptionDate)}
                      </span>
                      {prescription.isActive ? (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                          Inactive
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        • {prescription.medicines?.length || 0} medicines
                      </span>
                    </div>

                    {/* Medicines Preview */}
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {prescription.medicines
                          ?.slice(0, 3)
                          .map((medicine, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {medicine.medicine_name}
                            </span>
                          ))}
                        {prescription.medicines?.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{prescription.medicines.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Next Visit */}
                    {prescription.next_visit && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FaClock className="w-3 h-3 text-primary" />
                          Next Visit: {formatDate(prescription.next_visit)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewClick(prescription)}
                      className="px-3 py-1.5 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1"
                    >
                      <FaEye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => downloadPrescription(prescription)}
                      className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
                    >
                      <FaDownload className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Prescription Modal */}
      {isViewModalOpen && selectedPrescription && (
        <div className="fixed inset-0 z-999 flex items-start justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6">
          <div className="relative my-4 w-full max-w-4xl sm:my-8">
            {/* Modal Actions */}
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Prescription Details
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadPrescription(selectedPrescription)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition hover:bg-gray-100"
                >
                  <FaDownload className="text-xs" />
                  Download JPG
                </button>
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-700 shadow-lg transition hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Prescription Document */}
            <div className="overflow-hidden rounded-xl bg-white">
              {/* Doctor Header */}
              <div className="border-b-4 border-primary px-6 py-7 sm:px-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/10 bg-primary/5">
                      {selectedPrescription?.doctorId?.image ? (
                        <Image
                          src={`${baseUriBackend}${selectedPrescription.doctorId.image.replace(/^\/+/, "")}`}
                          alt={selectedPrescription?.doctorName || "Doctor"}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <FaUserMd className="text-4xl text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                        Medical Prescription
                      </p>
                      <h1 className="mt-1 text-2xl font-bold text-gray-900">
                        {selectedPrescription?.doctorName || "Dr. AK BISWAS"}
                      </h1>
                      <p className="mt-1 text-sm text-gray-500">
                        Physician & Medical Consultant
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="mt-2 text-xs text-gray-400">Date</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {formatDate(selectedPrescription?.prescriptionDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="mx-6 mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:mx-10">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <FaUserMd className="text-sm text-primary" />
                  </div>
                  <h2 className="font-bold text-gray-900">
                    Patient Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Full Name
                    </p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedPrescription?.patientName || "Patient"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Phone
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                      <FaPhoneAlt className="text-xs text-primary" />
                      {selectedPrescription?.patientPhone || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                      <FaEnvelope className="text-xs text-primary" />
                      <span className="break-all">
                        {selectedPrescription?.patientEmail || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prescription Body */}
              <div className="px-6 py-6 sm:px-10">
                {/* Symptoms */}
                {selectedPrescription?.symptoms?.length > 0 && (
                  <section className="mb-7">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-5 w-1 rounded-full bg-primary" />
                      <h2 className="text-base font-bold text-gray-900">
                        Clinical Symptoms
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPrescription.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Medicines */}
                <section className="mb-7">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    <h2 className="text-base font-bold text-gray-900">
                      Prescription
                    </h2>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <div className="hidden grid-cols-[60px_1.5fr_1fr_130px] gap-3 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:grid">
                      <span>#</span>
                      <span>Medicine</span>
                      <span>Dosage</span>
                      <span>Instruction</span>
                    </div>
                    {selectedPrescription?.medicines?.map((medicine, index) => (
                      <div
                        key={medicine?._id || index}
                        className="grid grid-cols-1 gap-2 border-t border-gray-100 px-4 py-4 sm:grid-cols-[60px_1.5fr_1fr_130px] sm:items-center sm:gap-3"
                      >
                        <div className="text-sm font-bold text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {medicine?.medicine_name}
                          </p>
                          {medicine?.notes && (
                            <p className="mt-1 text-xs text-gray-500">
                              {medicine.notes}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            {medicine?.dosage_time}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                              medicine?.aftermeal
                                ? "bg-blue-50 text-blue-700"
                                : "bg-orange-50 text-orange-700"
                            }`}
                          >
                            {medicine?.aftermeal ? "After Meal" : "Before Meal"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Notes */}
                {selectedPrescription?.notes && (
                  <section className="mb-7">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
                        Doctor's Advice
                      </h2>
                      <p className="text-sm leading-7 text-gray-600">
                        {selectedPrescription.notes}
                      </p>
                    </div>
                  </section>
                )}

                {/* Next Visit */}
                {selectedPrescription?.next_visit && (
                  <section className="mb-8">
                    <div className="flex items-center justify-between rounded-xl bg-primary px-5 py-4 text-white">
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt />
                        <div>
                          <p className="text-xs text-white/70">
                            Follow-up Appointment
                          </p>
                          <p className="font-semibold">Next Visit</p>
                        </div>
                      </div>
                      <p className="font-bold">
                        {formatDate(selectedPrescription.next_visit)}
                      </p>
                    </div>
                  </section>
                )}

                {/* Signature */}
                <div className="grid grid-cols-1 gap-8 border-t border-gray-200 pt-8 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-400">Prescription Status</p>
                    <p className="mt-1 text-sm font-semibold text-green-600">
                      {selectedPrescription?.isActive
                        ? "Active Prescription"
                        : "Inactive Prescription"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="ml-auto w-48 border-b border-gray-400 pb-2 text-center">
                      <p className="font-semibold text-gray-800">
                        {selectedPrescription?.doctorName || "Dr. AK BISWAS"}
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Authorized Physician
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-center sm:px-10">
                <p className="text-xs text-gray-400">
                  This is a computer-generated medical prescription.
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  Generated on {formatDate(new Date())}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
