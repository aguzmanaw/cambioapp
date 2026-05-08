import { AreaChart } from "@/components/common/AreaChart";

import Box from "@mui/material/Box";

export function BalanceChart({ days, amounts, width, height }) {
  return (
    <>
      <Box className="balancecard__area-chart">
        <AreaChart
          title={"USD"}
          ySeries={amounts}
          xLabels={days}
          width={width}
          height={height}
        />
      </Box>
    </>
  );
}
