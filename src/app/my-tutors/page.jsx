"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import UpdateTutorModal from "@/components/UpdateTutorModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

const MyTutorsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    document.title = "My Tutors | MediQueue";
  }, []);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTutor, setEditingTutor] = useState(null);
  const [deletingTutor, setDeletingTutor] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const handleUpdated = (updatedTutor) => {
    setTutors((prev) =>
      prev.map((t) => (t._id === updatedTutor._id ? updatedTutor : t))
    );
  };

  const handleDeleted = (deletedId) => {
    setTutors((prev) => prev.filter((t) => t._id !== deletedId));
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-4 py-16 text-center"
      >
        <p className="text-gray-400">Please login to view your tutors.</p>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400"
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
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Tutors</h1>

      <AnimatePresence mode="wait">
        {tutors.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-gray-200 rounded-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
              <GraduationCap className="text-purple-400" size={28} />
            </div>
            <h3 className="text-gray-900 dark:text-white font-medium mb-1">No tutors yet</h3>
            <p className="text-sm text-gray-400 dark:text-slate-300 max-w-xs">
              You haven&apos;t added any tutor profiles. Once you do, they&apos;ll show up here.
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
                <tr className="bg-gray-50 dark:bg-slate-900 text-left text-xs text-gray-500 dark:text-white uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">Tutor Name</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Available</th>
                  <th className="px-4 py-3 font-medium">Total Slot</th>
                  <th className="px-4 py-3 font-medium">Fee</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {tutors.map((tutor, index) => (
                    <motion.tr
                      key={tutor._id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-t border-gray-100 dark:border-slate-600"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-slate-300">{tutor.tutorName}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-300">
                        {(tutor.subjects || []).join(", ")}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-300">{tutor.availability}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-300">{tutor.totalSlot}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-300">৳{tutor.hourlyFee}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-slate-300">{tutor.sessionDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingTutor(tutor)}
                            className="p-2 rounded-lg hover:bg-purple-50 text-purple-600"
                            title="Update"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => setDeletingTutor(tutor)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {editingTutor && (
        <UpdateTutorModal
          tutor={editingTutor}
          isOpen={!!editingTutor}
          onClose={() => setEditingTutor(null)}
          onUpdated={handleUpdated}
        />
      )}

      {deletingTutor && (
        <DeleteConfirmModal
          tutor={deletingTutor}
          isOpen={!!deletingTutor}
          onClose={() => setDeletingTutor(null)}
          onDeleted={handleDeleted}
        />
      )}
    </motion.div>
  );
};

export default MyTutorsPage;