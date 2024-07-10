"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer/Footer";
import Header from "./Header/Header";

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const path = usePathname();
  const is404 = path === "/404";
  // console.log(is404);

  return (
    <>
      <Header />
      <div> {children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
