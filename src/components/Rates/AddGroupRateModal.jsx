import { Box, Dialog, Divider, Paper, Typography } from "@mui/material";
import { ActionButtons } from "components/ActionButtons";

import { useTheme } from "@emotion/react";
import { RateLine } from "./RateLine";
import { arrayDifference } from "@/utils/array-diff";
import { GroupBox } from "../GroupBox";

export function AddGroupRateModal({
  title,
  showModal,
  onClose,
  recurrents,
  exchanges,
  onSubmit,
}) {
  const getExchangeSelectLabel = ({
    id,
    type,
    customerCurrency,
    businessCurrency,
  }) => {
    if (type === "venta")
      return {
        [id]: `${type} 1 ${businessCurrency} por ${customerCurrency}`,
      };
    else
      return {
        [id]: `${type} 1 ${customerCurrency} por ${businessCurrency}`,
      };
  };

  const formatExchange = ({ type, customerCurrency, businessCurrency }) => {
    return `${type} 1 ${customerCurrency} por ${businessCurrency}`;
  };

  const mapExchangesToSelect = (exchanges) => {
    if (!Array.isArray(exchanges)) return;

    return exchanges.reduce((select, exchange) => {
      return { ...select, [exchange.id]: formatExchange(exchange) };
    }, {});
  };

  const missingExchanges = arrayDifference(exchanges, recurrents);

  const recurrentOptions = mapExchangesToSelect(missingExchanges);

  const theme = useTheme();
  return (
    <>
      <Paper>
        <Dialog
          open={showModal}
          aria-labelledby="nuevo cliente"
          aria-describedby="agregar campos del cliente"
        >
          <Box
            sx={{
              ["& .MuiTextField-root"]: {
                m: 0.8,
              },
              ["& .MuiTextField-root input:invalid"]: {
                borderBottom: `2px solid ${theme.palette.error.dark}`,
                color: theme.palette.error.dark,
              },
              [theme.breakpoints.up("md")]: {
                minWidth: 600,
              },
              [theme.breakpoints.down("md")]: {
                minWidth: 400,
              },
              "& header": {
                textAlign: "center",
                padding: "4px",
              },
              ["& .rate-recurrent__select-all"]: {
                padding: "8px 16px 8px 16px",
              },
              ["& .rate-recurrent__select-one"]: {
                padding: "8px 16px 8px 16px",
                height: 450,
                margin: 0,
              },
              ["& .rate-recurrent__table"]: {
                height: 380,
                minHeight: 380,
                overflowY: "scroll",
              },
            }}
          >
            <Box component="header">
              <Typography
                variant="h6"
                className="rate-header__title"
                gutterBottom
              >
                {title}
              </Typography>
            </Box>
            <Divider />

            <Box component="section" className="rate-recurrent__select-all">
              <GroupBox label={"Tasas"}>
                <RateLine
                  exchangeTypes={recurrentOptions}
                  onSubmit={onSubmit}
                />
              </GroupBox>
            </Box>

            <Box
              component="section"
              className="rate-recurrent__select-one"
              sx={{
                [theme.breakpoints.up("md")]: {
                  height: 460,
                },
              }}
            >
              <GroupBox label={"Tasas Favoritas"}>
                <Box component={"section"} className={"rate-recurrent__table"}>
                  {Array.isArray(recurrents) &&
                    recurrents.map((recurrent) => {
                      return (
                        <RateLine
                          rate={recurrent}
                          key={recurrent.id}
                          title={"Agregar Tasas Favoritas"}
                          onSubmit={onSubmit}
                          exchangeTypes={getExchangeSelectLabel(recurrent)}
                          defaultValue={recurrent.type}
                        />
                      );
                    })}
                </Box>
              </GroupBox>
            </Box>
            <Divider />
            <ActionButtons closeLabel={"Cerrar"} onClose={onClose} />
          </Box>
        </Dialog>
      </Paper>
    </>
  );
}
