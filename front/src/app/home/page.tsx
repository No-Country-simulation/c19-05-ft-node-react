import React from "react";
import Testimonials from "@/components/Testimonials/TestimonialsSection";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="container min-h-screen min-w-full  mx-auto">
      <Testimonials />
    </div>
  );
};

export default HomePage;
