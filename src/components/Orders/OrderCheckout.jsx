import { useState } from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "@/components/SearchBox";
import { useSteppersStore } from "@/store/steppers";
import { MAX_INTEGER_PART, MIN_DECIMAL_PART } from "@/utils/constants";
import { useRatesMarket } from "@/hooks/useRatesMarket";
import { printNumber } from "@/utils/format";
import { OutputField } from "../common/OutputField";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  ["& .order-checkout__rate-active"]: {
    visibility: "visible",
  },
  ["& .order-checkout__rate-select"]: {
    display: "flex",
    justifyContent: "space-between",
  },
  ["& .order-checkout__check-rate"]: {},
  ["& .order-checkout__rate-amount"]: {
    margin: 0,
  },
  ["& .order-checkout__spacial-rate-amount"]: {},
  ["& .MuiTextField-root input:invalid, MuiInputBase-input input:invalid"]: {
    borderBottom: "2px solid red",
  },
  ["& .order-checkout__total-payment"]: {
    margin: 0,
    padding: 0,
    alignItems: "start",
    ["& .order-checkout__amount"]: {
      backgroundColor: "red",
      maxWidth: "10em",
    },
    ["& .MuiFormControlLabel-label"]: {},
    ["& .MuiTypography-root"]: {},
  },
}));

export function OrderCheckout() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState({
    id: "",
    amount: "",
    autoRate: 0,
  });
  const [, setInputValue] = useState("");
  const addProduct = useSteppersStore((state) => state.addProduct);
  const resetCheckout = useSteppersStore((state) => state.resetCheckout);
  const values = useSteppersStore((state) => state.values);
  const { rates, loading } = useRatesMarket();

  const handleRateCheckedChange = (event) => {
    setChecked(event.target.checked);

    addProduct({
      rateAmount: !event.target.checked ? value?.amount : values?.rateAmount,
      specialRate: event.target.checked ? 1 : 0,
    });
  };

  const handleCustomerAmountChange = (event) => {
    addProduct({
      customerAmount: event.target.value,
    });
  };

  const handleRateAmountChange = (event) => {
    event.preventDefault();

    addProduct({
      rateAmount: event.target.value,
    });
  };

  return (
    <StyledBox>
      <Box
        componenet="div"
        sx={{
          backgroundColor: "white",
          width: 100,
        }}
        className="order-checkout__rate-select"
      ></Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchBox
            id={"rate"}
            name={"rate"}
            label={"Tasa de Cambio"}
            size="small"
            loading={loading}
            options={rates}
            getOptionLabel={(option) =>
              `${option.type} 1 ${option.customerCurrency} por ${option.businessCurrency}`
            }
            isOptionEqualToValue={(option, value) =>
              option.type.includes(value.type) ||
              option.customerCurrency.includes(value.customerCurrency) ||
              option.businessCurrency.includes(value.businessCurrency)
            }
            onChange={(event, newValue) => {
              if (newValue) {
                if (!values?.specialRate) {
                  addProduct({
                    rateId: newValue?.id,
                    rateType: newValue?.type,
                    customerCurrency: newValue?.customerCurrency,
                    businessCurrency: newValue?.businessCurrency,
                    rateAmount: newValue?.amount,
                    autoRate: newValue?.autoRate,
                  });
                } else {
                  addProduct({
                    rateId: newValue?.id,
                    rateType: newValue?.type,
                    customerCurrency: newValue?.customerCurrency,
                    businessCurrency: newValue?.businessCurrency,
                    autoRate: newValue?.autoRate,
                  });
                }
              } else {
                if (!newValue) resetCheckout();
              }
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            className="order-checkout__check-rate"
            control={
              <Checkbox
                checked={checked}
                onChange={handleRateCheckedChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={"¿Tasa espacial?"}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            id="customerAmount"
            name="customerAmount"
            className="order-checkout__customer-amount"
            label="Monto"
            type="number"
            variant="outlined"
            size="small"
            onChange={handleCustomerAmountChange}
            value={values?.customerAmount}
            inputProps={{
              max: MAX_INTEGER_PART,
              step: MIN_DECIMAL_PART,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          {!checked && (
            <TextField
              fullWidth
              readOnly
              name="rateAmount"
              className="order-checkout__rate-amount"
              label="Tasa"
              type="number"
              variant="outlined"
              size="small"
              onChange={() => values?.rateAmount}
              value={values?.rateAmount || ""}
              inputProps={{
                max: MAX_INTEGER_PART,
                step: MIN_DECIMAL_PART,
              }}
            />
          )}
          {checked && (
            <TextField
              required
              fullWidth
              name="rateAmount"
              className="order-checkout__spacial-rate-amount"
              label="Tasa Especial"
              type="number"
              variant="outlined"
              size="small"
              value={values?.rateAmount || ""}
              onChange={handleRateAmountChange}
              inputProps={{
                max: MAX_INTEGER_PART,
                step: MIN_DECIMAL_PART,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <OutputField
            label="Total a Recibir"
            defaultValue={`${printNumber(values?.totalReceivable || 0)}
            ${
              value && value?.type === "venta"
                ? values?.businessCurrency.trim()
                : values?.customerCurrency.trim()
            }`}
          />
        </Grid>
        <Grid item xs={12}>
          <OutputField
            label="Total a Pagar"
            defaultValue={`${printNumber(values?.totalPayment || 0)} ${
              value && value?.type === "venta"
                ? values?.customerCurrency
                : values?.businessCurrency
            }`}
          />
        </Grid>
      </Grid>
    </StyledBox>
  );
}
