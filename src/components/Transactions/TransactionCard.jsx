import TextField from "@mui/material/TextField";
import { SelectBox } from "../SelectBox";
import SearchBox from "../SearchBox";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import styled from "@emotion/styled";
import { MAX_INTEGER_PART, NUM_DECIMAL_PART } from "@/utils/constants";

const StyledBox = styled(Box)(() => ({
  minWidth: 400,
  width: 400,
  ["& .MuiInputBase-root, MuiTextField-root"]: {
    marginBottom: 10,
  },
  ["& .MuiInputBase-root input:invalid, .MuiTextField-root input:invalid"]: {
    borderBottom: "1px solid red",
    color: "red",
  },
}));

export function TransactionCard({
  transaction = {},
  accounts,
  accountLoading = false,
  onAccountChange,
  onAccountTermChange,
  account,
  readOnly,
  ...props
}) {
  const inputProps = readOnly ? { readOnly: true } : {};
  return (
    <StyledBox
      component="section"
      className={"transactioncard__container"}
      {...props}
    >
      {transaction?.accountId && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={`${transaction?.accountDescription}/${transaction?.currencyName}(${transaction?.currencyCode})`}
            inputProps={{
              ...inputProps,
            }}
          />
        </>
      )}
      {!transaction?.accountId && (
        <SearchBox
          id={"account"}
          name={"account"}
          label={"Cuenta"}
          size={"small"}
          loading={accountLoading}
          options={accounts}
          getOptionLabel={(option) =>
            `${option.description}/${option.currencyName} (${option.currencyType})`
          }
          isOptionEqualToValue={(option, value) =>
            option.description.includes(value.description) ||
            option.currencyName.includes(value.currencyName) ||
            option.currencyType.includes(value.currencyType)
          }
          onChange={onAccountChange}
          onInputChange={onAccountTermChange}
        />
      )}
      <SelectBox
        className="transactioncard__type"
        name={"type"}
        options={{ deposito: "Deposito", retiro: "Retiro" }}
        label={"Tipo"}
        size="small"
        defaultValue={transaction?.type ?? "deposito"}
        inputProps={{
          ...inputProps,
        }}
      />
      <TextField
        className="transactioncard__amount"
        fullWidth
        required
        id="amount"
        name="amount"
        placeholder="Cantidad"
        type="number"
        variant="outlined"
        size="small"
        label={"Cantidad"}
        defaultValue={transaction?.amount ?? ""}
        inputProps={{
          ...inputProps,
          max: MAX_INTEGER_PART,
          step: NUM_DECIMAL_PART,
          min: 0,
        }}
      />
      <TextField
        className="transactioncard__description"
        required
        fullWidth
        id="description"
        name="description"
        label="Descripción"
        placeholder="Descripción"
        variant="outlined"
        size="small"
        defaultValue={transaction?.description || ""}
        inputProps={{
          ...inputProps,
          maxLength: 36,
        }}
      />
      <InputBase
        id="accountId"
        name="accountId"
        defaultValue={account?.id}
        type="hidden"
      />
    </StyledBox>
  );
}
