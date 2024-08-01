'use client';

import { useSpecialties } from '@/context/specialties/specialties';
import { useUser } from '@/context/user/userContext';
import { ResponseGetUserById, userRating } from '@/types/user.type';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaStar } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';

export default function Page() {
  const { specialties: specialtiesOptions, categories } = useSpecialties();

  const { getUserById } = useUser();
  const { userId } = useParams();
  const [userData, setUserData] = useState<ResponseGetUserById['payload']>();

  const fetchUserData = async () => {
    try {
      const data = await getUserById(userId as string);
      if (data.status === 'success' && 'payload' in data) {
        setUserData(data.payload as ResponseGetUserById['payload']);
      }
    } catch (error) {
      console.error('There was an error fetching user data: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const calculateAverageRating = (userRatings: userRating[]): number => {
    if (!userRatings) return 0;
    if (userRatings.length === 0) return 0;

    const sum = userRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / userRatings.length;
  };
  const averageRating: number = calculateAverageRating(
    userData?.userRatings as userRating[]
  );

  const isAContact = userData?.email && userData?.phoneNumber;

  if (userData)
    return (
      <div className="px-6 container mx-auto pt-32 sm:pt-24 mb-20">
        {/* user photo, banner, name, rating, phone number, button to connect */}
        <div className="shadow rounded-xl bg-white pb-6 mb-6">
          <div className="relative">
            <Image
              src={userData.banner}
              alt="Picture"
              width="1584"
              height="396"
              className="object-center rounded-t-xl mb-8 w-full max-h-52"
            />
            <Image
              src={userData.avatar}
              alt="Picture"
              width="130"
              height="130"
              className="rounded-full object-cover absolute -bottom-14 left-8 border-[5px] border-white bg-white shadow"
            />
          </div>

          <div className="mt-20 ml-8">
            <h2 className="text-xl font-semibold mb-1 truncate">
              {userData.name}
            </h2>
            <div className="flex items-center mb-4">
              {userData.userRatings.length > 0 ? (
                <>
                  {[...Array(5)].map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        className={`text-2xl ${index + 1 <= averageRating ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    );
                  })}
                  <p className="text-gray-500 ml-2 text-lg font-medium">
                    {averageRating}
                  </p>
                </>
              ) : (
                <div className="text-gray-600">No ratings yet!</div>
              )}
            </div>
            {isAContact ? (
              <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center gap-x-3 mb-4">
                <a
                  href={`tel:${userData.phoneNumber}`}
                  className="flex gap-1 items-center"
                >
                  <FaPhoneAlt className="text-gray-700 text-sm" />
                  {/* <p className="text-gray-600 text-sm">+54 9 381 676-9722</p> */}
                  <p className="text-gray-600 text-sm">
                    {userData.phoneNumber}
                  </p>
                </a>
                <a
                  href={`mailto:${userData.email}`}
                  className="flex gap-1 items-center"
                >
                  <IoMail className="text-gray-700 text-sm" />
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                </a>
              </div>
            ) : (
              <p className="mb-2 text-gray-700 text-sm">
                Connect with{' '}
                <span className="font-medium">{userData.name}</span> to access
                contact information and learn more. Everyone is welcome!
              </p>
            )}

            {/* edit profile or connect button */}
            {userData.isOwnProfile ? (
              <Link
                href={`/user/profile/${userId}/update`}
                className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-3 py-2 rounded-sm flex items-center gap-x-2 w-fit mt-6"
              >
                Edit Profile
                <MdModeEditOutline />
              </Link>
            ) : (
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-sm mt-3">
                Connect
              </button>
            )}
          </div>
        </div>

        <div className="shadow rounded-xl mb-6 bg-white py-6 px-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            About me
          </h2>
          <p className="text-gray-600">{userData.aboutme}</p>
        </div>

        <div className="shadow rounded-xl mb-6 bg-white py-6 px-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            My Specialties
          </h2>
          <div className="flex flex-wrap gap-3 items-center text-center w-full">
            {userData.specialties.map((specialty) => (
              <div
                key={specialty._id}
                className="border border-gray-500 text-gray-700 rounded-2xl p-2 text-center text-sm font-medium shadow"
              >
                {specialtiesOptions
                  .filter(
                    (specialtyOption) =>
                      specialtyOption._id.toString() ===
                      specialty.specialtyId.toString()
                  )
                  .map((specialty) => (
                    <span key={specialty._id}>{specialty.name}</span>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="shadow rounded-xl bg-white py-6 px-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            My Interests
          </h2>
          <div className="flex flex-wrap gap-3 items-center text-center w-full">
            {userData.interests.map((specialty) => (
              <div
                key={specialty._id}
                className="border border-gray-500 text-gray-700 rounded-2xl p-2 text-center text-sm font-medium shadow"
              >
                {specialtiesOptions
                  .filter(
                    (specialtyOption) =>
                      specialtyOption._id.toString() ===
                      specialty.specialtyId.toString()
                  )
                  .map((specialty) => (
                    <span key={specialty._id}>{specialty.name}</span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
