import { CompletedOrders } from "@/components/Indicators/CompletedOrders";
import { TotalOrders } from "@/components/Indicators/TotalOrders";
import { OpenOrders } from "@/components/Indicators/OpenOrders";
import { PendingOrders } from "@/components/Indicators/PendingOrders";
import { useBillingsStaticsData } from "@/hooks/useBillingsStaticsData";

export function OrdersSummaryCard() {
  const { weekly } = useBillingsStaticsData();

  const {
    totalOperations,
    operationsOpened,
    pendingOperations,
    operationsClosed,
  } = weekly;

  return (
    <>
      <TotalOrders amount={totalOperations} />
      <OpenOrders amount={operationsOpened} />
      <PendingOrders amount={pendingOperations} />
      <CompletedOrders amount={operationsClosed} />
    </>
  );
}
