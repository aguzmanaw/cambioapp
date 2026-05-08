import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIconButton from "components/EditIconButton";
import ViewIconButton from "components/ViewIconButton";
import { Box } from "@mui/material";
import { ActionType } from "@/utils/constants";
import { formatNumber } from "@/utils/format";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "../common/TableCellTemplate";
//import { getAskCurrency } from "@/utils/getAskCurrency";
//import { getBidCurrency } from "@/utils/getBidCurrency";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.rate-header__row"]: {
    width: "40px",
  },
  ["&.rate-header__created_at"]: {
    minWidth: 105,
    width: 105,
  },
  ["&.rate-header__type"]: {
    width: 200,
    textAlign: "center",
  },
  ["&.rate-header__customer-currency"]: {
    textAlign: "center",
    minWidth: 100,
    maxWidth: 200,
  },
  ["&.rate-header__rate-divider"]: {},
  ["&.rate-header__business-currency"]: {
    textAlign: "center",
    minWidth: 100,
    maxWidth: 200,
  },
  ["&.rate-header__amount"]: {
    minWidth: 130,
    width: 130,
    textAlign: "end",
  },
  [`&.rate-header__action`]: {
    minWidth: "80px",
    width: "80px",
    textAlign: "center",
  },
  ["&.rate-column__type"]: {
    textAlign: "center",
    textTransform: "capitalize",
  },
  ["&.rate-column__customer-currency"]: {
    textAlign: "end",
  },
  ["&.rate-column__rate-divider"]: {
    textAlign: "center",
  },
  [`&.rate-column__business-currency`]: {
    textAlign: "end",
  },
  [`&.rate-column__amount`]: {
    textAlign: "end",
  },

  ["&.rate-column__action"]: {
    padding: 0,
    margin: 0,
  },
}));

export function RateTable({ rows, onSelect }) {
  const counter = rows?.length || 0;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="rate table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="rate-header__row">#</StyledTableCell>
              <StyledTableCell className="rate-header__created_at">
                Fecha
              </StyledTableCell>
              <StyledTableCell className="rate-header__type">
                Tipo
              </StyledTableCell>
              <StyledTableCell className="rate-header__customer-currency">
                Unidad
              </StyledTableCell>
              <StyledTableCell className="rate-header__rate-divider" />
              <StyledTableCell className="rate-header__business-currency">
                Tasa
              </StyledTableCell>
              <StyledTableCell className="rate-header__action">
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
                    {row?.createdAt}
                  </StyledTableCell>
                  <StyledTableCell className="rate-column__type">
                    {row?.type}
                  </StyledTableCell>
                  <StyledTableCell className="rate-column__customer-currency">
                    {formatNumber(row?.customerAmount, 10)}{" "}
                    {row?.customerCurrency}
                  </StyledTableCell>
                  <StyledTableCell className="rate-column__rate-divider">
                    por
                  </StyledTableCell>
                  <StyledTableCell className="rate-column__business-currency">
                    {formatNumber(row?.businessAmount, 10)}{" "}
                    {row?.businessCurrency}
                  </StyledTableCell>
                  <StyledTableCell className="rate-column__action">
                    <ViewIconButton
                      onClick={onSelect({
                        action: ActionType.SHOW,
                        params: { ...row },
                      })}
                    />
                    <EditIconButton
                      onClick={onSelect({
                        action: ActionType.UPDATE,
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
