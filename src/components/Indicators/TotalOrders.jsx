import ShareIcon from "@mui/icons-material/Share";
import { IndicatorCard } from "@/components/IndicatorCard";

export function TotalOrders({ amount }) {
  return (
    <IndicatorCard
      icon={<ShareIcon />}
      title="Operaciones Totales"
      amount={amount}
    />
  );
}
