import Image from 'next/image'
import BannerImage from "@/assets/BannerImage.jpg"
import Avatar from "@/assets/avatar.jpeg"
import { FaPhoneAlt, FaStar } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5';

const specialties = [
    { id: 1, name: "Frontend Development" },
    { id: 2, name: "Backend Development" },
    { id: 3, name: "Full Stack Development" },
    { id: 4, name: "Database Management" },
    { id: 5, name: "Web Application Development" },
    { id: 6, name: "Mobile Application Development" },
    { id: 7, name: "DevOps" },
    { id: 8, name: "Cloud Computing" },
    { id: 9, name: "Machine Learning" },
    { id: 10, name: "Cybersecurity" }
];

const learningInterests = [
  { id: 1, name: "Blockchain Development" },
  { id: 2, name: "Augmented Reality (AR) / Virtual Reality (VR)" },
  { id: 3, name: "Internet of Things (IoT)" },
  { id: 4, name: "Quantum Computing" },
  { id: 5, name: "Big Data" },
  { id: 6, name: "Natural Language Processing (NLP)" },
  { id: 7, name: "Robotics" },
  { id: 8, name: "Edge Computing" },
  { id: 9, name: "Computer Vision" },
  { id: 10, name: "Digital Twin Technology" }
];

export default function Page() {
  const rating = 4; // Ejemplo de puntuación promedio
  const isAContact = true

  return (
    <div className='px-6 container mx-auto mt-32 sm:mt-24 mb-20'>
        {/* user photo, banner, name, rating, phone number, button to connect */}
        <div className='shadow rounded-xl bg-white pb-6 mb-6'>
            <div className='relative'>
                <Image 
                    src={BannerImage} 
                    alt="Picture"
                    width="160"
                    height="90"
                    className="object-cover rounded-t-xl mb-8 w-full max-h-52"
                />
                <Image 
                    src={Avatar} 
                    alt="Picture"
                    width="130"
                    height="130"
                    className="rounded-full object-center absolute -bottom-14 left-8 border-[5px] border-white"
                />
            </div>

            <div className='mt-20 ml-8'>
                <h2 className='text-xl font-semibold mb-1 truncate'>Owen Paulo Vassarotto</h2>
                <div className='flex items-center mb-4'>
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        className={`text-2xl ${ratingValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    );
                  })}
                  <p className='text-gray-500 ml-2 text-lg font-medium'>{rating.toFixed(1)}</p> {/* Muestra el promedio numérico */}
                </div>
                {isAContact ? (
                    <div className='flex flex-col gap-y-1 sm:flex-row sm:items-center gap-x-3 mb-4'>
                        <a href="tel:+54 9 381 676-9722" className='flex gap-1 items-center'>
                            <FaPhoneAlt  className='text-gray-700 text-sm' />
                            <p className='text-gray-600 text-sm'>+54 9 381 676-9722</p>
                        </a>
                        <a href='mailto:vassarottowen@gmail.com' className='flex gap-1 items-center'>
                            <IoMail  className='text-gray-700 text-sm' />
                            <p className='text-gray-600 text-sm'>vassarottowen@gmail.com</p>
                        </a>
                    </div>
                ): (
                    <p className='mb-2 text-gray-700 text-sm'>Connect with <span className='font-medium'>Owen</span> to access contact information and learn more. Everyone is welcome!</p>
                )}

                {/* button to connect */}
                <button className='bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-sm mt-3'>
                    Connect
                </button>
            </div>
        </div>

        <div className='shadow rounded-xl mb-6 bg-white py-6 px-8'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-700'>About me</h2>
            <p className='text-gray-600'>Hello! I'm Owen Paulo Vassarotto, a passionate web developer based in Los Angeles, United States. I specialize in creating dynamic and responsive web applications using modern technologies like React, Next.js, TailwindCSS, Node.js, Express, MongoDB, and MySQL. My journey in software programming has equipped me with strong technical skills and a deep understanding of web development.</p>
        </div>

        <div className='shadow rounded-xl mb-6 bg-white py-6 px-8'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-700'>My Specialties</h2>
            <div className="flex flex-wrap gap-3 items-center text-center w-full">
                {specialties.map(specialty => (
                    <div
                        key={specialty.id}
                        className="border border-gray-500 text-gray-700 rounded-2xl p-2 text-center text-sm font-medium shadow"
                    >
                        {specialty.name}
                    </div>
                ))}
            </div>
        </div>

        <div className='shadow rounded-xl bg-white py-6 px-8'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-700'>My Interests</h2>
            <div className="flex flex-wrap gap-3 items-center text-center w-full">
                {learningInterests.map(interest => (
                    <div
                        key={interest.id}
                        className="border border-gray-500 text-gray-700 rounded-2xl p-2 text-center text-sm font-medium shadow"
                    >
                        {interest.name}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
