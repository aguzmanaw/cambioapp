import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { SelectBox } from "components/SelectBox";
import { MAX_INTEGER_PART, MIN_DECIMAL_PART } from "@/utils/constants";
import styled from "@emotion/styled";

const StyledGrid = styled(Grid)(() => ({
  paddingTop: 6,
  "& .exchange-field__id": {
    marginTop: 8,
  },
  "& .exchange-field__amount": {},
}));

export function RatelineCard({ rate, exchangeTypes }) {
  return (
    <StyledGrid container spacing={0}>
      <Grid item xs={12} md={8}>
        <SelectBox
          className="exchange-field__id"
          name={"exchangeId"}
          options={exchangeTypes}
          label={"Tipo de Cambio"}
          size="small"
          defaultValue={rate?.id}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          className="exchange-field__amount"
          required
          name="amount"
          placeholder="Cantidad"
          type="number"
          variant="outlined"
          size="small"
          label={"Cantidad"}
          defaultValue={rate?.amount}
          inputProps={{
            max: MAX_INTEGER_PART,
            step: MIN_DECIMAL_PART,
            min: 0,
          }}
        />
      </Grid>
    </StyledGrid>
  );
}
