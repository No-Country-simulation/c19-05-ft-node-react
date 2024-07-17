import { Trade } from "@/lib/data";
import { FaExchangeAlt } from "react-icons/fa";

type TradeCardProps = {
    trade: Trade
}

const TradeCard = ({trade} : TradeCardProps) => {
  return (
    <div className={`shadow ${trade.status === 'Pending' ? 'bg-yellow-300' : trade.status === 'In Progress' ? 'bg-green-300' : 'bg-red-300'} w-fit pt-10 pb-7 px-10 rounded-lg text-sm`}>
      {/* user photos and names */}
      <div className="flex gap-x-4 justify-center items-center mb-6">
        <div className="relative">
          {/* user one photo */}
          <img 
            src="https://www.mnp.ca/-/media/foundation/integrations/personnel/2020/12/16/13/57/personnel-image-4483.jpg?h=800&w=600&hash=9D5E5FCBEE00EB562DCD8AC8FDA8433D" 
            alt="User one photo"
            className="min-w-8 min-h-8 max-h-8 object-cover rounded-full absolute -top-4 -left-4 shadow"
          />

          {/* user two photo */}
          <img 
            src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" 
            alt="User two photo"
            className="min-w-8 min-h-8 max-h-8 object-cover rounded-full shadow" 
          />
        </div>

        {/* user names */}
        <div className="flex gap-x-2 whitespace-nowrap font-semibold">
          <p>{trade.personOne.name}</p>
          {'-'}
          <p>{trade.personTwo.name}</p>
        </div>
      </div>

      {/* specialties */}
      <div className="flex items-center gap-x-2 whitespace-nowrap mb-5">
        <p>{trade.personOne.specialty}</p>
        <FaExchangeAlt/>
        <p>{trade.personTwo.specialty}</p>
      </div>

      {/* conditional action buttons */}
      {trade.status === 'Pending' && (
        <div className="flex justify-center gap-x-4">
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-all border border-white">Accept</button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-500 py-2 px-4 rounded-lg transition-all">Reject</button>
        </div>
      )}

      {trade.status === 'In Progress' && (
        <div className="flex justify-center">
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-all border border-white">See more</button>
        </div>
      )}

      {trade.status === 'Completed' && (
        <div className="flex justify-center">
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-all border border-white">Rate</button>
        </div>
      )}
      
    </div>
  );
};

export default TradeCard;
