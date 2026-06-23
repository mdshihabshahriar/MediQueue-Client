"use client";

import { motion } from "framer-motion";
import { CalendarDays, UserRound, ShieldCheck, Clock3 } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Easy Booking",
    description:
      "Book sessions in just a few clicks. Fast, simple and hassle-free.",
  },
  {
    icon: UserRound,
    title: "Verified Tutors",
    description:
      "All tutors are verified professionals with proven teaching experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Safe",
    description:
      "Your data and payments are protected with top security standards.",
  },
  {
    icon: Clock3,
    title: "Flexible Schedule",
    description:
      "Choose time slots that fit your routine and learn comfortably.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="container mx-auto mt-16">
      <div className="bg-[#F8F6FF] dark:bg-slate-900 rounded-3xl p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`px-6 py-4 ${
                  index !== features.length - 1
                    ? "lg:border-r border-[#E9E4FF]"
                    : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-full bg-[#F1ECFF] flex items-center justify-center shrink-0">
                    <Icon size={34} className="text-[#6D5DFC]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-8 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;