"use client"
import React, { useState } from 'react';
import CardUser from '@/components/CardUsers/CardUser';
import { useAuth } from '@/context/session/sessionContext';
import { useUser } from '@/context/user/userContext';
import FilterSidebar from '@/components/FilterSideBar/FilterSideBar';
import { Pagination } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

interface User {
    avatar: string;
    name: string;
    specialties: string[];
    location: string;
}

const UsersPage = () => {
    const { user } = useAuth();
    const { users } = useUser();
    const [showSidebar, setShowSidebar] = useState(false); 

    if (!user) {
        return <div>Redirect to sign-in page or handle authentication state</div>;
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    

    return (
        <div className="container mx-auto py-5 px-5">
            <div className="p-8"></div>
            <div className="position bottom ">
                {!showSidebar && (
                    <Button
                        className="bg-[#4ADE80] text-white py-2 px-4 rounded-full shadow-md"
                        onClick={toggleSidebar}
                    >
                        Open Filters
                    </Button>
                )}
            </div>

            <div className="flex flex-wrap">
                <div className={`w-full md:w-1/4 ${showSidebar ? '' : 'hidden'}`}>
                    <div className="sticky top-0">
                        <FilterSidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} />
                    </div>
                </div>
                <div className={`w-full md:w-3/4 ${showSidebar ? 'ml-0' : 'mx-auto'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user, index) => (
                            <CardUser key={index} user={user} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-5">
                <Pagination total={10} initialPage={1} />
            </div>
        </div>
    );
};

export default UsersPage;