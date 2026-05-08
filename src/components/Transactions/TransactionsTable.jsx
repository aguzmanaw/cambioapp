import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewIconButton from "@/components/ViewIconButton";
import { Box } from "@mui/material";
import { ActionType } from "@/utils/constants";
import { printDate, printNumber } from "@/utils/format";
import { StyledTableRow } from "@/components/common/StyledTableRow";
import { TableCellTemplate } from "@/components/common/TableCellTemplate";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.transaction-header__row"]: {
    width: "40px",
  },
  ["&.transaction-header__created_at"]: {
    minWidth: 105,
    width: 105,
  },
  ["&.transaction-header__type"]: {
    width: 90,
  },
  ["&.transaction-header__account"]: {
    minWidth: 320,
    width: 320,
  },
  ["&.transaction-header__currency"]: {
    minWidth: 50,
    width: 50,
    textAlign: "center",
  },
  ["&.transaction-header__amount"]: {
    minWidth: 150,
    width: 150,
    textAlign: "center",
  },
  ["&.transaction-header__created-by"]: {
    width: "auto",
  },
  [`&.transaction-header__action`]: {
    minWidth: 20,
    width: 20,
    textAlign: "center",
  },
  ["&.transaction-column__account"]: {
    textAlign: "start",
  },
  [`&.transaction-column__currency`]: {
    textAlign: "center",
  },
  ["&.transaction-column__type"]: {
    textTransform: "capitalize",
  },
  [`&.transaction-column__amount`]: {
    textAlign: "end",
  },
  ["&.transaction-column__action"]: {
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
}));

export function TransactionsTable({ rows, onSelect }) {
  const counter = rows?.length || 0;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          size="small"
          aria-label="transactions table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell className="transaction-header__row">
                #
              </StyledTableCell>
              <StyledTableCell className="transaction-header__created_at">
                Fecha
              </StyledTableCell>
              <StyledTableCell className="transaction-header__account">
                Cuenta
              </StyledTableCell>
              <StyledTableCell className="transaction-header__currency">
                Moneda
              </StyledTableCell>
              <StyledTableCell className="transaction-header__type">
                Tipo
              </StyledTableCell>
              <StyledTableCell className="transaction-header__amount">
                Cantidad
              </StyledTableCell>
              <StyledTableCell className="transaction-header__created-by">
                Creado por
              </StyledTableCell>
              <StyledTableCell className="transaction-header__action">
                Acción
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{counter - index}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {printDate(row?.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell className="transaction-column__account">
                    {row?.accountDescription}/{row?.currencyName}
                  </StyledTableCell>
                  <StyledTableCell className="transaction-column__currency">
                    {row?.currencyCode}
                  </StyledTableCell>
                  <StyledTableCell className="transaction-column__type">
                    {row?.type}
                  </StyledTableCell>
                  <StyledTableCell className="transaction-column__amount">
                    {printNumber(row?.amount)}
                  </StyledTableCell>
                  <StyledTableCell>{row?.createdBy}</StyledTableCell>
                  <StyledTableCell className="transaction-column__action">
                    <ViewIconButton
                      onClick={onSelect({
                        action: ActionType.SHOW,
                        params: { ...row },
                      })}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
