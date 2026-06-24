'use client'
import Link from "next/link";
import { SearchX } from "lucide-react";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
      document.title = "404 | MediQueue";
    }, []);
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-base-100 px-6">
      <div className="max-w-2xl text-center">
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
            <SearchX size={60} className="text-primary" />
          </div>
        </div>

        <h1 className="mt-8 text-7xl font-extrabold text-primary">
          404
        </h1>

        <h2 className="mt-4 text-4xl font-bold text-base-content">
          Page Not Found
        </h2>

        <p className="mt-4 text-base-content/70 text-lg leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <button className="btn bg-[#6D5DFC] hover:bg-[#5B4CF2] border-none text-white px-8">
              Back To Home
            </button>
          </Link>

          <Link href="/tutors">
            <button className="btn btn-outline border-[#6D5DFC] text-[#6D5DFC]">
              Browse Tutors
            </button>
          </Link>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-base-content">
            Need Help?
          </h3>

          <p className="text-base-content/60 mt-2">
            Explore expert tutors and book your next learning session with
            MediQueue.
          </p>
        </div>
      </div>
    </section>
  );
}