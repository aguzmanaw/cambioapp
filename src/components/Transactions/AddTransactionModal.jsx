import { ModalBox } from "@/components/ModalBox";
import { ActionButtons } from "../ActionButtons";
import { Box } from "@mui/material";
import { TransactionCard } from "./TransactionCard";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  padding: "8px 8px 0px 8px ",
}));

export function AddTransactionModal({
  showModal,
  accountLoading,
  transaction,
  accountTerm,
  accounts,
  account,
  onAccountTermChange,
  onAccountChange,
  onSubmit,
  onClose,
}) {
  /*
  const [inputValue, setInputValue] = useState("");
  const { accounts, loading } = useAccountAutocomplete({ term: inputValue });
  const [value, setValue] = useState({});

  const handleAccountTermChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAccountChange = (event, newValue) => {
    setValue(newValue);
  };
*/
  return (
    <>
      <ModalBox showModal={showModal} title={"Agregar Transacción"}>
        <StyledBox
          component="form"
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <TransactionCard
            transaction={transaction}
            accountLoading={accountLoading}
            accounts={accounts}
            onAccountChange={onAccountChange}
            accountTerm={accountTerm}
            onAccountTermChange={onAccountTermChange}
            account={account}
          />
          <ActionButtons
            applyLabel={"Agregar"}
            closeLabel={"Cancelar"}
            onClose={onClose}
          />
        </StyledBox>
      </ModalBox>
    </>
  );
}
