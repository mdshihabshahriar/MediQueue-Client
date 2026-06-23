"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { emoji: "👥", count: "1500+", label: "Active Students", border: true },
  { emoji: "🎓", count: "200+", label: "Expert Tutors", border: true },
  { emoji: "📚", count: "3200+", label: "Sessions Completed", border: false },
  { emoji: "✅", count: "98%", label: "Satisfaction Rate", border: false },
];

const StatsSection = () => {
  return (
    <section className="container mx-auto mt-16">
      <div className="bg-[#F8F6FF] dark:bg-slate-900 rounded-3xl p-8 lg:p-12 grid lg:grid-cols-3 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            Trusted By Learners
            <br />
            Across The Country
          </h2>
          <p className="mt-6 text-slate-600 dark:text-slate-300 text-lg">
            Thousands of students are already achieving their goals with
            MediQueue.
          </p>
          <Link href={"/login"}>
            <button className="mt-8 bg-[#6D5DFC] hover:bg-[#5B4CF2] transition-all text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 cursor-pointer">
              Join MediQueue Today
              <span>
                <ArrowRight />
              </span>
            </button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center ${
                stat.border
                  ? "border-b border-dashed border-purple-200 pb-6"
                  : "pt-4"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-[#6D5DFC] text-3xl mb-2">{stat.emoji}</div>
              <h3 className="text-5xl font-bold">{stat.count}</h3>
              <p className="text-slate-600 mt-2 dark:text-slate-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-sm dark:bg-slate-800">
            <div className="text-[#6D5DFC] text-6xl leading-none">"</div>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mt-4">
              MediQueue helped me find the perfect tutor for my engineering
              math. The booking process is smooth and the sessions are
              extremely helpful!
            </p>
            <div className="flex items-center gap-4 mt-8">
              <Image
                src="https://i.pravatar.cc/100?img=5"
                alt=""
                className="w-14 h-14 rounded-full object-cover"
                width={100}
                height={100}
              />
              <div>
                <h4 className="font-semibold text-lg">Sadia Rahman</h4>
                <p className="text-slate-500 dark:text-slate-300">
                  Student, BUET
                </p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            <div className="w-3 h-3 rounded-full bg-[#6D5DFC]" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;