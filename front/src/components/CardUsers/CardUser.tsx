import { GetUser } from '@/types/user.type';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Chip } from '@nextui-org/chip';
interface CardUserProp {
  // avatar: string;
  // name: string;
  // specialties: string[];
  user: GetUser;
  setShowModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      user?: GetUser;
    }>
  >;
  showModal: {
    open: boolean;
    user?: GetUser;
  };
}

const CardUser: React.FC<CardUserProp> = ({
  user,
  setShowModal,
  showModal,
}: CardUserProp) => {
  const [selectUser, setSelectUser] = useState<GetUser>();
  return (
    <div className="container flex flex-col justify-around w-full h-[340px] max-w-xs overflow-hidden bg-white hover:scale-105 transition-all rounded-lg shadow-lg ">
      <div className="flex justify-center items-center p-6">
        <Image
          className="object-cover object-center w-24 h-24 rounded-full"
          src={user.avatar}
          width={96}
          height={96}
          alt="foto facha"
        />
      </div>

      <div className=" flex flex-wrap justify-center items-center text-center w-full">
        {user.specialties.map((specialty, index) => {
          if (index < 3) {
            return (
              <div key={specialty.specialtyId._id}>
                <Chip
                  variant="shadow"
                  classNames={{
                    base: 'bg-[#FFF]  shadow-[#E8E8E8]  m-1 border border-[#F2F2F2]',
                    content: 'text-[#363636]',
                  }}
                >
                  {specialty.specialtyId.name}
                </Chip>
              </div>
            );
          }
          return null;
        })}
        {user.specialties.length > 3 && (
          <Chip
            variant="shadow"
            classNames={{
              base: 'bg-gradient-to-tl from-[#1FD68E] to-[#89EEC6]  shadow-[#D9D9D9]',
              content: 'drop-shadow shadow-black text-white',
            }}
          >
            +{user.specialties.length - 3}
          </Chip>
        )}
      </div>

      <div className="mt-3 pb-3 text-center">
        <h1 className="text-lg font-medium text-gray-800">{user.name}</h1>
        {/* 
        <p className="py-1 text-sm text-gray-800">
          {user.location}
        </p> */}

        <div className="flex justify-center gap-4 my-2 py-2">
          <Link href="#">
            <Button
              className="bg-[#1FD68E]   hover:bg-[#18A16A] text-white rounded-lg px-3 py-1"
              onClick={() =>
                setShowModal({ open: !showModal.open, user: user })
              }
            >
              Connect
            </Button>
          </Link>

          <Link href={`user/profile/${user._id}`}>
            <Button className=" bg-transparent border border-[#1FD68E] text-[#1FD68E] hover:bg-gray-200 rounded-lg px-3 py-1">
              <span>View Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CardUser;
