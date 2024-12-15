"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


const Slider = ({ slides }: {
  slides: TY_Slider[]
}) => {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="md:h-[calc(100vh-80px)] h-[180px] overflow-hidden relative py-2">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <Link href={slide.link}
            className={`${slide.background} w-screen h-full flex flex-col gap-4 md:gap-16 xl:flex-row py-4 md:py-0 my-4  md:my-0`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-2/3 md:h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-2 md:gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <button className="hidden md:flex rounded-md bg-black text-white py-3 px-4 ">
                SHOP NOW
              </button>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full md:relative max-sm:hidden">
              <Image
                src={slide.banner}
                alt=""
                fill
                // width={400}
                // height={400}
                sizes="100%"
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute mx-auto text-center w-full items-center justify-center bottom-8 md:bottom-8 flex md:gap-4 gap-3">
        {slides.map((slide, index) => (
          <div
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""
              }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
