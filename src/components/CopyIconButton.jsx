import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  ["& .copy-button__icon:hover"]: {
    color: theme.palette.secondary.main,
  },
}));

export function CopyIconButton({
  title,
  className,
  onClick,
  onSubmit,
  ...rest
}) {
  return (
    <StyledIconButton
      id="copy-icon"
      className={className}
      aria-label="add"
      color="primary"
      onClick={onClick}
      onSubmit={onSubmit}
      {...rest}
    >
      <Tooltip title={title || "Copiar"} placement="bottom-start">
        <ContentCopyIcon className={"copy-button__icon"} />
      </Tooltip>
    </StyledIconButton>
  );
}
