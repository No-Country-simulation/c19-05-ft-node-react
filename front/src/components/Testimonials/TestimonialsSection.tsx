'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';

import Slider, { CustomArrowProps } from 'react-slick';
import Image from 'next/image';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

export default function Testimonials() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <div className="p-10">
      <h1 className="text-4xl text-center font-medium mb-8 text-gray-800">
        Testimonials
      </h1>

      <Slider {...settings}>
        {/* Aquí se hará un map devolviendo los testimonials */}
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/avatar/man.1.webp'}
              alt="Picture of testimonial"
              width="250"
              height="250"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
              Talent Trade has transformed my professional career! Thanks to its
              community of experts, I have acquired valuable knowledge and have
              been able to apply new techniques in my daily work. The quality of
              the courses and the ease of connecting with mentors from different
              disciplines is truly impressive.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Liam Anderson</p>
            <p className="text-sm">Software Engineer</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/avatar/woman.1.webp'}
              alt="Picture of testimonial"
              width="250"
              height="250"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
              The experience at Talent Trade has been phenomenal! I have
              discovered new areas of interest and have been able to delve into
              topics that have always fascinated me. The platform has allowed me
              to interact with high-level professionals, which has been key to
              my personal and professional development.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Maya Williams</p>
            <p className="text-sm">Graphic Designer</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/avatar/woman.3.webp'}
              alt="Picture of testimonial"
              width="250"
              height="250"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
              I cannot recommend Talent Trade enough! The diversity of experts
              and the quality of the content have exceeded my expectations. I
              have learned practical and theoretical skills that have boosted my
              career, all thanks to the incredible community that Talent Trade
              has built.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Sophia Hayes</p>
            <p className="text-sm">Journalist</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

const CustomPrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 -left-8 md:left-4 top-1/2 transform -translate-y-1/2 p-1 md:p-2 rounded-full bg-green-400 hover:bg-green-500 transition-all"
      onClick={onClick}
    >
      <MdOutlineArrowBackIosNew className="text-3xl text-white" />
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 -right-8 md:right-4 top-1/2 transform -translate-y-1/2 p-1 md:p-2 rounded-full bg-green-400 hover:bg-green-500 transition-all"
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos className="text-3xl text-white" />
    </button>
  );
};
