import Link from "next/link";
import React from "react";

/**
          
          name: string;
	email: string;
	password: string;
	specialties: PopulatedDoc<specialty & Document>[];
	interests: PopulatedDoc<specialty & Document>[];
	description: string;
	userRatings: userRating[];
	phoneNumber: string;
	trades: Types.ObjectId[];
	contacts: PopulatedDoc<Types.ObjectId & Document>[];


     avatar: "https://example.com/avatar1.jpg",
    name: "John Doe",
    specialties: ["Frontend Development", "UI/UX Design"],
    interests: ["Technology", "Art", "Travel"],
    userRatings: [4, 5, 4, 3], // Puntuaciones de usuario (por ejemplo, de 1 a 5)
    description:
      "Passionate about creating intuitive user interfaces and experiences.",
    email: "john.doe@example.com",
  },
          
           */
interface User {
  avatar: string;
  name: string;
  email: string;
  specialties: string[];
  interests: string[];
  description: string;
  //phoneNumber: string;
}

const CardUser: React.FC<User> = (user) => {
  return (
    <div className="container w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex justify-center items-center p-6">
        <img
          className="object-cover object-center w-24 h-24 rounded-full"
          src={user.avatar}
          alt="avatar"
        />
      </div>

      <div className="flex items-center px-4 py-2 text-center">
        <h4 className="flex mx-1 text-xs font-semibold text-slate-900">
          {user.interests.map((i, index) => (
            <div
              key={index}
              className="border rounded-2xl px-2 mx-1 text-center text-xs"
            >
              {i}
            </div>
          ))}
        </h4>
        <h4 className="mx-1 text-xs font-semibold text-slate-900 border px-2 py-1 rounded-full">
          +2
        </h4>
      </div>

      <div>
        <h4 className="flex mx-1 text-xs font-semibold text-slate-900 px-2">
          {user.specialties.map((i, index) => (
            <span key={index} className="mx-1">
              {i}
            </span>
          ))}
        </h4>
      </div>

      <div className="px-4 py-2 text-center">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          {user.name}
        </h1>

        <p className="py-1 text-sm text-gray-700 dark:text-gray-400">
          {user.description}
        </p>

        <div className="flex justify-between my-2 py-2">
          <Link href="#">
            <button className="bg-slate-800 flex items-center text-white dark:text-gray-300 justify-center gap-x-2 text-sm dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-slate-700 duration-300 transition-colors border px-4 py-1">
              <span>Profile</span>
            </button>
          </Link>

          <Link href="#">
            <button className="flex items-center text-slate-900 dark:text-gray-300 justify-center gap-x-2 text-sm dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-slate-200 duration-300 transition-colors border px-4 py-1">
              <span>Connect</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center mt-2 text-gray-700 dark:text-gray-200">
          <svg
            aria-label="email icon"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
            />
          </svg>
          <h1 className="px-2 text-sm">{user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
