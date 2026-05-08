//import { useRatesData } from "@/hooks/useRatesData";
import { RateTablelist } from "../Rates/RateTablelist";
import { useRatesMarket } from "@/hooks/useRatesMarket";

export function DailyRatesCard() {
  const { rates } = useRatesMarket();

  return (
    <>
      <RateTablelist rows={rates} />
    </>
  );
}
