import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "../common/TableCellTemplate";
import { formatNumber } from "@/utils/format";

const StyledBox = styled(Box)(() => ({
  /*padding: "0 8px 0 8px",*/
}));

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.rate-header__row"]: {
    width: 40,
  },
  ["&.rate-header__rate-description"]: {
    ["& span.rate-cell__rate-type"]: {
      textTransform: "capitalize",
    },
  },
  ["&.rate-header__rate-unit"]: {
    minWidth: 200,
    width: 200,
    textAlign: "center",
  },
  ["& .rate-column__customer-currency"]: {},
  ["& .rate-column__business-currency"]: {
    textAlign: "end",
    backgroundColor: "red",
  },
  ["&.rate-header__amount"]: {
    minWidth: 200,
    width: 200,
    textAlign: "center",
  },
  [`&.rate-column__rate-unit`]: {
    minWidth: 200,
    width: 200,
    textAlign: "end",
  },
  [`&.rate-header__rate-divider`]: {
    textAlign: "center",
  },
  [`&.rate-column__amount`]: {
    textAlign: "end",
  },
  [`&.rate-column__rate-divider`]: {
    textAlign: "center",
  },
}));

export function RateTablelist({ rows }) {
  const counter = rows?.length || 0;
  /*
  const getBidCurrency = ({ rateType, customerCurrency, businessCurrency }) => {
    return rateType === "compra" ? customerCurrency : businessCurrency;
  };

  const getAskCurrency = ({ rateType, customerCurrency, businessCurrency }) => {
    return rateType === "compra" ? businessCurrency : customerCurrency;
  };
*/
  return (
    <>
      <StyledBox>
        <TableContainer component={Paper} sx={{ width: "auto" }}>
          <Table size="small" aria-label="rate table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="rate-header__row">
                  #
                </StyledTableCell>
                <StyledTableCell className="rate-header__rate-description">
                  Tipo
                </StyledTableCell>
                <StyledTableCell className="rate-header__rate-unit">
                  Unidad
                </StyledTableCell>
                <StyledTableCell className="rate-header__rate-divider"></StyledTableCell>
                <StyledTableCell className="rate-header__amount">
                  Tasa
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) &&
                rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{counter - index}</StyledTableCell>
                    <StyledTableCell className="rate-header__rate-description">
                      <span className="rate-cell__rate-type">{row?.type}</span>
                    </StyledTableCell>
                    <StyledTableCell className="rate-column__rate-unit">
                      {`${formatNumber(row?.customerAmount, 10)} ${
                        row?.customerCurrency
                      }`}
                    </StyledTableCell>
                    <StyledTableCell className="rate-column__rate-divider">
                      por
                    </StyledTableCell>
                    <StyledTableCell className="rate-column__amount">
                      {`${formatNumber(row?.businessAmount, 10)} ${
                        row?.businessCurrency
                      }`}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledBox>
    </>
  );
}
