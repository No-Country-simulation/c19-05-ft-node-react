import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import avatar from "@/assets/avatar.jpeg";
type Props = {};

const NavBar = (props: Props) => {
  //==============etates==========
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("rgb(91 33 182)");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [darkMode, setDarkMode] = useState(false);
  //handlers
  const handleOpen = () => {
    setOpen(!open);
  };

  //===========useEffect=============

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 240) {
        //rgba(15, 23, 42, 0.7)
        //#FFFFFF
        setColor("#FFFFFF");
        setTextColor("rgb(91 33 182)");
      } else {
        setColor("rgb(91 33 182)");
        setTextColor("#FFFFFF");
      }
    };
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  /*
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
*/

  return (
    <>
      <div
        style={{ backgroundColor: `${color}` }}
        className="fixed left-0 top-0 w-full  z-10 ease-in duration-300  rounded-b-md "
      >
        {/* header web */}
        <div
          className={`max-w-full h-16 flex items-center justify-between p-2 mx-2`}
          style={{ color: textColor }}
        >
          <Link href="/" className="flex justify-center items-center gap-1">
            {/*
              <Image
              src={""}
              alt="logo"
              width={45}
              height={45}
              className="object-contain img"
            />
            */}

            <h1 className="font-bold text-xl">No country</h1>
          </Link>

          {/**aca empieza el  */}

          <ul
            style={{ color: `${textColor}` }}
            className="hidden  sm:flex  items-center justify-center "
          >
            {/*
            
            <li>
              <MdDarkMode
                size={30}
                color={darkMode ? "white" : "#229c19"}
                className={`p-1 rounded-full hover:border-2 ${
                  darkMode ? "border-white" : "border-[#229c19]"
                } `}
                onClick={toggleDarkMode}
              />
            </li>
            */}
            <li>
              <Link href="/" className="p-4">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/#" className="p-4">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/#" className="p-4">
                Tareas
              </Link>
            </li>

            <li>
              <Image
                alt="avatar"
                src={avatar}
                width={27}
                height={27}
                className="rounded-full"
              />
            </li>
          </ul>

          {/*=============== Mobile================= */}

          {/* ======mobile button menu======= */}
          <div className="block  sm:hidden z-50  relative" onClick={handleOpen}>
            {/* aca de avcuerdo a si esta abierto o cerrado el drawer se ve un icono o otro */}

            {open ? (
              <AiOutlineClose size={27} color="#000000" />
            ) : (
              <AiOutlineMenu
                size={30}
                color={`${textColor}`}
                style={{ border: `1px solid ${textColor}` }}
                className={`p-1 rounded-full `}
              />
            )}
          </div>

          {/*  mobile menu*/}

          <div
            className={
              open
                ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white  text-black text-center ease-in-out duration-500"
                : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-black text-center ease-in-out duration-500"
            }
          >
            <ul className="z-50">
              <li>
                <Link href="/" className="p-4 text-4xl  hover:text-gray-500">
                  Inicio
                </Link>
              </li>
              <li className="m-4">
                <Link href="/#" className="p-4  text-4xl  hover:text-gray-500">
                  Acerca de Nosotros
                </Link>
              </li>
              <li className="m-4">
                <Link href="#" className="p-4  text-4xl hover:text-gray-500   ">
                  Tareas
                </Link>
              </li>
            </ul>
          </div>

          {/* FIN de mobile button */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
