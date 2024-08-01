'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '@/lib/axios';
import Image from 'next/image';
import { toast } from 'sonner';
import { useAuth } from '@/context/session/sessionContext';
import { CgAsterisk } from 'react-icons/cg';
import { TiDelete } from 'react-icons/ti';
import { Interest, InterestPopulated, User } from '@/types/user.type';
import { useUser } from '@/context/user/userContext';
import { useSpecialties } from '@/context/specialties/specialties';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '@/components/Spinner/Spinner';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  aboutMe: string;
  selectedSpecialties: Pick<Interest, 'categoryId' | 'specialtyId'>[];
  selectedInterests: Pick<Interest, 'categoryId' | 'specialtyId'>[];
}

const EditProfile = () => {
  const router = useRouter();
  const { specialties: specialtiesOptions, categories } = useSpecialties();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(
    '/banners/banner1.jpg'
  );

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

  const banners = [
    '/banners/banner1.jpg',
    '/banners/banner2.jpg',
    '/banners/banner3.jpg',
    '/banners/banner4.jpg',
  ];

  const { user, setUser } = useAuth();

  const { updateUser } = useUser();

  const fetchUserData = async () => {
    if (user) {
      const userSpecialties = user.specialties.map((specialty) => ({
        categoryId: specialty.categoryId._id,
        specialtyId: specialty.specialtyId._id,
      }));
      const userInterests = user.interests.map((specialty) => ({
        categoryId: specialty.categoryId._id,
        specialtyId: specialty.specialtyId._id,
      }));
      try {
        setProfileImage(user.avatar);
        setBannerImage(user.banner);
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('phone', user.phoneNumber);
        setValue('aboutMe', user.aboutme);
        setSelectedSpecialties(userSpecialties);
        setSelectedInterests(userInterests);
      } catch (error) {
        toast.error('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setProfileImage: (image: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile-pick', file);
      setUploadingProfileImage(true);
      try {
        const response = await api.put('/api/user/profile-photo', formData);
        if (response.data.status === 'success') {
          setProfileImage(response.data.payload.avatar);
          const updatedUser = {
            ...user,
            avatar: response.data.payload.avatar,
          } as User;
          setUser(updatedUser);
          toast.success('Image updated successfully');
        } else {
          toast.error('There was an error updating image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('There was an error updating image');
        setUploadingProfileImage(false);
      }
      setUploadingProfileImage(false);
    }
  };

  const handleSelectSpecialtiesCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSpecialtiesCategory(e.target.value);
  };

  const handleSelectSpecialties = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecialtyId: string = e.target.value;

    // Buscar la especialidad seleccionada
    const selectedSpecialty = specialtiesOptions.find(
      (specialty) => specialty._id.toString() === selectedSpecialtyId
    );

    if (!selectedSpecialty) {
      toast.error('There was a problem adding specialty');
    } else {
      if (
        !selectedSpecialties.some(
          (specialty) =>
            specialty.specialtyId === selectedSpecialty?._id.toString()
        )
      ) {
        const specialty = {
          categoryId: selectedSpecialty.categoryId,
          specialtyId: selectedSpecialty._id.toString(),
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
      (specialty) => specialty._id.toString() === selectedSpecialtyId
    );

    if (!selectedSpecialty) {
      toast.error('There was a problem adding specialty');
    } else {
      if (
        !selectedInterests.some(
          (specialty) =>
            specialty.specialtyId === selectedSpecialty?._id.toString()
        )
      ) {
        const specialty = {
          categoryId: selectedSpecialty.categoryId,
          specialtyId: selectedSpecialty._id.toString(),
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
      toast.error('Please select at least one specialty and one interest.');
      return;
    }

    const updateData = {
      name: data.name,
      aboutme: data.aboutMe,
      phoneNumber: data.phone,
      specialties: selectedSpecialties,
      interests: selectedInterests,
      banner: bannerImage,
    };

    try {
      const response = await updateUser(updateData);
      if ('payload' in response && response.status === 'success') {
        const userSpecialties: InterestPopulated[] =
          response.payload.specialties.map((specialty) => {
            const category = categories.find(
              (category) => category._id.toString() === specialty.categoryId
            );
            const specialtyOption = specialtiesOptions.find(
              (option) => option._id.toString() === specialty.specialtyId
            );

            return {
              _id: uuidv4(),
              categoryId: {
                _id: specialty.categoryId,
                name: category ? category.name : 'Unknown', // Maneja el caso donde no se encuentra la categoría
              },
              specialtyId: {
                _id: specialty.specialtyId,
                name: specialtyOption ? specialtyOption.name : 'Unknown', // Maneja el caso donde no se encuentra la especialidad
              },
            };
          });
        const userInterests: InterestPopulated[] =
          response.payload.interests.map((specialty) => {
            const category = categories.find(
              (category) => category._id.toString() === specialty.categoryId
            );
            const specialtyOption = specialtiesOptions.find(
              (option) => option._id.toString() === specialty.specialtyId
            );

            return {
              _id: uuidv4(),
              categoryId: {
                _id: specialty.categoryId,
                name: category ? category.name : 'Unknown', // Maneja el caso donde no se encuentra la categoría
              },
              specialtyId: {
                _id: specialty.specialtyId,
                name: specialtyOption ? specialtyOption.name : 'Unknown', // Maneja el caso donde no se encuentra la especialidad
              },
            };
          });
        setUser({
          ...response.payload,
          specialties: userSpecialties,
          interests: userInterests,
        });
        toast.success('User updated successfully');
        router.push(`/user/profile/${user?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while updating user data');
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
        <div className="mb-4 border-b-1 border-gray-300 pb-7">
          <label className="block text-gray-700">
            Profile Photo{' '}
            <span className="text-gray-800 text-xs font-medium">
              (No need to submit the form, just upload the image)
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setProfileImage)}
            className="mt-2 px-4 py-2 border rounded-md text-green-700 bg-green-50 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          />
          {uploadingProfileImage ? (
            <div className="m-5">
              <Spinner />
            </div>
          ) : profileImage ? (
            <Image
              src={profileImage!}
              alt="Profile Preview"
              width={500}
              height={500}
              className="mt-3 w-24 h-24 rounded-full object-cover"
            />
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select a Profile Banner</label>
          <select
            value={bannerImage || ''}
            onChange={(e) => setBannerImage(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            {banners.map((banner, index) => (
              <option key={index} value={banner}>
                {`Banner ${index + 1}`}
              </option>
            ))}
          </select>
          {bannerImage && (
            <Image
              src={bannerImage}
              width={500}
              height={500}
              alt="Banner Preview"
              className="mt-2 w-full object-cover"
              priority
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
                <option key={category._id} value={category._id}>
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
            >
              {specialtiesCategory !== ''
                ? specialtiesOptions
                    .filter(
                      (specialty) =>
                        specialty.categoryId === specialtiesCategory
                    )
                    .map((specialty) => (
                      <option key={specialty._id} value={specialty._id}>
                        {specialty.name}
                      </option>
                    ))
                : specialtiesOptions.map((specialty) => (
                    <option key={specialty._id} value={specialty._id}>
                      {specialty.name}
                    </option>
                  ))}
            </select>

            {/* Selected specialties */}
            <div className="flex gap-2 flex-wrap w-full mt-2">
              {selectedSpecialties.length > 0 ? (
                selectedSpecialties.map((selectedSpecialty, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="border border-gray-500 text-gray-700 rounded-2xl py-1 px-2 text-center text-xs font-medium shadow">
                      {specialtiesOptions
                        .filter(
                          (specialty) =>
                            specialty._id.toString() ===
                            selectedSpecialty.specialtyId
                        )
                        .map((specialty) => (
                          <span key={specialty._id}>{specialty.name}</span>
                        ))}
                    </div>

                    <button
                      type="button"
                      title="Delete specialty"
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
                <option key={category._id} value={category._id}>
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
            >
              {interestsCategory !== ''
                ? specialtiesOptions
                    .filter(
                      (specialty) => specialty.categoryId === interestsCategory
                    )
                    .map((specialty) => (
                      <option key={specialty._id} value={specialty._id}>
                        {specialty.name}
                      </option>
                    ))
                : specialtiesOptions.map((specialty) => (
                    <option key={specialty._id} value={specialty._id}>
                      {specialty.name}
                    </option>
                  ))}
            </select>

            {/* Selected interests */}
            <div className="flex gap-2 flex-wrap w-full mt-2">
              {selectedInterests.length > 0 ? (
                selectedInterests.map((selectedSpecialty, index) => (
                  <div className="flex items-center gap-1" key={index}>
                    <div className="border border-gray-500 text-gray-700 rounded-2xl py-1 px-2 text-center text-xs font-medium shadow">
                      {specialtiesOptions
                        .filter(
                          (specialty) =>
                            specialty._id.toString() ===
                            selectedSpecialty.specialtyId
                        )
                        .map((specialty) => (
                          <span key={specialty._id}>{specialty.name}</span>
                        ))}
                    </div>

                    <button
                      type="button"
                      title="Delete specialty"
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
