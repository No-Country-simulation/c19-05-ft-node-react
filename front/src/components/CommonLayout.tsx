"use client";

import React from "react";
import { usePathname } from "next/navigation";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";


const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const path = usePathname();
  const is404 = path === "/404";
  // console.log(is404);

  return (
    <>
      <NavBar />
      <div> {children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
