"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const slides = [
  {
    src: "/assets/image1.jpg",
    alt: "image1",
    title: <><span className="text-[#5B4CF2]">Find The Perfect Tutor</span> For Your Success</>,
    desc: "Connect with experienced tutors, book learning sessions, and achieve your academic goals with confidence.",
    btnText: "Explore Tutors",
    btnLink: "/tutors",
  },
  {
    src: "/assets/image2.avif",
    alt: "image2",
    title: <><span className="text-[#5B4CF2]">Learn Smarter,</span><br />Not Harder</>,
    desc: "Flexible schedules, personalized guidance, and expert support to help you excel in every subject.",
    btnText: "Book A Session",
    btnLink: "/tutors",
  },
  {
    src: "/assets/image3.webp",
    alt: "image3",
    title: <><span className="text-[#5B4CF2]">Your Learning Journey</span> Starts Here</>,
    desc: "Discover top-rated tutors, manage sessions effortlessly and learn at your own pace.",
    btnText: "Get Started",
    btnLink: "/login",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <div className="relative w-full h-[40vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
            <div className="max-w-3xl">
              <h1 className="mb-5 text-4xl md:text-7xl font-bold">{slide.title}</h1>
              <p className="mb-6 text-lg text-gray-200">{slide.desc}</p>
              <Link href={slide.btnLink}>
                <button className="btn bg-[#6D5DFC] border-none text-white hover:bg-[#5B4CF2]">
                  {slide.btnText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2 flex justify-between z-20">
        <button onClick={prev} className="btn btn-circle bg-white/20 text-white">❮</button>
        <button onClick={next} className="btn btn-circle bg-white/20 text-white">❯</button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-[#6D5DFC] w-5" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;