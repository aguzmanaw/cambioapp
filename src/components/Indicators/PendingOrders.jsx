import SpokeIcon from "@mui/icons-material/Spoke";
import { IndicatorCard } from "@/components/IndicatorCard";

export function PendingOrders({ amount }) {
  return (
    <IndicatorCard
      icon={<SpokeIcon />}
      title="Operaciones Pendientes"
      amount={amount}
    />
  );
}
