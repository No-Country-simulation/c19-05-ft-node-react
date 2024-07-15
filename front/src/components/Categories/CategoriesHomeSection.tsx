"use client";

import { categories } from "@/lib/data";
import Image from "next/image";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function CategoriesHomeSection() {
  const settings = {
    infinite: true,
    speed: 2000,
    autoplaySpeed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
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
    <section className="bg-white p-10">
      <h2 className="text-center text-4xl font-medium text-gray-800 mb-16">
        Categories
      </h2>

      <div className="slider-container">
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category.name} className="w-56 h-56">
              <Image
                src={category.image}
                alt="Picture of the category"
                width="160"
                height="160"
                className="w-full h-full mb-7"
              />

              <p className="text-center font-medium text-xl">{category.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
