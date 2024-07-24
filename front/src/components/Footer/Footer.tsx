import Link from 'next/link';
import LogoTitleSVG from '@/assets/logos/LogoTitleSVG';
import styles from './Footer.module.css';
import { FaCopyright } from 'react-icons/fa';

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className="bg-white px-6 py-8 mx-auto">
        <div className={`${styles.footerContainer}`}>
          <div
            className={`${styles.footerLogo} flex flex-wrap justify-center align-items-center mt-6 -mx-4`}
          >
            <Link href={'/'}>
              <LogoTitleSVG height={'48'} width={'308'} />
            </Link>
            <div className={`${styles.footerCopyright} flex`}>
              <FaCopyright className={`${styles.footerCopyrightLogo}`} />
              <h1 className={`${styles.footerLogoText} text-xl-start`}>
                {' '}
                - All rights reserved
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-6 -mx-4">
            <h1 className={`${styles.footerCopyrightText}`}>
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
