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
    speed: 1000,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-4">
      <Slider {...settings}>
        {images.concat(images).map((src, index) => (
          <div key={index} className="flex justify-center px-2">
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={300}
              height={200}
              className="rounded-md shadow-md object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;