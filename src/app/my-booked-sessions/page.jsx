"use client";

import { authClient } from "@/lib/auth-client";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import CancelBookingModal from "@/components/CancelBookingModal";
import { motion, AnimatePresence } from "framer-motion";

const MyBookingsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const handleCancelled = (bookingId) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              bookStatus: "cancelled",
            }
          : booking
      )
    );
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-16"
      >
        Please login first.
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-16"
      >
        <span className="loading loading-dots loading-xl"></span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <AnimatePresence mode="wait">
        {bookings.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="border border-dashed border-gray-200 rounded-2xl py-20 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="text-purple-500" />
            </div>

            <h3 className="font-semibold text-lg">
              No bookings found
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              You haven&apos;t booked any tutor sessions yet.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="overflow-x-auto border border-gray-200 dark:border-slate-600 rounded-xl"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900">
                  <th className="px-4 py-3 text-left">
                    Tutor Name
                  </th>

                  <th className="px-4 py-3 text-left">
                    Student Name
                  </th>

                  <th className="px-4 py-3 text-left">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {bookings.map((booking, index) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-t border-gray-100 dark:border-slate-600"
                    >
                      <td className="px-4 py-3">
                        {booking.tutorName}
                      </td>

                      <td className="px-4 py-3">
                        {booking.studentName}
                      </td>

                      <td className="px-4 py-3">
                        {booking.studentEmail}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.bookStatus === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {booking.bookStatus}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          disabled={booking.bookStatus === "cancelled"}
                          onClick={() => setSelectedBooking(booking)}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedBooking && (
        <CancelBookingModal
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancelled={handleCancelled}
        />
      )}
    </motion.div>
  );
};

export default MyBookingsPage;