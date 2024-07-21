import React from 'react';
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection';
import Hero from '@/components/Hero/Hero';
import CategoriesHomeSection from '@/components/Categories/CategoriesHomeSection';
import About from '@/components/About/About';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="my-20 min-h-screen min-w-full">
      <Hero />
      <CategoriesHomeSection />
      <TestimonialsSection />
    </div>
  );
};
export default HomePage;
