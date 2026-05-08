import Grid from "@mui/material/Grid";
import { BalanceCard } from "./BalanceCard";

export function BalanceTable() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <BalanceCard currency="Total USD" amount={100} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BalanceCard currency="Total ARG" amount={100} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BalanceCard currency="Total USDT" amount={100} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BalanceCard currency="Total BRS" amount={100} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BalanceCard currency="Total VED" amount={100} />
        </Grid>
      </Grid>
    </>
  );
}
