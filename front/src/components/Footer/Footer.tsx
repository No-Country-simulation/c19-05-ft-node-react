import Link from 'next/link';
import LogoTitleSVG from '@/assets/logos/LogoTitleSVG';
import './Footer.css';
import { FaCopyright } from 'react-icons/fa';

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="bg-white px-6 py-8 mx-auto">
        <div className="footer-container">
          <div className="footer-logo flex flex-wrap justify-center align-items-center mt-6 -mx-4">
            <Link href={'/'}>
              <LogoTitleSVG height={'48'} width={'308'} />
            </Link>
            <div className="footer-copyright flex">
              <FaCopyright className="footer-copyright-logo" />
              <h1 className="footer-logo-text text-xl-start">
                {' '}
                - All rights reserved
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <h1 className="footer-copyright-text">
              By using this site you agree to our terms of use and privacy
              policy.
            </h1>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
