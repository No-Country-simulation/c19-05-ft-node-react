'use client';

import { categories } from '@/lib/data';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function CategoriesHomeSection() {
  const settings = {
    infinite: true,
    speed: 3000,
    autoplaySpeed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 2400,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1600,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
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
            <div
              key={category.name}
              className="w-56 h-56 flex flex-col items-center"
            >
              <Link href={`/connect?category=${category.name}`}>
                <category.image className="w-full h-full mb-7" />
                <p className="text-center font-medium text-xl">
                  {category.name}
                </p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
