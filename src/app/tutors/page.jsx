"use client";
import TutorCard from "@/components/TutorCard";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TutorPage = () => {
  const [tutors, setTutors] = useState([]);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = async (s = search, sd = startDate, ed = endDate) => {
    const params = new URLSearchParams();

    if (s) params.append("search", s);
    if (sd) params.append("startDate", sd);
    if (ed) params.append("endDate", ed);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?${params.toString()}`,
    );
    const data = await res.json();
    setTutors(data);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleFilter = () => {
    fetchTutors();
  };

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");

    fetchTutors("", "", "");
  };

  return (
    <div>
      <section className="bg-[#F8F6FF] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-sm dark:bg-slate-800">
              <GraduationCap className="text-primary" size={40} />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
                Find Your Perfect Tutor
              </h1>

              <p className="mt-3 text-slate-500 dark:text-slate-300">
                Browse verified tutors and book sessions that fit your schedule.
              </p>
            </div>
          </div>

          <Image
            src="/assets/book.png"
            alt="book image"
            width={72}
            height={72}
            className="hidden lg:block w-72"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Search Tutor
            </label>
            <input
              type="text"
              placeholder="Search tutors..."
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              End Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="md:flex items-end gap-2">
            <button className="btn bg-primary w-full text-white">Filter</button>

            <button className="btn btn-outline w-full">Reset</button>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-4">
          {tutors.map((t) => (
            <TutorCard key={t._id} tutor={t}></TutorCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
