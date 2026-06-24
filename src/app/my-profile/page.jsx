'use client';

import { authClient } from "@/lib/auth-client";
import { Mail, ShieldCheck, ShieldAlert, CalendarDays } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    document.title = "My Profile | MediQueue";
  }, []);

  if (isPending) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center bg-[#F8F6FF] dark:bg-slate-900"
      >
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex items-center justify-center bg-[#F8F6FF] dark:bg-slate-900"
      >
        <p className="text-gray-500 dark:text-gray-300">You&apos;re not signed in.</p>
      </motion.div>
    );
  }

  const initials = (user.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#F8F6FF] dark:bg-slate-900 px-4">

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-6"
      >

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center -mt-16"
        >
          <div className="w-24 h-24 rounded-full p-1 bg-linear-to-tr from-purple-500 to-indigo-500">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={96}
                height={96}
                className="rounded-full w-full h-full object-cover bg-white"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-700 text-white flex items-center justify-center text-xl font-bold">
                {initials}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="text-center mt-4"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-300 mt-1">
            <Mail size={14} />
            {user.email}
          </div>
        </motion.div>

        <motion.hr
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="my-5 border-gray-200 dark:border-slate-700"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.4 }}
          className="space-y-4 text-sm"
        >

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              {user.emailVerified ? (
                <ShieldCheck size={16} className="text-green-500" />
              ) : (
                <ShieldAlert size={16} className="text-yellow-500" />
              )}
              Email status
            </div>

            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user.emailVerified
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
              }`}
            >
              {user.emailVerified ? "Verified" : "Not verified"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <CalendarDays size={16} />
              Member since
            </div>

            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {formatDate(user.createdAt)}
            </span>
          </div>

        </motion.div>
      </motion.div>

    </div>
  );
};

export default ProfilePage;