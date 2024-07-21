import React from 'react';
import Image from "next/image";
import styles from "./Error.module.css"

const Error404: React.FC = () => {
  
  return (
    <div className={`min-h-screen flex items-center justify-center bg-white text-slate-900`}>
      <div className="text-center">
        <h2 className="text-5xl mb-4">error</h2>
        <h1 className={`text-9xl mb-4 ${styles.error404}`}>40<span className={`${styles.flashing}`}>4</span>!</h1>
        <p className={`${styles.text}`}>
          Oops! You seem to have landed on a page that doesn't exist.
        </p>
        <p className={`${styles.text}`}>Or maybe you need to be logged in</p>
        <div className="flex justify-center items-center h-16 p-4 mt-10"><a
          href="/"
          
          className="inline-block font-semibold py-2 px-6 border border-solid border-black rounded text-lg transition duration-300 hover:bg-slate-700 hover:text-white"
        >
          Back to Home
        </a>
        </div>
      </div>
    </div>
  );
};
export default Error404;