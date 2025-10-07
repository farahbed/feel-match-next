"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    "/images/Imgc.webp",
    "/images/Imgd.webp",
    "/images/Imga.webp",
    "/images/Img0.webp",
    "/images/Imgafro.webp",
  ];

  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      className="w-full py-8 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #0f0f0f 0%, #1b1b1b 50%, #0f0f0f 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {images.concat(images).map((src, index) => (
            <div key={index} className="flex justify-center px-2">
              <div className="relative group">
                {/* Contour doré doux */}
                <div className="absolute inset-0 rounded-xl border border-[#c2a661]/40 group-hover:border-[#c2a661] transition-all duration-300"></div>

                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={320}
                  height={200}
                  className="rounded-xl object-cover shadow-[0_0_15px_rgba(194,166,97,0.2)] transition-transform duration-500 group-hover:scale-[1.05] group-hover:shadow-[0_0_25px_rgba(194,166,97,0.4)]"
                />

                {/* Légère surbrillance au hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500 bg-gradient-to-t from-[#c2a661] to-transparent"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;