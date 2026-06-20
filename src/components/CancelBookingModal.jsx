"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

const CancelBookingModal = ({
  booking,
  isOpen,
  onClose,
  onCancelled,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCancel = async () => {
    const {data:tokenData} = await authClient.token()
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5001/bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            'content-type': "application/json", 
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success("Booking cancelled");

      onCancelled(booking._id);

      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-2">
          Cancel Booking?
        </h2>

        <p className="text-sm text-gray-500 dark:text-slate-300 mb-6">
          Are you sure you want to cancel this booking?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 py-2.5 rounded-xl"
          >
            Keep
          </button>

          <button
            disabled={loading}
            onClick={handleCancel}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl"
          >
            {loading ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;