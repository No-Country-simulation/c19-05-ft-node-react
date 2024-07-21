"use client"; // To fix react-slick library issues
import "./About.css";
import Slider from "react-slick";
import Image from "next/image";

/*  Images   */
import frontendImg from "@/assets/JobsImages/frontend-img.jpg";
import backendImg from "@/assets/JobsImages/backend-img.jpg";
import uiuxImg from "@/assets/JobsImages/uiux-img.jpeg";


const About= () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
      };

      return (
        
        <div className="about-container">
            <div className="about-portada container-fluid p-5 my-5">
                <div className="about-portada-first">
                    <p className="text-left text-xl lg:text-xxl">It's about talent.</p>
                    <p className="text-center text-xl lg:text-xxl">It's about skills.</p>
                    <p className="text-right text-xl lg:text-xxl">It's about people.</p>
                </div>
            </div>

            <h1 className="py-5 text-5xl lg:text-5xl">About us</h1>

            <div className="container mx-auto about-first my-5 p-2">
                <p className="fs-1">Talent Trade is a platform to facilitate the connection and collaboration between people of diverse talents and skills, creating oportunities for joint development and the realization of innovative projects.</p>
                <p>We want to become the leading global platform that inspires and empowers talented individuals, facilitating collaborative networks that promote personal personal and professional growth in an incresingly interconnected world.</p>
            </div>

            <div className="about-gallery">
                <Slider {...settings}>
                    <div>
                        <Image
                            className="w-auto"
                            src={frontendImg}
                            alt="Frontend"
                        />
                    </div>

                    <div>
                        <Image
                            className="w-auto"
                            src={backendImg}
                            alt="Frontend"
                        />
                    </div>
                    <div>
                        <Image
                            className="w-auto"
                            src={uiuxImg}
                            alt="Frontend"
                        />
                    </div>
                    <div>
                        <Image
                            className="w-auto"
                            src={frontendImg}
                            alt="Frontend"
                        />
                    </div>

                    <div>
                        <Image
                            className="w-auto"
                            src={backendImg}
                            alt="Frontend"
                        />
                    </div>
                    <div>
                        <Image
                            className="w-auto"
                            src={uiuxImg}
                            alt="Frontend"
                        />
                    </div>
                </Slider>
            </div>

            <div className="container mx-auto about-second my-5 p-2">
                <p>... a group of people passionate about technology and programming who met randomly in the No-Country organization.</p>
                <p>We embarked on this project together with the determination to levarage our skills to create innovative solutions and positively impact our environment.</p>
            </div>
        </div>
    );
};

export default About;