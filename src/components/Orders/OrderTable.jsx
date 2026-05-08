import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIconButton from "@/components/DeleteIconButton";
import EditIconButton from "@/components/EditIconButton";
import ViewIconButton from "@/components/ViewIconButton";

import { Box } from "@mui/material";
import { OrderStatus } from "./OrderStatus";
import { printDate, printNumber } from "@/utils/format";
import { ActionType } from "@/utils/constants";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "../common/TableCellTemplate";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.order-header__row"]: {
    width: 10,
    minWidth: 10,
  },
  ["&.order-header__date"]: {
    width: 15,
    minWidth: 15,
    paddingLeft: 0,
  },
  ["&.order-header__customer"]: {
    width: 160,
    minWidth: 160,
    paddingLeft: 0,
  },
  ["&.order-header__exchange"]: {
    width: 50,
    textAlign: "center",
  },
  ["&.order-header__rate"]: {
    padding: 0,
    minWidth: 70,
    width: 70,
    textAlign: "center",
    display: "none",
  },
  ["&.order-header__amount"]: {
    paddingRight: 0,
    width: 140,
    minWidth: 140,
    textAlign: "right",
  },
  ["&.order-header__pending"]: {
    paddingRight: 0,
    width: 140,
    minWidth: 140,
    textAlign: "right",
  },
  ["&.order-header__total"]: {
    width: 150,
    minWidth: 150,
    textAlign: "right",
  },
  ["&.order-header__status"]: {
    paddingRight: 0,
    width: 80,
    minWidth: 80,
    textAlign: "center",
  },
  ["&.order-header__action"]: {
    width: 105,
    minWidth: 105,
    textAlign: "center",
    padding: 0,
  },
  ["&.order-header__action--disabled"]: {
    display: "none",
  },
  ["&.order-column__date"]: {
    paddingLeft: 0,
  },
  ["&.order-column__customer"]: {
    paddingLeft: 0,
  },
  ["&.order-column__exchange"]: {
    padding: 0,
    textAlign: "center",
    textTransform: "capitalize",
  },
  ["&.order-column__rate"]: {
    paddingRight: 0,
    textAlign: "right",
    display: "none",
  },
  ["&.order-column__amount"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.order-column__pending"]: {
    textAlign: "right",
    paddingRight: 0,
  },
  ["&.order-column__total"]: {
    textAlign: "right",
  },
  ["&.order-column__status"]: {
    textAlign: "center",
    paddingLeft: 0,
    paddingRight: 0,
  },
  ["&.order-column__action"]: {
    padding: 0,
  },
  ["&.order-column__action--disabled"]: {
    display: "none",
  },
  ["& .order-column__status.order-pending"]: {
    color: "orange",
    backgroundColor: "orange",
  },

  ["& .order-column__status.order-open"]: {
    color: "yellow",
  },
}));

export function OrderTable({
  rows,
  onAction = function () {},
  disableAction = false,
}) {
  const counter = rows.length;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customer table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="order-header__row">#</StyledTableCell>
              <StyledTableCell className="order-header__date">
                Fecha
              </StyledTableCell>
              <StyledTableCell className="order-header__customer">
                Cliente
              </StyledTableCell>
              <StyledTableCell className="order-header__exchange">
                Cambio
              </StyledTableCell>
              <StyledTableCell className="order-header__rate">
                Tasa
              </StyledTableCell>
              <StyledTableCell className="order-header__amount">
                Cantidad
              </StyledTableCell>
              <StyledTableCell className="order-header__pending">
                Restante
              </StyledTableCell>
              <StyledTableCell className="order-header__total">
                Total
              </StyledTableCell>
              <StyledTableCell className="order-header__status">
                Estado
              </StyledTableCell>
              {!disableAction && (
                <StyledTableCell className={"order-header__action"}>
                  Acción
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{counter - index}</StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="order-column__date"
                  >
                    {printDate(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__customer">
                    {row.customerFirstName} {row.customerLastName}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__exchange">
                    {row.rateType}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__rate">
                    {printNumber(row.rateAmount, 2)}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__amount">
                    {`${printNumber(row.customerAmount, 2)} ${
                      row.rateCustomerCurrency
                    }`}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__pending">
                    {`${printNumber(row.amountPayable, 2)} ${
                      row.rateBusinessCurrency
                    }`}
                  </StyledTableCell>
                  <StyledTableCell className="order-column__total">
                    {`${printNumber(row.totalPayment, 2)} ${
                      row.rateBusinessCurrency
                    }`}
                  </StyledTableCell>
                  <StyledTableCell className={"order-column__status"}>
                    <OrderStatus status={row?.status} disable={row?.disable} />
                  </StyledTableCell>
                  {!disableAction && (
                    <StyledTableCell className={"order-column__action"}>
                      <ViewIconButton
                        onClick={onAction({
                          action: ActionType.SHOW,
                          params: { ...row },
                        })}
                      />
                      <EditIconButton
                        onClick={onAction({
                          action: ActionType.UPDATE,
                          params: { ...row },
                        })}
                      />
                      <DeleteIconButton
                        onClick={onAction({
                          action: ActionType.DELETE,
                          params: { ...row },
                        })}
                      />
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
