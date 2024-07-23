'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Select, SelectItem, Selection } from '@nextui-org/react';
import api from '@/lib/axios';
import Image from 'next/image';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>('');

  const [specialtiesCategory, setSpecialtiesCategory] = useState<Selection>(
    new Set([])
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<Selection>(
    new Set([])
  );

  const [interestsCategory, setInterestsCategory] = useState<Selection>(
    new Set([])
  );
  const [selectedInterests, setSelectedInterests] = useState<Selection>(
    new Set([])
  );

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

  const fetchUserData = async () => {
    try {
      const response = await api('/api/user');
      const data = response.data;
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAboutMe(data.aboutMe);
      setProfileImage(data.profileImage);
      setBannerImage(data.bannerImage);
      setSelectedSpecialties(new Set(data.specialties));
      setSelectedInterests(new Set(data.interests));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
    setSpecialtiesCategory(new Set(e.target.value));
  };

  const handleSelectSpecialties = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialties(new Set(e.target.value.split(',')));
  };

  const handleSelectInterestsCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInterestsCategory(new Set(e.target.value));
  };

  const handleSelectInterests = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterests(new Set(e.target.value.split(',')));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      profileImage,
      bannerImage,
      name,
      email,
      phone,
      aboutMe,
      specialties: Array.from(selectedSpecialties),
      interests: Array.from(selectedInterests),
    });
  };

  return (
    <div className="mt-32 sm:mt-24 mb-20 px-6">
      <h1 className="text-2xl md:text-4xl text-center font-medium mb-5 sm:mb-8 text-gray-800">
        Update Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg px-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setProfileImage)}
            className="mt-2"
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>

        <div className="mb-4">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">About Me</label>
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="mt-2 p-2 border rounded w-full h-24"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Specialties</label>
          <div className="flex w-full max-w-xs flex-col gap-2 mb-4">
            <Select
              label="Category"
              placeholder="Select a category"
              className="max-w-xs"
              selectedKeys={specialtiesCategory}
              onChange={handleSelectSpecialtiesCategory}
            >
              {categories.map((category) => (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Select
              label="Specialties"
              selectionMode="multiple"
              placeholder="Select your specialties"
              selectedKeys={selectedSpecialties}
              className="max-w-xs"
              onChange={handleSelectSpecialties}
            >
              {Array.from(specialtiesCategory).length > 0
                ? specialtiesOptions
                    .filter(
                      (specialty) =>
                        specialty.category ===
                        Array.from(specialtiesCategory)[0]
                    )
                    .map((specialty) => (
                      <SelectItem key={specialty.id}>
                        {specialty.name}
                      </SelectItem>
                    ))
                : specialtiesOptions.map((specialty) => (
                    <SelectItem key={specialty.id}>{specialty.name}</SelectItem>
                  ))}
            </Select>

            {/* Selected specialties */}
            <div className="flex gap-2 flex-wrap w-full mt-2">
              {Array.from(selectedSpecialties).length > 0 ? (
                Array.from(selectedSpecialties).map((selectedSpecialty) => (
                  <div
                    key={selectedSpecialty}
                    className="border border-gray-500 text-gray-700 rounded-2xl py-1 px-2 text-center text-xs font-medium shadow"
                  >
                    {specialtiesOptions.map(
                      (specialty) =>
                        specialty.id === selectedSpecialty && specialty.name
                    )}
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

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Interests</label>
          <div className="flex w-full max-w-xs flex-col gap-2 mb-4">
            <Select
              label="Category"
              placeholder="Select a category"
              className="max-w-xs"
              selectedKeys={interestsCategory}
              onChange={handleSelectInterestsCategory}
            >
              {categories.map((category) => (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Select
              label="Interests"
              selectionMode="multiple"
              placeholder="Select your interests"
              selectedKeys={selectedInterests}
              className="max-w-xs"
              onChange={handleSelectInterests}
            >
              {Array.from(interestsCategory).length > 0
                ? specialtiesOptions
                    .filter(
                      (specialty) =>
                        specialty.category === Array.from(interestsCategory)[0]
                    )
                    .map((specialty) => (
                      <SelectItem key={specialty.id}>
                        {specialty.name}
                      </SelectItem>
                    ))
                : specialtiesOptions.map((specialty) => (
                    <SelectItem key={specialty.id}>{specialty.name}</SelectItem>
                  ))}
            </Select>

            {/* Selected interests */}
            <div className="flex gap-2 flex-wrap w-full mt-2">
              {Array.from(selectedInterests).length > 0 ? (
                Array.from(selectedInterests).map((selectedInterest) => (
                  <div
                    key={selectedInterest}
                    className="border border-gray-500 text-gray-700 rounded-2xl py-1 px-2 text-center text-xs font-medium shadow"
                  >
                    {specialtiesOptions.map(
                      (specialty) =>
                        specialty.id === selectedInterest && specialty.name
                    )}
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
