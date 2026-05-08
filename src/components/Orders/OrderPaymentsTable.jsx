import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Upload from "../Upload/Upload";
import AddIconButton from "../AddIconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  ["&.payment-header__account-name"]: {
    height: 0,
    width: 240,
    display: "none",
  },
  ["&.payment-header__amount"]: {
    height: 0,
    width: 190,
    display: "none",
  },
  ["&.payment-header__file-icon"]: {
    height: 0,
    width: 90,
    display: "none",
  },
  [`&.payment-header__status `]: {
    height: 0,
    padding: 0,
    margin: 0,
    display: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ["&.payment-column__account-name"]: {
    width: 228,
    maxWidth: 228,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
  },
  ["&.payment-column__amount"]: {
    width: 100,
    maxWidth: 100,
  },
  ["&.payment-column__currency-type"]: {
    width: 80,
    maxWidth: 80,
  },
  ["&.payment-column__file-icon"]: {
    width: 99,
  },
  ["&.payment-column__status"]: {
    width: "auto",
    padding: 0,
    margin: 0,
  },
}));

const StyledTableRow = styled(TableRow)((/*{ theme }*/) => ({
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getTitle = ({
  accountDescription,
  accountCurrencyName,
  accountCurrencyType,
}) => {
  const sep = accountCurrencyName ? "/" : "";
  const wrap = accountCurrencyType ? ["(", ")"] : ["", ""];
  return `${accountDescription}${sep}${accountCurrencyName}${wrap[0]}${accountCurrencyType}${wrap[1]}`;
};

export function OrderPaymentTable({ rows, loading }) {
  return (
    <Box>
      <TableContainer component={Paper} sx={{ height: 165 }}>
        <Table size="small" aria-label="payment table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="payment-header__account-name">
                Cuenta
              </StyledTableCell>
              <StyledTableCell className="payment-header__amount">
                Cantidad
              </StyledTableCell>
              <StyledTableCell className="payment-header__file-icon">
                Recibo
              </StyledTableCell>
              <StyledTableCell className="payment-header__status">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="payment-column__account-name"
                  >
                    {getTitle(row)}
                  </StyledTableCell>
                  <StyledTableCell className={"payment-column__amount"}>
                    {row?.amount}
                  </StyledTableCell>
                  <StyledTableCell className={"payment-column__currency-type"}>
                    {row?.accountCurrencyType}
                  </StyledTableCell>
                  <StyledTableCell className={"payment-column__file-icon"}>
                    <Upload
                      id={`payment-receipt-${index}`}
                      name={`payment-receipt-${index}`}
                      filename={row?.receipt}
                      disabled={row?.id}
                    />
                  </StyledTableCell>
                  <StyledTableCell className={"payment-column__status"}>
                    <AddIconButton disabled />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
