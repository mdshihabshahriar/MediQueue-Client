import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full h-[80vh] overflow-hidden">

      {/* Slide 1 */}
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
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a href="#slide3" className="btn btn-circle bg-white/20">❮</a>
          <a href="#slide2" className="btn btn-circle bg-white/20">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
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
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Second Slide</h1>
              <p className="mb-5">Next.js optimized image banner</p>
              <button className="btn btn-primary">Explore</button>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a href="#slide1" className="btn btn-circle bg-white/20">❮</a>
          <a href="#slide3" className="btn btn-circle bg-white/20">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
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
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello again</h1>
              <p className="mb-5">Third banner content</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a href="#slide2" className="btn btn-circle bg-white/20">❮</a>
          <a href="#slide1" className="btn btn-circle bg-white/20">❯</a>
        </div>
      </div>

    </div>
  );
};

export default Banner;