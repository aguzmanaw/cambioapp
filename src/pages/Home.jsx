import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { OrdersSummaryCard } from "@/components/Indicators/OrdersSummaryCard";
import { DailyRatesCard } from "@/components/Indicators/DailyRatesCard";
import styled from "@emotion/styled";
import { BankBalanceCard } from "@/components/Indicators/BanksBalanceCard";

const StyledBox = styled(Box)(() => ({
  paddingTop: 12,
  marginLeft: 10,
  "& .dashboard__table": {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
}));

export default function HomePage() {
  return (
    <>
      <StyledBox>
        <Grid container spacing={0}>
          <Grid item xs={12} md={9} className="dashboard__table">
            <DailyRatesCard />
            <BankBalanceCard />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <OrdersSummaryCard />
          </Grid>
        </Grid>
      </StyledBox>
    </>
  );
}
