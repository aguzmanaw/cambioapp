import SearchBox from "../SearchBox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useCustomerAutocomplete } from "@/hooks/useCustomerAutocomplete";
import { useSteppersStore } from "@/store/steppers";

export function AddOrderExchange() {
  const [inputValue, setInputValue] = useState("");
  const { customers, loading } = useCustomerAutocomplete(inputValue);
  const [, setValue] = useState({});
  const addCustomer = useSteppersStore((state) => state.addCustomer);
  const values = useSteppersStore((state) => state.values);

  return (
    <Box
      className={"order-wizzard__customer-step"}
      sx={{
        ["& .MuiTextField-root , .MuiFormControl-root"]: {
          marginBottom: 2,
        },
        ["& .order-wizzard__customer-dni, .order-wizzard__customer-name"]: {},
      }}
    >
      {customers && (
        <SearchBox
          required
          id={"customer"}
          name={"customer"}
          label={"Cliente"}
          size="small"
          loading={loading}
          options={customers}
          getOptionLabel={(option) =>
            `(${option.dni}) ${option.firstname} ${option.lastname}, ${option.countryName}`
          }
          isOptionEqualToValue={(option, value) =>
            option.firstname.includes(value.firstname) ||
            option.lastname.includes(value.lastname) ||
            option.dni.includes(value.dni)
          }
          onChange={(event, newValue) => {
            let customer = {
              ...newValue,
              customerId: newValue?.id,
              id: undefined,
            };
            addCustomer(customer);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
      )}

      <TextField
        required
        fullWidth
        id="customerAccountCode"
        name="customerAccountCode"
        className="order-checkout__account-code"
        label="CBU/Alias"
        type="text"
        variant="outlined"
        size="small"
        value={values?.customerAccountCode ?? ""}
        onChange={(event) => {
          const { name, value } = event.target;
          addCustomer({ ...values, [name]: value });
        }}
        inputProps={{
          minLength: 3,
          maxLength: 33,
        }}
      />
      <TextField
        required
        fullWidth
        id="customerAccountName"
        name="customerAccountName"
        className="order-checkout__account-name"
        label="Banco"
        type="text"
        variant="outlined"
        size="small"
        value={values?.customerAccountName ?? ""}
        onChange={(event) => {
          const { name, value } = event.target;
          addCustomer({ ...values, [name]: value });
        }}
        inputProps={{
          minLength: 3,
          maxLength: 33,
        }}
      />
      <TextField
        required
        fullWidth
        multiline
        rows={3}
        id="description"
        name="description"
        className="order-checkout__description"
        label="Descripción"
        variant="outlined"
        size="small"
        value={values?.description ?? ""}
        onChange={(event) => {
          const { name, value } = event.target;
          addCustomer({ ...values, [name]: value });
        }}
        inputProps={{
          maxLength: 102,
        }}
      />
    </Box>
  );
}
