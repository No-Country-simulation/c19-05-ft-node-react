import { Trade } from '@/lib/data';
import { TradeDetails } from '@/types/trade.type';
import { FaExchangeAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTrades } from '@/context/trades/trades';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { useAuth } from '@/context/session/sessionContext';
type TradeCardProps = {
  trade: TradeDetails;
  setShowModal: Dispatch<
    SetStateAction<{
      open: boolean;
      trade?: TradeDetails;
    }>
  >;
};

const TradeCard = ({ trade, setShowModal }: TradeCardProps) => {
  const router = useRouter();
  const { deleteTrade, acceptTrade } = useTrades();
  const { user } = useAuth();

  const handleReject = async () => {
    try {
      const result = await deleteTrade(trade._id);

      if (result) {
        toast.success('Trade rejected');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleAccept = async () => {
    try {
      const result = await acceptTrade(trade._id);

      if (result) {
        toast.success('Trade Accepted');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div
      className={`shadow ${trade.status === 'PENDING' ? 'bg-yellow-300' : trade.status === 'ACCEPTED' ? 'bg-green-300' : 'bg-red-300'} w-fit pt-10 pb-7 px-10 rounded-lg text-sm`}
    >
      {/* user photos and names */}
      <div className="flex gap-x-4 justify-center items-center mb-6">
        <div className="relative">
          {/* user one photo */}
          <img
            src={trade.members.memberOne.id.avatar}
            alt="User one photo"
            className="min-w-8 min-h-8 max-h-8 object-cover rounded-full absolute -top-4 -left-4 shadow"
          />

          {/* user two photo */}
          <img
            src={trade.members.memberTwo.id.avatar}
            alt="User two photo"
            className="min-w-8 min-h-8 max-h-8 object-cover rounded-full shadow"
          />
        </div>

        {/* user names */}
        <div className="flex gap-x-2 whitespace-nowrap font-semibold">
          <p>{trade.members.memberOne.id.name}</p>
          {'-'}
          <p>{trade.members.memberTwo.id.name}</p>
        </div>
      </div>

      {/* specialties */}
      <div className="flex items-center gap-x-2 whitespace-nowrap mb-5">
        <p>{trade.members.memberOne.specialty.name}</p>
        <FaExchangeAlt />
        <p>{trade.members.memberTwo.specialty.name}</p>
      </div>

      {/* conditional action buttons */}
      {trade.status === 'PENDING' && (
        <div className="flex justify-center gap-x-4">
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-all border border-white"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-500 py-2 px-4 rounded-lg transition-all"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      )}

      {trade.status === 'ACCEPTED' && (
        <div className="flex justify-center">
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-all border border-white"
            onClick={() => router.push(`/user/trades/${trade._id}`)}
          >
            See more
          </button>
        </div>
      )}

      {trade.status === 'FINISHED' && (
        <div className="flex justify-center">
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-all border border-white"
            onClick={() => setShowModal({ open: true, trade: trade })}
          >
            Rate
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeCard;
