import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SelectBox } from "../SelectBox";
import { useState } from "react";
import { MAX_INTEGER_PART, MIN_DECIMAL_PART } from "@/utils/constants";

export function RateCard({ rate, exchanges, disabledInputs, readOnlyInputs }) {
  const [exchangeId, setExchangeId] = useState(rate?.id);
  const [recurrent, setRecurrent] = useState(rate?.recurrent);
  /*
  const getExchangeSelectLabel = ({
    id,
    type,
    customerCurrency,
    businessCurrency,
  }) => {
    return {
      [id]: `${type} (${customerCurrency}/${businessCurrency})`,
    };
  };
  */
  const formatExchange = ({ type, customerCurrency, businessCurrency }) =>
    `${type} (${customerCurrency}/${businessCurrency})`;

  const mapExchangesToSelect = (exchanges) => {
    if (!Array.isArray(exchanges)) return;

    return exchanges.reduce((select, exchange) => {
      return { ...select, [exchange.id]: formatExchange(exchange) };
    }, {});
  };

  const filteredExchanges = exchanges.filter(
    (exchange) => exchange.id === rate?.exchangeId
  );

  const recurrentOptions = mapExchangesToSelect(filteredExchanges);

  const props = disabledInputs ? { disabled: true } : {};
  const inputProps = readOnlyInputs ? { readOnly: true } : {};

  return (
    <>
      <Box
        sx={{
          minWidth: 270,
          width: 400,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          ["& .ratecard__exchange-type"]: {
            textTransform: "capitalize",
          },
          "& .ratecard__amount": {
            textAlign: "right",
          },
          ["& .MuiTextField-root input:invalid"]: {
            borderBottom: "2px solid red",
            color: "red",
          },
        }}
      >
        {rate && recurrentOptions && (
          <SelectBox
            className="ratecard__exchange__id"
            name={"exchangeId"}
            options={recurrentOptions}
            label={"Tipo de Cambio"}
            size="small"
            defaultValue={rate?.exchangeId}
            value={rate?.exchangeId || exchangeId}
            onChange={(event) => setExchangeId(event.target.value)}
            {...inputProps}
            {...props}
          />
        )}
        <SelectBox
          className="ratecard__exchange-recurrent"
          name={`recurrent`}
          options={{ 1: "Si", 0: "No" }}
          label={"Favorito"}
          size="small"
          defaultValue={rate?.recurrent}
          value={rate?.recurret || recurrent}
          onChange={(event) => setRecurrent(event.target.value)}
          {...inputProps}
          {...props}
        />
        <TextField
          fullWidth
          required
          className="ratecard__amount"
          name="amount"
          placeholder="Cantidad"
          type="number"
          variant="outlined"
          size="small"
          label={"Cantidad"}
          defaultValue={rate?.amount}
          inputProps={{
            ...inputProps,
            max: MAX_INTEGER_PART,
            step: MIN_DECIMAL_PART,
            min: 0,
          }}
          {...props}
        />
      </Box>
    </>
  );
}
