import React from "react";
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
    speed: 5000, // Vitesse plus lente pour un effet fluide
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 0, // Pas de pause entre les slides
    cssEase: "linear", // Déplacement fluide
    centerMode: true,
    variableWidth: true, // Permet un enchaînement sans espace noir
    arrows: false, // Suppression des flèches
    pauseOnHover: false, // Évite les interruptions au survol
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-4">
      <Slider {...settings}>
        {images.concat(images).map((src, index) => ( // Duplication pour assurer la boucle continue
          <div key={index} className="flex justify-center">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="rounded-md shadow-sm"
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
