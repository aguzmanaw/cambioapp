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
  ["&.user-header__row"]: {
    width: 15,
    minWidth: 15,
  },
  ["&.user-header__firstname-lastname"]: {
    minWidth: 170,
    width: 170,
    paddingLeft: 0,
  },
  ["&.user-header__dni"]: {
    width: 90,
    minWidth: 90,
  },
  ["&.user-header__country"]: {
    minWidth: 100,
    width: 100,
  },
  ["&.user-header__phone"]: {
    minWidth: 160,
    width: 160,
  },
  ["&.user-header__email"]: {
    minWidth: 50,
    width: 50,
  },
  ["&.user-header__description"]: {
    minWidth: "200px",
    width: "200px",
  },
  [`&.user-header__action `]: {
    minWidth: 114,
    width: 114,
    textAlign: "center",
  },
  ["&.user-column__firstname-lastname"]: {
    paddingLeft: 0,
  },
  ["& .user-column__description"]: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    width: 140,
    minWidth: 140,
  },
  ["&.user-column__action"]: {
    padding: 0,
    margin: 0,
  },
}));

export function UserTable({ rows, onRowClick = function () {} }) {
  const counter = rows ? rows.length : 0;

  return (
    <Box
      sx={{
        padding: "0 8px 0 8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="user table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="user-header__row">#</StyledTableCell>
              <StyledTableCell className="user-header__firstname-lastname">
                Nombre y Apellido
              </StyledTableCell>
              <StyledTableCell className="user-header__role">
                Rol
              </StyledTableCell>
              <StyledTableCell className="user-header__phone">
                Telefono
              </StyledTableCell>
              <StyledTableCell className="user-header__description">
                Descripción
              </StyledTableCell>
              <StyledTableCell className="user-header__created-by">
                Creado por
              </StyledTableCell>
              <StyledTableCell className="user-header__action">
                Acción
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell className="user-column__row">
                    {counter - index}
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="user-column__firstname-lastname"
                  >
                    {`${row?.firstname} ${row?.lastname ?? ""}`}
                  </StyledTableCell>
                  <StyledTableCell className="user-column__role">
                    {row?.role}
                  </StyledTableCell>
                  <StyledTableCell className="user-column__phone">
                    {row?.phone}
                  </StyledTableCell>
                  <StyledTableCell className="user-column__description">
                    {row?.description}
                  </StyledTableCell>
                  <StyledTableCell className="user-column__created-by">
                    {row?.createdBy}
                  </StyledTableCell>
                  <StyledTableCell className="user-column__action">
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
