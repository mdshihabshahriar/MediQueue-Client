"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingModal = ({ tutor, isOpen, onClose }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [studentName, setStudentName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sessionDate = tutor.sessionDate ? new Date(tutor.sessionDate) : null;
  if (sessionDate) sessionDate.setHours(0, 0, 0, 0);

  const isSlotFull = Number(tutor.totalSlot) <= 0;
  const isLate = sessionDate && today > sessionDate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      toast.error("Please login first to book a session.");
      return;
    }

    if (!studentName.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        userId: user.id,
        studentName: studentName.trim(),
        phone: phone.trim(),
        tutorId: tutor._id,
        tutorName: tutor.tutorName,
        studentEmail: user.email,
        bookStatus: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      const bookingRes = await fetch("http://localhost:5001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const bookingResult = await bookingRes.json();

      if (!bookingRes.ok) {
        toast.error(bookingResult.message);
        return;
      }

      toast.success("Session booked successfully!");
      router.refresh();

      onClose();
    } catch (err) {
      toast.error("Something went wrong");
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

        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Book a session
        </h2>
        <p className="text-xs text-gray-400 mb-5">with {tutor.tutorName}</p>

        {isSlotFull ? (
          <div className="rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
            No available slots left.
          </div>
        ) : isLate ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3">
            Booking is not available yet for this tutor.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Student Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-400"
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Student Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tutor</label>
              <input
                type="text"
                value={`${tutor.tutorName} (${tutor._id})`}
                readOnly
                className="w-full rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>

            {error && <p className="text-xs text-red-500 -mt-1">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full bg-purple-600 hover:bg-purple-800 disabled:opacity-60 text-white text-sm font-medium py-3 rounded-xl transition-colors"
            >
              {loading ? "Booking..." : "Confirm booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
