import Image from 'next/image';
import React from 'react';
import HeroImage from '@/assets/hero-img.svg';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-5">
      <div className="container flex flex-wrap px-6 items-center justify-center mx-auto my-10 md:my-5 md:flex-row">
        <div className="mb-14 lg:mb-0 lg:w-1/2">
          <h1 className="max-w-xl text-[2.9rem] leading-none text-gray-800 font-extrabold text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
            Find experts, share your skills, and grow together.
          </h1>
          <p className="max-w-xl text-center text-gray-600 lg:text-left lg:max-w-md">
            Join our community and start your knowledge exchange journey today.
          </p>
          <div className="flex justify-center gap-4 mt-14 lg:justify-start">
            <Link
              href="/connect"
              className="text-white bg-green-400 font-medium rounded-lg px-5 py-4 text-center hover:bg-green-500 hover:drop-shadow-md transition duration-300 ease-in-out"
            >
              Connect Now
            </Link>
            <Link
              href="#about-us"
              className="text-gray-900 bg-gray-200 font-medium rounded-lg px-5 py-4 text-center hover:bg-gray-300 hover:drop-shadow-md transition duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            src={HeroImage}
            alt="Hero image"
            width="160"
            height="160"
            className="w-auto h-auto ml-auto"
          />
        </div>
      </div>
    </section>
  );
}
