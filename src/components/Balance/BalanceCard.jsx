import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { AmountCard } from "@/components/Balance/AmountCard";

const StyledCard = styled(Card)(() => ({
  "& .balancecard__statics": {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
  },
  "& .balancecard__left-amount": {
    textAlign: "center",
    width: "50%",
  },
  "& .balancecard__right-amount": {
    textAlign: "center",
    width: "50%",
  },
  "& .balancecard__statement": {
    textAlign: "center",
  },
}));

export function BalanceCard({ currency = "", amount = 0 }) {
  return (
    <>
      <StyledCard>
        <CardContent>
          <Box className="balancecard__statics">
            <AmountCard
              className="balancecard__left-amount"
              currency={currency}
              amount={amount}
            />
            <AmountCard
              className="balancecard__right-amount"
              currency={currency}
              amount={amount}
            />
          </Box>
          <Divider />
          <Box className="balancecard__statics">
            <AmountCard
              className="balancecard__left-amount"
              currency={currency}
              amount={amount}
            />
            <AmountCard
              className="balancecard__right-amount"
              currency={currency}
              amount={amount}
            />
          </Box>
          <AmountCard
            className="balancecard__statement"
            currency={currency}
            amount={amount}
          />
        </CardContent>
      </StyledCard>
    </>
  );
}
