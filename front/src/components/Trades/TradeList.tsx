import TradeCard from "./TradeCard";
import { Trade } from "@/lib/data";
import styles from "./TradeList.module.css"

type TradeListProps = {
  trades: Trade[];
  status: string;
};

export const translateStatus = (status: string): string => {
  switch (status) {
    case "Pending":
      return "Pendientes";
    case "In Progress":
      return "En curso";
    case "Completed":
      return "Finalizados";
    default:
      return status;
  }
};

const TradeList = ({ trades, status }: TradeListProps) => {
  const filteredTrades = trades.filter((trade) => trade.status === status);

  return (
    <div className="px-6">
      <h2 className={`${styles.title} text-gray-400`}>{translateStatus(status)}</h2>
      <div className="flex gap-4 overflow-x-scroll scroll-smooth pb-4">
        {filteredTrades.map((trade) => (
          <TradeCard key={trade.id} trade={trade} />
        ))}
      </div>
    </div>
  );
};

export default TradeList;
