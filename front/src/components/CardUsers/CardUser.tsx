import { GetUser } from '@/types/user.type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface User {
  // avatar: string;
  // name: string;
  // specialties: string[];
  user: GetUser;
}

const CardUser: React.FC<User> = ({ user }: User) => {
  return (
    <div className="container w-full max-w-xs overflow-hidden bg-white hover:scale-105 transition-all rounded-lg shadow-lg px-4">
      <div className="flex justify-center items-center p-6">
        <Image
          className="object-cover object-center w-24 h-24 rounded-full"
          src={user.avatar}
          width={96}
          height={96}
          alt="foto facha"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center text-center w-full">
        {user.specialties.map((specialty, index) => {
          if (index < 3) {
            return (
              <div
                key={specialty.specialtyId._id}
                className="border border-gray-400 rounded-2xl p-2 text-center text-xs m-1"
              >
                {specialty.specialtyId.name}
              </div>
            );
          }
          return null;
        })}
        {user.specialties.length > 3 && (
          <div className="bg-slate-800 text-white rounded-2xl p-2 text-center text-xs m-1">
            +{user.specialties.length - 3}
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <h1 className="text-lg font-medium text-gray-800">{user.name}</h1>
        {/* 
        <p className="py-1 text-sm text-gray-800">
          {user.location}
        </p> */}

        <div className="flex justify-between my-2 py-2">
          <Link href="#">
            <button className="bg-slate-800 hover:bg-gray-900 text-white rounded-lg px-3 py-1">
              <span>View Profile</span>
            </button>
          </Link>

          <Link href="#">
            <button className="border border-gray-400 hover:bg-gray-200 rounded-lg px-3 py-1">
              <span>Connect</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CardUser;
