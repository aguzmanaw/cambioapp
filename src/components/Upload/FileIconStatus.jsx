import AttachFileIcon from "@mui/icons-material/AttachFile";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
  height: 40,
  ["& .file-icon__container"]: {},
  [".file-icon__success"]: {
    color: theme.palette.success.light,
  },
  ["& .file-icon__error"]: {
    color: theme.palette.error.main,
  },
  [".file-icon__info"]: {
    color: theme.palette.info.main,
  },
  [".file-icon__none"]: {
    color: theme.palette.warning.light,
  },
}));

export function FileIconStatus({ action }) {
  const mapActionToClass = {
    success: "file-icon__success",
    error: "file-icon__error",
    info: "file-icon__info",
    none: "file-icon__none",
  };

  const getClassByAction = (action) => {
    return Object.keys(mapActionToClass).includes(action)
      ? mapActionToClass[action]
      : mapActionToClass.info;
  };

  return (
    <StyledBox className={"file-icon__container"}>
      <AttachFileIcon className={getClassByAction(action)} />
    </StyledBox>
  );
}
