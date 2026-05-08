import { BalanceTable } from "../components/Balance/BalanceTable";
import { BalanceChart } from "@/components/Indicators/BalanceChart";
import { NewButton } from "@/components/NewButton";
import { useApplicationData } from "@/hooks/useApplicationData";
import { useBalancesData } from "@/hooks/useBalanceData";
import { drawerWidth } from "@/utils/constants";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "@emotion/styled";
import { AmountCard } from "@/components/Balance/AmountCard";
import { Card } from "@mui/material";

const StyledBox = styled(Box)(() => ({
  padding: 10,
  "& .balancecard__header": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    marginTop: 10,
  },
  "& .balancecard__title": {
    maxWidth: 400,
    width: 400,
    textAlign: "center",
  },
  "& .balancecard__table": {
    marginTop: 1,
  },
  "& .balancecard__area-chart": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .balancecard__legend": {
    maxWidth: 400,
    marginTop: -20,
  },
}));

export default function Balance() {
  const { mobileOpen } = useApplicationData();
  const { balancesInUsd, generateBalance } = useBalancesData();
  const { days, amounts } = balancesInUsd;
  const xs = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const md = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const lg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const getMaxWidthByBreakpoints = ({ xs, sm, md, lg }) => {
    if (xs) return 320;
    if (sm) return 600;
    if (md) return 900;
    if (lg) return 1200;
    return 1536;
  };

  const getMaxHeightByBalanceChartWidth = (width) => {
    return width / 4;
  };

  const handleCreateBalance = async (event) => {
    event.preventDefault();

    await generateBalance();
  };
  const width = getMaxWidthByBreakpoints({ xs, sm, md, lg });
  const height = getMaxHeightByBalanceChartWidth(width);
  const balanceWidth = width * 0.86 - (!mobileOpen ? drawerWidth : 0);
  return (
    <>
      <StyledBox>
        <Box className={"balancecard__header"} component="section">
          <Box component="form">
            <NewButton
              label={"Generar"}
              id="newBtn"
              onClick={handleCreateBalance}
            />
          </Box>
          <Card className={"balancecard__title"}>
            <AmountCard
              className="balancecard__left-amount"
              currency={"Saldo Actual"}
              amount={1000}
            />
          </Card>
        </Box>
        <Grid className="balancecard__table" container spacing={2}>
          <Grid item xs={12}>
            <BalanceTable />
          </Grid>
          <Grid item xs={12} className="balancecard__area-chart">
            <BalanceChart
              days={days}
              amounts={amounts}
              height={height}
              width={balanceWidth}
            />
            <Typography
              className="balancecard__legend"
              variant="h6"
              gutterBottom
            >
              Historico Saldo Total en Divisas (USD)
            </Typography>
          </Grid>
        </Grid>
      </StyledBox>
    </>
  );
}
