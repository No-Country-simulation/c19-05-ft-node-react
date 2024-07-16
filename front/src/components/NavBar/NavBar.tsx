import TalentTradeLogo from '@/assets/Talent_Trade_Logo.png';
import { useAuth } from '@/context/session/sessionContext';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiUserCircle } from 'react-icons/hi';

export default function NavBar() {
  const [auth, setAuth] = useState(true);
  const { user, logout } = useAuth();
  const [navbarVisible, setNavbarVisible] = useState(false);

  console.log(user?.avatar);

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <header className="fixed top-0 left-0 shadow-md py-2 w-full bg-white z-40">
      <div className="container mx-auto px-6 flex items-center justify-between gap-x-4">
        <Link href={'/'}>
          <Image
            src={TalentTradeLogo}
            alt="Picture of testimonial"
            width="250"
            height="50"
            className="w-36 lg:w-60"
          />
        </Link>

        <nav className="w-full hidden lg:flex lg:justify-center lg:gap-x-16">
          <Link href={`/`} className={`cursor-pointer hover:text-gray-900`}>
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
        </nav>

        {!user ? (
          <div>
            <Link
              href="/auth/sign-up"
              className="border border-gray-600 text-sm lg:text-base py-2 px-3 rounded-l-xl hover:bg-gray-200"
            >
              <span className="whitespace-nowrap font-medium">Sign Up</span>
            </Link>
            <Link
              href="/auth/sign-in"
              className="border-t border-r border-b border-gray-600 text-sm lg:text-base py-2 px-3 rounded-r-xl hover:bg-gray-200"
            >
              <span className="whitespace-nowrap font-medium">Sign In</span>
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              className="flex gap-1 items-center border border-gray-300 hover:shadow-sm py-2 px-3 rounded-full bg-white whitespace-nowrap"
              onClick={toggleNavbar}
            >
              <HiMenu className="text-xl" />
              {/* <HiUserCircle className="text-2xl" /> */}
              <Image src={user.avatar} width={24} height={24} alt="messi" />
              <span className="text-xs font-bold">{user?.name}</span>
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
                      <button onClick={() => logout()}>Sign out</button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>

      <nav className="w-full flex justify-center gap-x-8 mt-4 text-center flex-wrap lg:hidden">
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
      </nav>
    </header>
  );
}
