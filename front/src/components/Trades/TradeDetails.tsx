import { TradeDetails as TradeDetailsType } from '@/types/trade.type';
import { formatDate } from '@/utils/format.hour';
import React from 'react';
import { MdClose } from 'react-icons/md';

// const trade = {
//   chatRoom: null,
//   _id: '669ad6fc632b85cee80d3c83',
//   members: {
//     memberOne: {
//       id: {
//         _id: '66981a5a3b3fb156d5f8bdef',
//         name: 'Catriel Milei',
//         email: 'catrielmilei@gmail.com',
//         avatar: '/JavierMilei.jpg',
//       },
//       specialty: {
//         _id: '668d9e5534511024deace987',
//         name: 'Quimica',
//       },
//       hasRated: false,
//     },
//     memberTwo: {
//       id: {
//         _id: '66981a5a3b3fb156d5f8be04',
//         name: 'Santiago Perez',
//         email: 'santiago.perez@gmail.com',
//         avatar: '/JavierMilei.jpg',
//       },
//       specialty: {
//         _id: '668d9e5534511024deace984',
//         name: 'Yoga',
//       },
//       hasRated: false,
//     },
//     _id: '669ad6fc632b85cee80d3c84',
//   },
//   duration: 259200000,
//   expiresAt: '2024-07-22T21:21:21.674Z',
//   status: 'ACCEPTED',
//   __v: 0,
// };

type TradeDetailsProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  trade: TradeDetailsType;
};
export default function TradeDetails({
  show,
  setShow,
  trade,
}: TradeDetailsProps) {
  return (
    <div
      className={`w-full flex z-20 flex-col justify-evenly ml-1  items-center h-[calc(100vh-4rem)]  bg-[#FFF] border border-[#1FD68E] rounded-3xl sm:relative sm:left-0 absolute ${show ? 'left-0' : 'left-[-100%]'} sm:h-[600px]  transition-all`}
    >
      <button
        className=" p-2 text-6xl  rounded-full absolute top-2 right-3 sm:hidden "
        onClick={() => setShow(false)}
      >
        <MdClose />
      </button>
      <div className="flex gap-4 justify-center text-[#1FD68E] items-center">
        <div>
          <div className="  flex gap-2  items-center mb-10">
            <img
              src={trade.members.memberOne.id.avatar}
              className="w-12 h-12 rounded-full"
              alt=""
            />
            <h2>{trade.members.memberOne.id.name}</h2>
          </div>
          <div>
            <p className="text-center">
              Specialty: <span>{trade.members.memberOne.specialty.name}</span>
            </p>
          </div>
        </div>
        <div>
          <div className=" flex gap-2  items-center mb-10">
            <h2>{trade.members.memberTwo.id.name}</h2>
            <img
              src={trade.members.memberTwo.id.avatar}
              className="w-12 h-12 rounded-full"
              alt=""
            />
          </div>
          <div>
            <p className="text-center">
              Specialty: <span>{trade.members.memberTwo.specialty.name}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5  text-[#1FD68E]">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-center ">Duration</h2>
          <p className="text-center text-xl ">
            {trade.duration / (1000 * 60 * 60 * 24)} Days
          </p>
        </div>

        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-bold ">Ends</h2>
          <p className="text-center text-xl ">{formatDate(trade.expiresAt)}</p>
        </div>
      </div>
    </div>
  );
}
