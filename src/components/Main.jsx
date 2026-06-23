import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import TutorCard from "./TutorCard";
import Image from "next/image";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";

const MainSection = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const tutors = await res.json();

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <h4 className="text-[#5B4CF2] bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 rounded-2xl px-1 w-40 font-bold">
            POPULAR TUTORS
          </h4>
          <h2 className="text-xl md:text-3xl font-bold">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 justify-items-center">
        {tutors.slice(0,4).map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>

      <FeaturesSection />
      <StatsSection />
    </div>
  );
};

export default MainSection;