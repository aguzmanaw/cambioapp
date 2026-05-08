import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIconButton from "../DeleteIconButton";
import EditIconButton from "../EditIconButton";
import ViewIconButton from "../ViewIconButton";
import { Box } from "@mui/material";
import { ActionType } from "@/utils/constants";
import { StyledTableRow } from "../common/StyledTableRow";
import { TableCellTemplate } from "../common/TableCellTemplate";

const StyledTableCell = styled(TableCellTemplate)(() => ({
  ["&.customer-header__row"]: {
    width: "15px",
  },
  ["&.customer-header__firstname-lastname"]: {
    minWidth: "200px",
  },
  ["&.customer-header__dni"]: {
    width: "90px",
  },
  ["&.customer-header__country"]: {
    minWidth: "100px",
  },
  ["&.customer-header__phone"]: {
    minWidth: "200px",
    width: "140px",
  },
  ["&.customer-header__email"]: {
    minWidth: "50px",
  },
  ["&.customer-header__description"]: {
    minWidth: "200px",
  },
  [`&.customer-header__action `]: {
    minWidth: "114px",
    width: "114px",
    textAlign: "center",
  },
  ["&.customer-column__description"]: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
  },
  ["&.customer-column__action"]: {
    padding: 0,
    margin: 0,
  },
}));

export function CustomerTable({ rows, onRowClick }) {
  const counter = rows.length;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="customer table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="customer-header__row">
                #
              </StyledTableCell>
              <StyledTableCell className="customer-header__firstname-lastname">
                Nombre y Apellido
              </StyledTableCell>
              <StyledTableCell className="customer-header__dni">
                DNI
              </StyledTableCell>
              <StyledTableCell className="customer-header__country-name">
                País
              </StyledTableCell>
              <StyledTableCell className="customer-header__phone">
                Teléfono
              </StyledTableCell>
              <StyledTableCell className="customer-header__description">
                Descripción
              </StyledTableCell>
              <StyledTableCell className="customer-header__action">
                Acción
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{counter - index}</StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="customer-column__firstname-lastname"
                  >
                    {`${row?.firstname} ${row?.lastname}`}
                  </StyledTableCell>
                  <StyledTableCell>{row?.dni}</StyledTableCell>
                  <StyledTableCell>{row?.countryName}</StyledTableCell>
                  <StyledTableCell>{row?.phone}</StyledTableCell>
                  <StyledTableCell>{row?.description}</StyledTableCell>
                  <StyledTableCell className="customer-column__action">
                    <ViewIconButton
                      onClick={onRowClick({
                        action: ActionType.SHOW,
                        params: { ...row },
                      })}
                    />
                    <EditIconButton
                      onClick={onRowClick({
                        action: ActionType.UPDATE,
                        params: { ...row },
                      })}
                    />
                    <DeleteIconButton
                      onClick={onRowClick({
                        action: ActionType.DELETE,
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
