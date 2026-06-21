import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full h-[40vh] md:h-[80vh] overflow-hidden">
      <div id="slide1" className="carousel-item relative w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="/assets/image1.jpg"
            alt="image1"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-3xl">
              <h1 className="mb-5 text-4xl md:text-7xl font-bold">
                <span className="text-[#5B4CF2]">Find The Perfect Tutor</span> For Your Success
              </h1>
              <p className="mb-6 text-lg text-gray-200">
                Connect with experienced tutors, book learning sessions, and
                achieve your academic goals with confidence.
              </p>
              <Link href={'/tutors'}><button className="btn bg-[#6D5DFC] border-none text-white hover:bg-[#5B4CF2]">Explore Tutors</button></Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <Link href="#slide3" className="btn btn-circle bg-white/20">
            ❮
          </Link>
          <Link href="#slide2" className="btn btn-circle bg-white/20">
            ❯
          </Link>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="/assets/image2.avif"
            alt="image2"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-3xl">
              <h1 className="mb-5 text-4xl md:text-7xl font-bold"><span className="text-[#5B4CF2]">Learn Smarter,</span> <br />Not Harder</h1>
              <p className="mb-6 text-lg text-gray-200">Flexible schedules, personalized guidance, and expert support to help you excel in every subject.</p>
              <Link href={'/tutors'}><button className="btn bg-[#6D5DFC] border-none text-white hover:bg-[#5B4CF2]">Book A Session</button></Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <Link href="#slide1" className="btn btn-circle bg-white/20">
            ❮
          </Link>
          <Link href="#slide3" className="btn btn-circle bg-white/20">
            ❯
          </Link>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="/assets/image3.webp"
            alt="image3"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-3xl">
              <h1 className="mb-5 text-4xl md:text-7xl font-bold"><span className="text-[#5B4CF2]">Your Learning Journey</span> Starts Here</h1>
              <p className="mb-6 text-lg text-gray-200">Discover top-rated tutors, manage sessions effortlessly and learn at your own pace with MediQueue.</p>
              <Link href={'/login'}><button className="btn bg-[#6D5DFC] border-none text-white hover:bg-[#5B4CF2]">Get Started</button></Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <Link href="#slide2" className="btn btn-circle bg-white/20">
            ❮
          </Link>
          <Link href="#slide1" className="btn btn-circle bg-white/20">
            ❯
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
