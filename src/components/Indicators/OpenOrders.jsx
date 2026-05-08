import SensorsIcon from "@mui/icons-material/Sensors";
import { IndicatorCard } from "@/components/IndicatorCard";

export function OpenOrders({ amount }) {
  return (
    <>
      <IndicatorCard
        icon={<SensorsIcon />}
        title="Operaciones Abiertas"
        amount={amount}
      />
    </>
  );
}
