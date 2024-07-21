'use client';
import React, { useState } from 'react';
import CardUser from '@/components/CardUsers/CardUser';
import { useUser } from '@/context/user/userContext';
import FilterSidebar from '@/components/FilterSideBar/FilterSideBar';
import { Pagination } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import ModalConnect from '@/components/Modal/ModalConnect';
import { GetUser } from '@/types/user.type';

interface User {
  avatar: string;
  name: string;
  specialties: string[];
  location: string;
}

const UsersPage = () => {
  const { users } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState<{
    open: boolean;
    user?: GetUser;
  }>({ open: false });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="container mx-auto py-5 px-5">
      <div className="p-8"></div>
      <div className="mt-10">
        {!showSidebar && (
          <Button
            className="bg-[#1FD68E] text-white py-2 px-4 rounded-md shadow-md"
            onClick={toggleSidebar}
          >
            Open
          </Button>
        )}
        {/* {
          <Button
            className="bg-[#1FD68E] text-white py-2 mt-10 px-4 rounded-md shadow-md"
            onClick={toggleSidebar}
          >
            {showSidebar ? 'Close' : 'Open'}
          </Button>
        } */}
      </div>

      <div className="flex flex-wrap">
        <div className={`w-full md:w-1/4 ${showSidebar ? '' : 'hidden'}`}>
          <div className="sticky top-36">
            <FilterSidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} />
          </div>
        </div>
        <div className={`w-full md:w-3/4 ${showSidebar ? 'ml-0' : 'mx-auto'}`}>
          <div className="flex flex-wrap justify-center gap-4">
            {users.map((user, index) => (
              <CardUser
                key={index}
                user={user}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-5">
        <Pagination
          total={10}
          initialPage={1}
          classNames={{
            cursor:
              'bg-gradient-to-b shadow-lg from-[#1FD68E] to-[#18A16A]  dark:from-default-300 dark:to-default-100 text-white font-bold',
          }}
        />
      </div>
      <ModalConnect setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default UsersPage;
