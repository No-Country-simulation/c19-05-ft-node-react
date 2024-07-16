"use client";
import CardUser from "@/components/CardUsers/CardUser";
import React, { useState, useEffect } from "react";
import { users } from "@/utils/array_data";
interface User {
  avatar: string;
  name: string;
  specialties: string[];
  location: string;
  // phoneNumber: string;
}

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
          
           */
/// enm teoria estos datos vienen del back y se guardan en un array en un reducer users
const UsersPage = () => {
  const [data, setData] = useState<User[]>();
  useEffect(() => {
    setData(users);
  }, []);

  return (
    <>
      <div className="container min-h-screen min-w-full my-20 py-5">
        <div className="container mx-auto flex flex-wrap gap-5 justify-center px-5 py-5">
          {users.map((user, index) => (
            <CardUser key={index} {...user} />
          ))}
        </div>
      </div>
    </>
  );
};
export default UsersPage;