'use client'
import React, { useState } from 'react';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [interest, setInterest] = useState('');

  const specialties = [
    'Web Development',
    'Data Science',
    'Cybersecurity',
    'Project Management',
  ];

  const interests = [
    'Artificial Intelligence',
    'Blockchain',
    'Internet of Things',
    'Cloud Computing',
  ];

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ profileImage, bannerImage, name, email, phone, aboutMe, specialty, interest });
  };

  return (
    <div className="mt-32 sm:mt-24 mb-20 px-6">
      <h1 className="text-2xl md:text-4xl text-center font-medium mb-5 sm:mb-8 text-gray-800">Update Profile</h1>
      <form onSubmit={handleSubmit} className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg px-6'>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setProfileImage)}
            className="mt-2"
          />
          {profileImage && <img src={profileImage} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Banner Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setBannerImage)}
            className="mt-2"
          />
          {bannerImage && <img src={bannerImage} alt="Banner Preview" className="mt-2 w-full h-32 object-cover" />}
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
          <label className="block text-gray-700">Specialties</label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="" disabled>Select your specialty</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Interests</label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="" disabled>Select your interest</option>
            {interests.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
