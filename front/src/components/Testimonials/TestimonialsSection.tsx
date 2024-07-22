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
              src={'/JavierMilei.jpg'}
              alt="Picture of testimonial"
              width="160"
              height="160"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
              ¡Talent Trade es una plataforma increíble! He podido intercambiar
              conocimientos con expertos de todo el mundo y mejorar mis
              habilidades en áreas que nunca imaginé.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Javier Milei</p>
            <p className="text-sm">Full Stack Economista</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/JavierMilei.jpg'}
              alt="Picture of testimonial"
              width="160"
              height="160"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
              ¡Talent Trade es una plataforma increíble! He podido intercambiar
              conocimientos con expertos de todo el mundo y mejorar mis
              habilidades en áreas que nunca imaginé.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Javier Milei</p>
            <p className="text-sm">Full Stack Economista</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/JavierMilei.jpg'}
              alt="Picture of testimonial"
              width="160"
              height="160"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
              ¡Talent Trade es una plataforma increíble! He podido intercambiar
              conocimientos con expertos de todo el mundo y mejorar mis
              habilidades en áreas que nunca imaginé.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Javier Milei</p>
            <p className="text-sm">Full Stack Economista</p>
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
      className="absolute z-10 -left-8 md:left-4 top-1/2 transform -translate-y-1/2 p-1 md:p-2 rounded-full bg-gray-300 hover:bg-gray-400/70 transition-all"
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
      className="absolute z-10 -right-8 md:right-4 top-1/2 transform -translate-y-1/2 p-1 md:p-2 rounded-full bg-gray-300 hover:bg-gray-400/70 transition-all"
      onClick={onClick}
    >
      <MdOutlineArrowForwardIos className="text-3xl text-white" />
    </button>
  );
};
