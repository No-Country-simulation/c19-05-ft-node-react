'use client';
import styles from './About.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const About = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className={`${styles.aboutContainer}`}>
      <div className={`${styles.aboutPortada} container-fluid p-5 my-5`}>
        <div className={`${styles.aboutPortadaFirst}`}>
          <p className={`${styles.aboutText} text-left`}>It's about talent.</p>
          <p className={`${styles.aboutText} text-center`}>
            It's about skills.
          </p>
          <p className={`${styles.aboutText} text-right`}>It's about people.</p>
        </div>
      </div>

      <h1 className={`${styles.aboutTitle} py-5`}>About us</h1>

      <div className={`container mx-auto ${styles.aboutFirst} my-5 p-2`}>
        <p className="fs-1">
          Talent Trade is a platform that facilitates the connection and
          collaboration between people of diverse talents and skills, creating
          opportunities for joint development and the realization of innovative
          projects.
        </p>
        <p>
          We want to become the leading global platform that inspires and
          empowers talented individuals, facilitating collaborative networks
          that promote personal personal and professional growth in an
          incresingly interconnected world.
        </p>
      </div>

      <div className={`${styles.aboutGallery}`}>
        <Slider {...settings}>
          <Image
            className="w-auto"
            src={'/image/backend-img.jpg'}
            alt="Backend image"
            width={300}
            height={300}
          />

          <Image
            className="w-auto"
            src={'/image/frontend-img.jpg'}
            alt="Frontend image"
            width={300}
            height={300}
          />

          <Image
            className="w-auto"
            src={'/image/design-img.jpeg'}
            alt="UIUX image"
            width={300}
            height={300}
          />

          <Image
            className="w-auto"
            src={'/image/backend-img.jpg'}
            alt="Backend image"
            width={300}
            height={300}
          />

          <Image
            className="w-auto"
            src={'/image/frontend-img.jpg'}
            alt="Frontend image"
            width={300}
            height={300}
          />

          <Image
            className="w-auto"
            src={'/image/design-img.jpeg'}
            alt="UIUX image"
            width={300}
            height={300}
          />
        </Slider>
      </div>

      <div className={`container mx-auto ${styles.aboutSecond} my-5 p-2`}>
        <p>
          ... a group of people passionate about technology and programming who
          met randomly in the No-Country organization.
        </p>
        <p>
          We embarked on this project together with the determination to
          leverage our skills to create innovative solutions and positively
          impact our environment.
        </p>
      </div>
    </div>
  );
};

export default About;
