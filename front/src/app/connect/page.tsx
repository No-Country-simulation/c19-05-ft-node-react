'use client';
import React, { useState, useEffect } from 'react';
import CardUser from '@/components/CardUsers/CardUser';
import { useUser } from '@/context/user/userContext';
import FilterSidebar from '@/components/FilterSideBar/FilterSideBar';
import { Pagination } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import ModalConnect from '@/components/Modal/ModalConnect';
import { GetUser } from '@/types/user.type';
import CardUserSkeleton from '@/components/CardUsersSkeleton/CardUserSkeleton';
import { useAuth } from '@/context/session/sessionContext';

interface User {
  avatar: string;
  name: string;
  specialties: string[];
  location: string;
}

const UsersPage = () => {
  const { users, paginate, getUsers, getRecommendedUsers } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState<{
    open: boolean;
    user?: GetUser;
  }>({ open: false });
  const [showRecommended, setShowRecommended] = useState<boolean>(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handlePageChange = (page: number) => {
    if (showRecommended) {
      getRecommendedUsers(selectedCategory, page);
    } else {
      getUsers(selectedCategory, page);
    }
  };

  const onChangeCheckbox = () => {
    setShowRecommended(!showRecommended);
  };

  useEffect(() => {
    if (showRecommended) {
      getRecommendedUsers(selectedCategory);
    } else {
      getUsers(selectedCategory);
    }
  }, [showRecommended]);

  useEffect(() => {
    console.log('Pagina actual:', paginate.page);
  }, [paginate.page]);

  return (
    <>
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
        </div>

        <div className="flex flex-wrap">
          <div className={`w-full md:w-1/4 ${showSidebar ? '' : 'hidden'}`}>
            <div className="sticky top-36">
              <FilterSidebar
                isOpen={showSidebar}
                toggleSidebar={toggleSidebar}
                handleCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                showRecommended={showRecommended}
                onChangeCheckbox={onChangeCheckbox}
              />
            </div>
          </div>
          <div
            className={`w-full md:w-3/4 ${showSidebar ? 'ml-0' : 'mx-auto'}`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {users.length >= 1
                ? users.map((user, index) => (
                    <CardUser
                      key={index}
                      user={user}
                      setShowModal={setShowModal}
                      showModal={showModal}
                    />
                  ))
                : [...Array(10)].map((_, index) => (
                    <CardUserSkeleton key={index} />
                  ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          <Pagination
            total={paginate.totalPages}
            initialPage={paginate.page}
            page={paginate.page}
            onChange={handlePageChange}
            classNames={{
              cursor:
                'bg-gradient-to-b shadow-lg from-[#1FD68E] to-[#18A16A]  dark:from-default-300 dark:to-default-100 text-white font-bold',
            }}
          />
        </div>
        <ModalConnect setShowModal={setShowModal} showModal={showModal} />
      </div>
    </>
  );
};

export default UsersPage;
