import TradeCard from './TradeCard';
import { Trade } from '@/lib/data';
import styles from './TradeList.module.css';
import { TradeDetails } from '@/types/trade.type';
import { toast, Toaster } from 'sonner';

type TradeListProps = {
  trades: TradeDetails[];
  status: string;
};

export const translateStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pendientes';
    case 'ACCEPTED':
      return 'En curso';
    case 'FINISHED':
      return 'Finalizados';
    default:
      return status;
  }
};

const TradeList = ({ trades, status }: TradeListProps) => {
  const filteredTrades = trades.filter((trade) => trade.status === status);

  return (
    <div className="px-6">
      <Toaster position='top-right' richColors/>
      <h2 className={`${styles.title} text-gray-400`}>
        {translateStatus(status)}
      </h2>
      <div className="flex gap-4 overflow-x-scroll scroll-smooth pb-4">
        {filteredTrades.map((trade) => (
          <TradeCard key={trade._id} trade={trade} />
        ))}
      </div>
    </div>
  );
};

export default TradeList;
