import TalentTradeLogo from "@/assets/Talent_Trade_Logo.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { HiMenu, HiUserCircle } from "react-icons/hi"

export default function Header() {

    const [auth, setAuth] = useState(true)

    const [navbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!navbarVisible);
    };

  return (
    <header className="shadow-md py-4 w-full bg-white">
       <div className="container mx-auto px-6 flex items-center justify-between gap-x-4">
        <Link
            href={"/"}
        >
            <Image 
                src={TalentTradeLogo} 
                alt="Picture of testimonial"
                width="250"
                height="50"
            />
        </Link>

        <div className="w-full hidden lg:flex lg:justify-center lg:gap-x-16">
            <Link 
                href={`/`} 
                className={`cursor-pointer hover:text-gray-900`}
            >
                Home
            </Link>
            <Link 
                href={`/connect/`} 
                className={`cursor-pointer hover:text-gray-900`}
            >
                Connect
            </Link>
            <Link 
                href={`/support/`} 
                className={`cursor-pointer hover:text-gray-900`}
            >
                Support
            </Link>
            {auth && (
                <Link 
                href={`/support/`} 
                className={`cursor-pointer text-green-500 hover:text-green-600 font-bold border-b-2 border-gray-300 hover:border-gray-400`}
                >
                    Trades
                </Link>
            )}
        </div>

        {!auth ? (
                <div>
                    <Link href="/sign-up" className="border border-gray-600 text-sm md:text-base py-2 px-3 md:py-3 md:px-4 rounded-l-xl hover:bg-gray-200">
                        <span className="whitespace-nowrap font-medium">Sign Up</span>
                    </Link>
                    <Link   
                        href="/" className="border-t border-r border-b border-gray-600 text-sm md:text-base py-2 px-3 md:py-3 md:px-4 rounded-r-xl hover:bg-gray-200"
                        onClick={() => setAuth(!auth)}
                    >
                        <span className="whitespace-nowrap font-medium">Sign In</span>
                    </Link>
                </div>
              ) : (
                <div className="relative">
                  <button 
                    className="flex gap-1 items-center border hover:shadow-sm py-2 px-3 rounded-full bg-white whitespace-nowrap"
                    onClick={toggleNavbar}
                  >
                    <HiMenu className="text-primario text-xl" />
                    <HiUserCircle className="text-2xl text-secundario" />
                    <span className='text-xs font-bold'>Owen</span>
                  </button>

                  {navbarVisible && (
                    <div className="bg-white shadow p-4 rounded-lg absolute right-0 w-full mt-4 z-40 whitespace-nowrap">
                      <nav>
                        <ul className="flex flex-col gap-3 text-xs font-semibold">
                          <li>
                            <Link href={'/user/profile'}>My profile</Link>
                          </li>
                          <li>
                            <Link href={'/user/trades'}>My trades</Link>
                          </li>
                          <li>
                            <button
                                onClick={() => setAuth(!auth)}
                            >
                              Sign out
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}

                </div>
              )}
       </div>

       <div className="w-full flex justify-center gap-x-8 mt-4 text-center flex-wrap lg:hidden">
            <Link 
                href={`/`} 
                className={`cursor-pointer hover:text-gray-900 text-sm`}
            >
                Home
            </Link>
            <Link 
                href={`/connect/`} 
                className={`cursor-pointer hover:text-gray-900 text-sm`}
            >
                Connect
            </Link>
            <Link 
                href={`/support/`} 
                className={`cursor-pointer hover:text-gray-900 text-sm`}
            >
                Support
            </Link>
            {auth && (
                <Link 
                href={`/support/`} 
                className={`cursor-pointer text-green-500 hover:text-green-600 font-bold border-b-2 border-gray-300 hover:border-gray-400 text-sm`}
                >
                    Trades
                </Link>
            )}
        </div>
    </header>
  )
}
