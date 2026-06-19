"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const UpdateTutorModal = ({ tutor, isOpen, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    tutorName: tutor.tutorName || "",
    subjects: (tutor.subjects || []).join(", "),
    availability: tutor.availability || "",
    totalSlot: tutor.totalSlot ?? "",
    hourlyFee: tutor.hourlyFee ?? "",
    sessionDate: tutor.sessionDate || "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateData = {
      tutorName: form.tutorName.trim(),
      subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
      availability: form.availability.trim(),
      totalSlot: Number(form.totalSlot),
      hourlyFee: Number(form.hourlyFee),
      sessionDate: form.sessionDate,
      requesterEmail: tutor.createdBy,
    };

    try {
      const res = await fetch(`http://localhost:5001/tutors/${tutor._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      toast.success("Tutor updated successfully!");
      onUpdated({ ...tutor, ...updateData }); 
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update tutor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-sm"
        >
          ✕
        </button>

        <h2 className="text-lg font-medium text-gray-900 mb-5">Update tutor</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Tutor Name</label>
            <input
              type="text"
              value={form.tutorName}
              onChange={handleChange("tutorName")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Subjects (comma separated)</label>
            <input
              type="text"
              value={form.subjects}
              onChange={handleChange("subjects")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
              placeholder="mathematics, physics"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Availability</label>
            <input
              type="text"
              value={form.availability}
              onChange={handleChange("availability")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Total Slot</label>
              <input
                type="number"
                min="0"
                value={form.totalSlot}
                onChange={handleChange("totalSlot")}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Hourly Fee</label>
              <input
                type="number"
                min="0"
                value={form.hourlyFee}
                onChange={handleChange("hourlyFee")}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Session Date</label>
            <input
              type="date"
              value={form.sessionDate}
              onChange={handleChange("sessionDate")}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full bg-purple-600 hover:bg-purple-800 disabled:opacity-60 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTutorModal;