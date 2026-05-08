import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { SelectBox } from "@/components/SelectBox";
import SelectField from "@/components/SelectField";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  minWidth: 270,
  width: 400,
  ["& .ratecard__exchange-header"]: {
    paddingTop: 1,
  },
  ["& .ratecard__exchange-container"]: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px 16px 16px 16px",
  },
  ["& .ratecard__exchange-type"]: {
    textTransform: "capitalize",
  },
  ["& .ratecard__amount"]: {
    textAlign: "right",
  },
  ["& .MuiTextField-root input:invalid"]: {
    borderBottom: "2px solid red",
  },
  ["& .ratecard__divider"]: {
    marginLeft: "1em",
  },
}));

export function ExchangeCard({ title, rate, currencies }) {
  return (
    <>
      <StyledBox>
        <Box className="ratecard__exchange-header" component="header">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box className="ratecard__exchange-container" component="section">
          <SelectBox
            className="ratecard__exchange-type"
            name={"type"}
            options={{ venta: "Venta", compra: "Compra", remesa: "Remesa" }}
            label={"Tipo de Cambio"}
            size="small"
            defaultValue={"venta"}
          />
          {currencies && (
            <SelectField
              required
              id="customerCurrency"
              name="customerCurrency"
              label="Divisa 1"
              defaultValue={currencies[0]}
              options={currencies}
              size="small"
            />
          )}
          <Typography
            className="ratecard__divider"
            variant="body2"
            display="block"
            gutterBottom
          >
            {"Por"}
          </Typography>
          {currencies && (
            <SelectField
              required
              id="businessCurrency"
              name="businessCurrency"
              label="Divisa 2"
              defaultValue={currencies[0]}
              options={currencies}
              size="small"
            />
          )}
          <SelectBox
            className="ratecard__exchange-recurrent"
            name={`recurrent`}
            options={{ 1: "Si", 0: "No" }}
            label={"Favorito"}
            size="small"
            defaultValue={0}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "16px 16px 16px 16px",
          }}
        >
          <InputBase
            sx={{ display: "none" }}
            id="exchangeId"
            name="exchangeId"
            value={rate?.exchangeId}
            type="hidden"
          />
        </Box>
      </StyledBox>
      <Divider />
    </>
  );
}
