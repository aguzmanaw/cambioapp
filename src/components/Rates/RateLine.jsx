import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import AddIconButton from "../AddIconButton";
import { RatelineCard } from "./RatelineCard";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  "& .rateline__action-button": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export function RateLine({ rate, exchangeTypes, onSubmit }) {
  return (
    <StyledBox
      component="form"
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={0}>
        <Grid item xs={12} md={11}>
          <RatelineCard rate={rate} exchangeTypes={exchangeTypes} />
        </Grid>
        <Grid item xs={12} md={1} className="rateline__action-button">
          <AddIconButton type="submit" />
        </Grid>
      </Grid>
    </StyledBox>
  );
}
