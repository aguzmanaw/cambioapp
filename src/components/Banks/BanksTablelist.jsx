import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import { Box } from "@mui/material";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "../common/TableCellTemplate";
import { formatNumber } from "@/utils/format";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.bank-header__row"]: {
    width: "10px",
  },
  ["&.bank-header__description"]: {
    width: "auto",
  },
  ["&.bank-header__code"]: {
    width: "50px",
  },
  ["&.bank-header__currency"]: {
    width: "160px",
    textAlign: "center",
  },
  ["&.bank-header__balance"]: {
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.bank-header__daily-limit"]: {
    width: "120px",
    minWidth: "auto",
    textAlign: "right",
  },
  ["&.bank-header__available-limit"]: {
    width: 200,
    minWidth: 200,
    textAlign: "right",
  },
  ["&.bank-header__action"]: {
    textAlign: "center",
    width: "115px",
  },
  ["&.bank-column__description"]: {
    textAlign: "left",
    maxWidth: "20ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ["&.bank-column__code"]: {
    textAlign: "left",
    maxWidth: "20ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ["&.bank-column__currency"]: {
    textAlign: "center",
  },
  ["&.bank-column__balance"]: {
    textAlign: "right",
  },
  ["&.bank-column__daily-limit"]: {
    textAlign: "right",
  },
  ["&.bank-column__available-limit"]: {
    textAlign: "right",
  },
  ["&.bank-column__action"]: {
    padding: 0,
  },
  ["&.bank-cell__disabled"]: {
    color: "gray",
    textDecoration: "line-through",
  },
}));

export function BanksTablelist({ rows }) {
  const counter = rows?.length || 0;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="bank dashboard">
          <TableHead>
            <TableRow>
              <StyledTableCell className="bank-header__row">#</StyledTableCell>
              <StyledTableCell className="bank-header__description">
                Banco
              </StyledTableCell>
              <StyledTableCell className="bank-header__available-limit">
                Límite Disponible
              </StyledTableCell>
              <StyledTableCell className="bank-header__balance">
                Saldo
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{counter - index}</StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={clsx("bank-column__description", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {row?.description}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx("bank-column__available-limit", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {`${formatNumber(row?.availableLimit)} ${
                      row?.currencyCode
                    }`}
                  </StyledTableCell>
                  <StyledTableCell
                    className={clsx("bank-column__balance", {
                      ["bank-cell__disabled"]: row?.disable,
                    })}
                  >
                    {`${formatNumber(row?.balance)} ${row?.currencyCode}`}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
