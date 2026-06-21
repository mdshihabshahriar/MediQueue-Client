import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import TutorCard from "./TutorCard";
import {
  CalendarDays,
  UserRound,
  ShieldCheck,
  Clock3,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

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

const MainSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const tutors = await res.json();
  // console.log(tutors);
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <h4 className="text-[#5B4CF2] font-bold bg-purple-100 rounded-2xl px-1 w-40">
            POPULAR TUTORS
          </h4>
          <h2 className="text-3xl font-bold">
            Explore Our <span className="text-[#5B4CF2]">Top Tutors</span>
          </h2>
        </div>
        <div>
          <Link href={"/tutors"}>
            <button className="btn font-bold flex items-center gap-2 border border-[#6D5DFC] text-[#6D5DFC] hover:bg-[#5B4CF2] hover:text-white">
              View All Tutors <FaArrowRightLong />
            </button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mt-10">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
        ))}
      </div>
      <section className="container mx-auto mt-16">
        <div className="bg-[#F8F6FF] dark:bg-slate-900 rounded-3xl p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className={`px-6 py-4 ${
                    index !== features.length - 1
                      ? "lg:border-r border-[#E9E4FF]"
                      : ""
                  }`}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-16">
        <div className="bg-[#F8F6FF] dark:bg-slate-900 rounded-3xl p-8 lg:p-12 grid lg:grid-cols-3 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Trusted By Learners
              <br />
              Across The Country
            </h2>

            <p className="mt-6 text-slate-600 dark:text-slate-300 text-lg">
              Thousands of students are already achieving their goals with
              MediQueue.
            </p>

            <Link href={'/login'}><button className="mt-8 bg-[#6D5DFC] hover:bg-[#5B4CF2] transition-all text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 cursor-pointer">
              Join MediQueue Today
              <span><ArrowRight></ArrowRight></span>
            </button></Link>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="text-center border-b border-dashed border-purple-200 pb-6">
              <div className="text-[#6D5DFC] text-3xl mb-2">👥</div>
              <h3 className="text-5xl font-bold">1500+</h3>
              <p className="text-slate-600 mt-2 dark:text-slate-300">Active Students</p>
            </div>

            <div className="text-center border-b border-dashed border-purple-200 pb-6">
              <div className="text-[#6D5DFC] text-3xl mb-2">🎓</div>
              <h3 className="text-5xl font-bold">200+</h3>
              <p className="text-slate-600 mt-2 dark:text-slate-300">Expert Tutors</p>
            </div>

            <div className="text-center pt-4">
              <div className="text-[#6D5DFC] text-3xl mb-2">📚</div>
              <h3 className="text-5xl font-bold">3200+</h3>
              <p className="text-slate-600 mt-2 dark:text-slate-300">Sessions Completed</p>
            </div>

            <div className="text-center pt-4">
              <div className="text-[#6D5DFC] text-3xl mb-2">✅</div>
              <h3 className="text-5xl font-bold">98%</h3>
              <p className="text-slate-600 mt-2 dark:text-slate-300">Satisfaction Rate</p>
            </div>
          </div>

          <div>
            <div className="light: bg-white rounded-3xl p-8 shadow-sm dark:bg-slate-800">
              <div className="text-[#6D5DFC] text-6xl leading-none">“</div>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mt-4">
                MediQueue helped me find the perfect tutor for my engineering
                math. The booking process is smooth and the sessions are
                extremely helpful!
              </p>

              <div className="flex items-center gap-4 mt-8">
                <Image
                  src="https://i.pravatar.cc/100?img=5"
                  alt=""
                  className="w-14 h-14 rounded-full object-cover" width={100} height={100}
                />

                <div>
                  <h4 className="font-semibold text-lg">Sadia Rahman</h4>
                  <p className="text-slate-500 dark:text-slate-300">Student, BUET</p>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-6">
              <div className="w-3 h-3 rounded-full bg-[#6D5DFC]" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainSection;
