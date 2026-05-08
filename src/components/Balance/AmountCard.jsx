import { formatNumber } from "@/utils/format";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const StyledCard = styled(Box)(() => ({
  "& .amountcard__currency": {
    fontWeight: 900,
  },
  "& .amountcard__amount": {},
}));

export function AmountCard({ className, currency = "USD", amount = 0 }) {
  return (
    <>
      <StyledCard className={className}>
        <Typography
          className="amountcard__currency"
          gutterBottom
          variant="body1"
        >
          {currency}
        </Typography>
        <Typography className="amountcard__amount" gutterBottom variant="body1">
          {formatNumber(amount)}
        </Typography>
      </StyledCard>
    </>
  );
}
