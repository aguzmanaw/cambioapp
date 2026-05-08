import CreditCardIcon from "@mui/icons-material/CreditCard";
import { IndicatorCard } from "@/components/IndicatorCard";

export function CompletedOrders({ amount }) {
  return (
    <IndicatorCard
      icon={<CreditCardIcon />}
      title="Operaciones finalizadas"
      amount={amount}
    />
  );
}
