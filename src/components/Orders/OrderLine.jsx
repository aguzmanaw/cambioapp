import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import SearchBox from "../SearchBox";
import { printNumber } from "@/utils/format";
import Upload from "../Upload/Upload";
import AddIconButton from "../AddIconButton";
import { useState } from "react";

export function OrderLine({ onSubmit, accounts, order, loading, ...props }) {
  const [value, setValue] = useState("");
  const [, setInputValue] = useState("");

  const getAccuntTitle = ({ accountDescription, accountName, accountType }) => {
    return !(accountName && accountType)
      ? "Cuenta eliminada"
      : `${accountDescription}/${accountName} (${accountType})`;
  };

  function Account() {
    return (
      <>
        {order.accountId && (
          <TextField
            fullWidth
            readOnly
            size="small"
            value={getAccuntTitle(order)}
          />
        )}
        {!order.accountId && (
          <SearchBox
            id={"account"}
            name={"account"}
            label={"Cuenta"}
            size={"small"}
            loading={loading}
            options={accounts}
            getOptionLabel={(option) =>
              `${option.description}/${option.currencyName} (${option.currencyType})`
            }
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Box
        id="order-update"
        name="order-update"
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{
          paddingTop: 1,
          ["& .order-update__order-id"]: {
            display: "none",
          },
          ["& .order-update__account-id"]: {
            display: "none",
          },
          ["& .order-update__customer-amount"]: {
            display: "none",
          },
        }}
        {...props}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            {!loading && <Account />}
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              readOnly
              size="small"
              value={printNumber(order?.customerAmount) || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {order?.rateCustomerCurrency}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Upload
              filename={order?.customerReceipt}
              id="customerReceipt"
              name="customerReceipt"
              disabled={order?.customerReceipt}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <AddIconButton
              type="submit"
              className={"order-update__file-icon"}
              disabled={order?.accountId && true}
            />
          </Grid>
        </Grid>
        {value && (
          <InputBase
            className={"order-update__order-id"}
            id="id"
            name="id"
            defaultValue={order?.id || ""}
            type="hidden"
          />
        )}
        {value && (
          <InputBase
            className={"order-update__account-id"}
            id="accountId"
            name="accountId"
            defaultValue={value?.id || ""}
            type="hidden"
          />
        )}
      </Box>
    </>
  );
}
