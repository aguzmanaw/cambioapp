import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  ["&.order-header__filename"]: {
    width: 200,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ["&.order-column__filename:hover"]: {},
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function OrderReceiptsTable({ rows, onAction }) {
  return (
    <Box>
      <TableContainer component={Paper} sx={{ height: 150 }}>
        <Table size="small" aria-label="payment table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="payment-header__account-name">
                Recibo
              </StyledTableCell>
              <StyledTableCell className="order-header__filename">
                Archivo
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={index} onClick={onAction(row)}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="payment-column__account-name"
                  >
                    {row?.receiptType}
                  </StyledTableCell>
                  <StyledTableCell className={"order-column__filename"}>
                    {row?.filename}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
