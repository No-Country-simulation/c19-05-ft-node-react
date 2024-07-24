'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '@/lib/axios';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuth } from '@/context/session/sessionContext';
import { CgAsterisk } from 'react-icons/cg';
import { TiDelete } from 'react-icons/ti';
import { Interest } from '@/types/user.type';
import { useUser } from '@/context/user/userContext';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  aboutMe: string;
  selectedSpecialties: Pick<Interest, 'categoryId' | 'specialtyId'>[];
  selectedInterests: Pick<Interest, 'categoryId' | 'specialtyId'>[];
}

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>('banner1.jpg');

  const [specialtiesCategory, setSpecialtiesCategory] = useState<string | null>(
    ''
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<
    Pick<Interest, 'categoryId' | 'specialtyId'>[]
  >([]);

  const [interestsCategory, setInterestsCategory] = useState<string | null>('');
  const [selectedInterests, setSelectedInterests] = useState<
    Pick<Interest, 'categoryId' | 'specialtyId'>[]
  >([]);

  const categories = [
    { id: '1', name: 'Development' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'Security' },
    { id: '4', name: 'Management' },
    { id: '5', name: 'Technology' },
    { id: '6', name: 'Finance' },
  ];

  const specialtiesOptions = [
    { id: '1', name: 'Web Development', category: '1' },
    { id: '2', name: 'Data Science', category: '2' },
    { id: '3', name: 'Cybersecurity', category: '3' },
    { id: '4', name: 'Project Management', category: '4' },
    { id: '5', name: 'Artificial Intelligence', category: '5' },
    { id: '6', name: 'Blockchain', category: '6' },
    { id: '7', name: 'Internet of Things', category: '5' },
    { id: '8', name: 'Cloud Computing', category: '5' },
  ];

  const banners = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];

  const { user } = useAuth()

  const { updateUser } = useUser()

  const fetchUserData = async () => {
    if (user) {
      try {
        setProfileImage(user.avatar);
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('phone', user.phoneNumber);
        setValue('aboutMe', user.aboutme);
        setSelectedSpecialties(user.specialties);
        setSelectedInterests(user.interests);
        // setBannerImage(user.bannerImage);
      } catch (error) {
        toast.error('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setImage: (image: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_cloudinary_preset');
      try {
        const response = await api.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
          formData
        );
        setImage(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSelectSpecialtiesCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSpecialtiesCategory(e.target.value);
  };

  const handleSelectSpecialties = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecialtyId = e.target.value;

    // Buscar la especialidad seleccionada
    const selectedSpecialty = specialtiesOptions.find(
      (specialty) => specialty.id === selectedSpecialtyId
    );

    if (!selectedSpecialty) {
      toast.error('There was a problem adding specialty');
    } else {
      if (
        !selectedSpecialties.some(
          (specialty) => specialty.specialtyId === selectedSpecialty?.id
        )
      ) {
        const specialty = {
          categoryId: selectedSpecialty.category,
          specialtyId: selectedSpecialty.id,
        };

        setSelectedSpecialties([...selectedSpecialties, specialty]);
      } else {
        toast.error('You have already added this specialty');
      }
    }
  };

  const handleSelectInterestsCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInterestsCategory(e.target.value);
  };

  const handleSelectInterests = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecialtyId = e.target.value;

    // Buscar la especialidad seleccionada
    const selectedSpecialty = specialtiesOptions.find(
      (specialty) => specialty.id === selectedSpecialtyId
    );

    if (!selectedSpecialty) {
      toast.error('There was a problem adding specialty');
    } else {
      if (
        !selectedInterests.some(
          (specialty) => specialty.specialtyId === selectedSpecialty?.id
        )
      ) {
        const specialty = {
          categoryId: selectedSpecialty.category,
          specialtyId: selectedSpecialty.id,
        };

        setSelectedInterests([...selectedInterests, specialty]);
      } else {
        toast.error('You have already added this specialty');
      }
    }
  };

  const removeSpecialty = ({
    specialtyId,
    from,
  }: {
    specialtyId: string;
    from: string;
  }) => {
    if (from === 'specialties') {
      setSelectedSpecialties(
        selectedSpecialties.filter(
          (selectedSpecialty) => selectedSpecialty.specialtyId !== specialtyId
        )
      );
    } else {
      setSelectedInterests(
        selectedInterests.filter(
          (selectedSpecialty) => selectedSpecialty.specialtyId !== specialtyId
        )
      );
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (selectedSpecialties.length === 0 || selectedInterests.length === 0) {
      // alert('Please select at least one specialty and one interest.');
      toast.error('Please select at least one specialty and one interest.');
      return;
    }

    const updateData = {
      name: data.name,
      aboutme: data.aboutMe,
      phoneNumber: data.phone,
      specialties: selectedSpecialties,
      interests: selectedInterests
    }

    console.log(updateData)

    try {
      const data = await updateUser(updateData)
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error('error while updating user data')
    }
  };

  return (
    <div className="pt-32 pm:mt-24 mb-20 px-6">
      <h1 className="text-2xl md:text-4xl text-center font-medium mb-5 sm:mb-8 text-gray-800">
        Update Profile
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg px-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setProfileImage)}
            className="mt-2 px-4 py-2 border rounded-md text-green-700 bg-green-50 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        <div className="mb-4 border-b-1 border-gray-300 pb-7">
          <label className="block text-gray-700">Banner Photo</label>
          <select
            value={bannerImage || ''}
            onChange={(e) => setBannerImage(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="">Select a banner</option>
            {banners.map((banner, index) => (
              <option key={index} value={banner}>
                {banner}
              </option>
            ))}
          </select>
          {bannerImage && (
            <Image
              src={`/banners/${bannerImage}`}
              width={500}
              height={500}
              alt="Banner Preview"
              className="mt-2 w-full object-cover"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            className="mt-2 p-2 border rounded w-full"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">About Me</label>
          <textarea
            placeholder="Enter your description"
            {...register('aboutMe', { required: 'About me is required' })}
            className="mt-2 p-2 border rounded w-full h-36"
          />
          {errors.aboutMe && (
            <p className="text-red-500">{errors.aboutMe.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Specialties</label>
          <div className="flex w-full max-w-xs flex-col gap-2 mb-4">
            <label
              htmlFor="specialtiesCategory"
              className="block text-sm font-medium text-gray-800"
            >
              Filter by category
            </label>
            <select
              id="specialtiesCategory"
              className="max-w-xs border rounded-md border-gray-300 p-2"
              onChange={handleSelectSpecialtiesCategory}
            >
              <option value="">- All categories -</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="selectSpecialties"
              className="text-sm font-medium text-gray-800 flex"
            >
              Specialties
              <CgAsterisk className="text-red-500 text-xs" />
            </label>
            <select
              id="selectSpecialties"
              multiple
              className="max-w-xs border rounded-md border-gray-300 p-2"
              onChange={handleSelectSpecialties}
              required
            >
              {specialtiesCategory !== ''
                ? specialtiesOptions
                    .filter(
                      (specialty) => specialty.category === specialtiesCategory
                    )
                    .map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                    ))
                : specialtiesOptions.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
            </select>

            {/* Selected specialties */}
            <div className="flex gap-2 flex-wrap w-full mt-2">
              {selectedSpecialties.length > 0 ? (
                selectedSpecialties.map((selectedSpecialty) => (
                  <div
                    className="flex items-center gap-1"
                    key={selectedSpecialty.specialtyId}
                  >
                    <div className="border border-gray-500 text-gray-700 rounded-2xl py-1 px-2 text-center text-xs font-medium shadow">
                      {specialtiesOptions.map(
                        (specialty) =>
                          specialty.id === selectedSpecialty.specialtyId &&
                          specialty.name
                      )}
                    </div>

                    <button
                      type="button"
                      title='Delete specialty'
                      onClick={() =>
                        removeSpecialty({
                          specialtyId: selectedSpecialty.specialtyId,
                          from: 'specialties',
                        })
                      }
                    >
                      <TiDelete className="text-red-500" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">
                  You have not selected specialties.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Interests</label>
          <div className="flex w-full max-w-xs flex-col gap-2 mb-4">
            <label
              htmlFor="specialtiesCategory"
              className="block text-sm font-medium text-gray-800"
            >
              Filter by category
            </label>
            <select
              id="specialtiesCategory"
              className="max-w-xs border rounded-md border-gray-300 p-2"
              onChange={handleSelectInterestsCategory}
            >
              <option value="">- All categories -</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="selectSpecialties"
              className="text-sm font-medium text-gray-800 flex"
            >
              Interests
              <CgAsterisk className="text-red-500 text-xs" />
            </label>
            <select
              id="selectSpecialties"
              multiple
              className="max-w-xs border rounded-md border-gray-300 p-2"
              onChange={handleSelectInterests}
              required
            >
              {interestsCategory !== ''
                ? specialtiesOptions
                    .filter(
                      (specialty) => specialty.category === interestsCategory
                    )
                    .map((specialty) => (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                    ))
                : specialtiesOptions.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
            </select>

            {/* Selected interests */}
            <div className="flex gap-2 flex-wrap w-full mt-2">
              {selectedInterests.length > 0 ? (
                selectedInterests.map((selectedSpecialty) => (
                  <div
                    className="flex items-center gap-1"
                    key={selectedSpecialty.specialtyId}
                  >
                    <div className="border border-gray-500 text-gray-700 rounded-2xl py-1 px-2 text-center text-xs font-medium shadow">
                      {specialtiesOptions.map(
                        (specialty) =>
                          specialty.id === selectedSpecialty.specialtyId &&
                          specialty.name
                      )}
                    </div>

                    <button
                      type="button"
                      title='Delete specialty'
                      onClick={() =>
                        removeSpecialty({
                          specialtyId: selectedSpecialty.specialtyId,
                          from: 'interests',
                        })
                      }
                    >
                      <TiDelete className="text-red-500" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">
                  You have not selected interests.
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
