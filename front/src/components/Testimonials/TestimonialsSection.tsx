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
              src={'/gallery1.png'}
              alt="Picture of testimonial"
              width="250"
              height="250"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
            ¡Talent Trade ha transformado mi carrera profesional! Gracias a su comunidad de expertos, 
            he adquirido conocimientos valiosos y he podido aplicar nuevas técnicas en mi trabajo diario. 
            La calidad de los cursos y la facilidad para conectar con mentores de diferentes disciplinas es realmente impresionante.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Liam Anderson</p>
            <p className="text-sm">Ingeniero de Software</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/gallery2.png'}
              alt="Picture of testimonial"
              width="250"
              height="250"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
            ¡La experiencia en Talent Trade ha sido fenomenal! He descubierto nuevas áreas de interés y he 
            podido profundizar en temas que siempre me han fascinado. La plataforma me ha permitido 
            interactuar con profesionales de alto nivel, lo que ha sido clave para mi desarrollo personal y profesional.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Maya Williams</p>
            <p className="text-sm">Diseñadora Gráfica</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center text-center text-gray-800 my-8 px-6">
            <Image
              src={'/gallery3.png'}
              alt="Picture of testimonial"
              width="250"
              height="250"
              className="rounded-full object-center mb-8"
            />

            <h3 className="sm:max-w-sm md:max-w-lg lg:max-w-2xl mb-6 text-lg">
            ¡No puedo recomendar Talent Trade lo suficiente! La diversidad de expertos y la calidad del contenido han superado mis expectativas. 
            He aprendido habilidades prácticas y teóricas que han impulsado mi carrera, todo gracias a la increíble comunidad que Talent Trade ha construido.
            </h3>

            <BiSolidQuoteAltLeft className="text-5xl text-green-400 mb-6" />

            <p className="font-bold text-lg mb-2">Sophia Hayes</p>
            <p className="text-sm">Periodista</p>
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
