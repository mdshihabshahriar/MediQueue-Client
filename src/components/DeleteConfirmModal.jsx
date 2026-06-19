"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const DeleteConfirmModal = ({ tutor, isOpen, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5001/tutors/${tutor._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Tutor deleted.");
      onDeleted(tutor._id);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete tutor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Delete tutor?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <span className="font-medium">{tutor.tutorName}</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-sm font-medium text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;