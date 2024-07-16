import React from "react";
import "./About.css";
//import Image from 'next/image';


const About= () => {

      return (
        <div className="about-container">
            <div className="about-portada container-fluid p-5 my-5">
                <div className="about-portada-first">
                    <p className="text-left">It's about talent.</p>
                    <p className="text-center">It's about skills.</p>
                    <p className="text-right">It's about people.</p>
                </div>
            </div>

            <div className="about-first my-5">
                <p className="fs-1">Talent Trade is a platform to facilitate the connection and collaboration between people of diverse talents and skills, creating oportunities for joint development and the realization of innovative projects.</p>
                <p>We want to become the leading global platform that inspires and empowers talented individuals, facilitating collaborative networks that promote personal personal and professional growth in an incresingly interconnected world.</p>
            </div>

            <div className="about-gallery">
                <h1>TODO CAROUSEL</h1>
            </div>

            <div className="about-second my-5">
                <p>... a group of people passionate about technology and programming who met randomly in the No-Country organization.</p>
                <p>We embarked on this project together with the determination to levarage our skills to create innovative solutions and positively impact our environment.</p>
            </div>
        </div>
        );
};

export default About;