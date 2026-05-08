import { useAccountsData } from "@/hooks/useAccountsData";
import { BanksTablelist } from "@/components/Banks/BanksTablelist";

export function BankBalanceCard() {
  const { accounts } = useAccountsData();

  return (
    <>
      <BanksTablelist rows={accounts} />
    </>
  );
}
