import { ActionButtons } from "../ActionButtons";
import { ModalBox } from "../ModalBox";
import { TransactionCard } from "./TransactionCard";

export function ShowTransactionModal({
  showModal,
  transaction,
  accountLoading,
  accounts,
  account,
  onAccountChange,
  accountTerm,
  onAccountTermChange,
  onClose,
}) {
  return (
    <>
      <ModalBox showModal={showModal} title={"Ver Transaccion"}>
        <TransactionCard
          transaction={transaction}
          readOnly={true}
          accountLoading={accountLoading}
          accounts={accounts}
          onAccountChange={onAccountChange}
          accountTerm={accountTerm}
          onAccountTermChange={onAccountTermChange}
          account={account}
        />

        <ActionButtons onClose={onClose} closeLabel={"Cerrar"} />
      </ModalBox>
    </>
  );
}
