import React from "react";
import TestimonialsSection from "@/components/Testimonials/TestimonialsSection";
import Hero from "@/components/Hero/Hero";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="my-20 min-h-screen min-w-full">
      <Hero />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
