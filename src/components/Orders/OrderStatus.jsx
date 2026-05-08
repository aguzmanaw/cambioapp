import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

const StyledBox = styled(Box)(({ theme }) => ({
  ["& .order-status__message"]: {
    color: "white",
    fontWeight: 700,
    width: 90,
  },
  ["& .status-done.row-enabled"]: {
    backgroundColor: theme.palette.success.main, //green
  },
  ["& .status-done.row-disabled"]: {
    backgroundColor: theme.palette.error.light, //red
  },
  ["& .status-pending.row-enabled"]: {
    backgroundColor: theme.palette.error.main, //red
  },
  ["& .status-pending.row-disabled"]: {
    backgroundColor: theme.palette.error.light, //red
  },
  ["& .status-open.row-enabled"]: {
    backgroundColor: theme.palette.info.main, //blue
  },
  ["& .status-open.row-disabled"]: {
    backgroundColor: theme.palette.error.dark, //red
  },
}));

const mapClassByStatus = {
  cerrada: "status-done",
  por_pagar: "status-pending",
  por_cobrar: "status-pending",
  abierta: "status-open",
};

const getClassNameByStatus = (key) => {
  if (Object.keys(mapClassByStatus).includes(key)) {
    return mapClassByStatus[key];
  }
  return mapClassByStatus["abierta"];
};

const getClassNameByDisable = (disable) => {
  return disable ? "row-disabled" : "row-enabled";
};

const mapStatusToLabel = {
  cerrada: "Finalizado",
  por_pagar: "Pendiente",
  por_cobrar: "Pendiente",
  abierta: "Abierta",
};

const getLabelByStatus = (status) => {
  if (Object.keys(mapStatusToLabel).includes(status)) {
    return mapStatusToLabel[status];
  }
  return mapStatusToLabel["abierta"];
};

export function OrderStatus({ status, disable }) {
  return (
    <StyledBox className="order-status__container*">
      <Chip
        className={clsx(
          "order-status__message",
          getClassNameByStatus(status),
          getClassNameByDisable(disable)
        )}
        label={getLabelByStatus(status)}
      />
    </StyledBox>
  );
}
