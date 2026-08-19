// src/app/(dashboard)/prescribed-users/[slug]/page.jsx

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaPrescription,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { toast } from "sonner";
import {
  useAdminGetPrescriptionsByUsernameQuery,
  useAdminUpdatePrescriptionMutation,
  useAdminCreatePrescriptionByUsernameMutation,
} from "@/redux/features/prescriptionApi";
import { baseUriBackend } from "@/redux/url/url";
import PrescriptionCard from "@/components/shared/PrescriptionCard";

export default function UserPrescriptionsPage() {
  const params = useParams();
  const router = useRouter();
  const username = params.slug;

  const [editingPrescription, setEditingPrescription] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    prescriptionDate: "",
    symptomsInput: "",
    medicines: [],
    next_visit: "",
    notes: "",
  });

  const { data, isLoading, isError, error, refetch } =
    useAdminGetPrescriptionsByUsernameQuery(username);

  const [updatePrescription, { isLoading: isUpdating }] =
    useAdminUpdatePrescriptionMutation();
  const [createPrescription, { isLoading: isCreating }] =
    useAdminCreatePrescriptionByUsernameMutation();

  const patient = data?.data?.patient;
  const prescriptions = data?.data?.prescriptions || [];

  const resetCreateForm = () => {
    setFormData({
      prescriptionDate: new Date().toISOString().split("T")[0],
      symptomsInput: "",
      medicines: [
        { medicine_name: "", dosage_time: "", aftermeal: true, notes: "" },
      ],
      next_visit: "",
      notes: "",
    });
  };

  const resetEditForm = (prescription) => {
    setFormData({
      prescriptionDate: prescription.prescriptionDate?.split("T")[0] || "",
      symptomsInput: prescription.symptoms?.join(", ") || "",
      medicines: prescription.medicines || [],
      next_visit: prescription.next_visit?.split("T")[0] || "",
      notes: prescription.notes || "",
    });
  };

  const handleCreateClick = () => {
    resetCreateForm();
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    for (const medicine of formData.medicines) {
      if (!medicine.medicine_name || !medicine.dosage_time) {
        toast.error("Each medicine must have name and dosage time");
        return;
      }
    }

    try {
      const symptomsArray = formData.symptomsInput
        ? formData.symptomsInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      await createPrescription({
        username: username,
        data: {
          prescriptionDate: formData.prescriptionDate,
          symptoms: symptomsArray,
          medicines: formData.medicines,
          next_visit: formData.next_visit || undefined,
          notes: formData.notes || "",
        },
      }).unwrap();
      toast.success("Prescription created successfully");
      setIsCreateModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create prescription");
    }
  };

  const handleEditClick = (prescription) => {
    setEditingPrescription(prescription);
    resetEditForm(prescription);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    for (const medicine of formData.medicines) {
      if (!medicine.medicine_name || !medicine.dosage_time) {
        toast.error("Each medicine must have name and dosage time");
        return;
      }
    }

    try {
      const symptomsArray = formData.symptomsInput
        ? formData.symptomsInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      await updatePrescription({
        prescriptionId: editingPrescription._id,
        data: {
          prescriptionDate: formData.prescriptionDate,
          symptoms: symptomsArray,
          medicines: formData.medicines,
          next_visit: formData.next_visit || undefined,
          notes: formData.notes || "",
        },
      }).unwrap();
      toast.success("Prescription updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update prescription");
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        { medicine_name: "", dosage_time: "", aftermeal: true, notes: "" },
      ],
    });
  };

  const removeMedicine = (index) => {
    if (formData.medicines.length === 1) {
      toast.warning("At least one medicine is required");
      return;
    }
    const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const renderMedicineFields = () => {
    return formData.medicines.map((medicine, index) => (
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 mb-2"
      >
        <input
          type="text"
          placeholder="Medicine name *"
          value={medicine.medicine_name}
          onChange={(e) =>
            handleMedicineChange(index, "medicine_name", e.target.value)
          }
          className="px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
        />
        <input
          type="text"
          placeholder="Dosage time *"
          value={medicine.dosage_time}
          onChange={(e) =>
            handleMedicineChange(index, "dosage_time", e.target.value)
          }
          className="px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
        />
        <select
          value={medicine.aftermeal ? "true" : "false"}
          onChange={(e) =>
            handleMedicineChange(index, "aftermeal", e.target.value === "true")
          }
          className="px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all bg-white"
        >
          <option value="true">After Meal</option>
          <option value="false">Before Meal</option>
        </select>
        <button
          type="button"
          onClick={() => removeMedicine(index)}
          className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
        >
          Remove
        </button>
      </div>
    ));
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
            Failed to load data
          </h3>
          <p className="text-gray-600">
            {error?.data?.message || "Something went wrong"}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <FaArrowLeft className="w-4 h-4" />
        <span>Back to Prescribed Patients</span>
      </button>

      {/* Patient Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              {patient?.image ? (
                <Image
                  src={`${baseUriBackend}${patient.image}`}
                  alt={patient.fullName}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold">
                  {patient?.fullName?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patient?.fullName}
              </h1>
              <p className="text-gray-500">@{patient?.userName}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                {patient?.email && (
                  <span className="flex items-center gap-1">
                    <FaEnvelope className="w-3 h-3" />
                    {patient.email}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FaPhone className="w-3 h-3" />
                  {patient?.phone}
                </span>
                <span className="flex items-center gap-1">
                  <FaPrescription className="w-3 h-3 text-green-500" />
                  {prescriptions.length} Prescriptions
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <FaPlus className="w-4 h-4" />
            <span>New Prescription</span>
          </button>
        </div>
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
              This patient doesn't have any prescriptions yet
            </p>
            <button
              onClick={handleCreateClick}
              className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Prescription
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription._id}
              prescription={prescription}
              patient={patient}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}

      {/* Create Prescription Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Create Prescription
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Add new prescription for {patient?.fullName}
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prescription Date *
                  </label>
                  <input
                    type="date"
                    value={formData.prescriptionDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prescriptionDate: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Symptoms (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.symptomsInput || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        symptomsInput: e.target.value,
                      })
                    }
                    placeholder="Fever, Headache, Body ache"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Medicines *
                  </label>
                  {renderMedicineFields()}
                  <button
                    type="button"
                    onClick={addMedicine}
                    className="mt-2 px-4 py-2 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    + Add Medicine
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Next Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.next_visit}
                    onChange={(e) =>
                      setFormData({ ...formData, next_visit: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isCreating ? "Creating..." : "Create Prescription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Prescription Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Prescription
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Update prescription details
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prescription Date *
                  </label>
                  <input
                    type="date"
                    value={formData.prescriptionDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prescriptionDate: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Symptoms (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.symptomsInput || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        symptomsInput: e.target.value,
                      })
                    }
                    placeholder="Fever, Headache, Body ache"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Medicines *
                  </label>
                  {renderMedicineFields()}
                  <button
                    type="button"
                    onClick={addMedicine}
                    className="mt-2 px-4 py-2 text-sm text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    + Add Medicine
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Next Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.next_visit}
                    onChange={(e) =>
                      setFormData({ ...formData, next_visit: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUpdating ? "Updating..." : "Update Prescription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
