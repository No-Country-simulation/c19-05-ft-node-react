"use client";

import CardUser from "@/components/CardUsers/CardUser";
import React, { useState, useEffect } from "react";
import { users } from "@/utils/array_data";

interface User {
  avatar: string;
  name: string;
  email: string;
  specialties: string[];
  interests: string[];
  description: string;
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
      <div className="container min-h-screen min-w-full mx-auto my-20 py-5">
        <div className="container mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user, index) => (
            <CardUser key={index} {...user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersPage;
