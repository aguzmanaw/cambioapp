import styled from "@emotion/styled";
import { Box, InputLabel } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 6,
  padding: 8,
  ["& .groupbox__label"]: {
    margin: "-8px 0 6px 1px",
  },
}));

export function GroupBox({ children, label, className, ...props }) {
  return (
    <>
      <StyledBox componenet="fieldset" className={className} {...props}>
        <InputLabel className="groupbox__label">{label || ""}</InputLabel>
        {children}
      </StyledBox>
    </>
  );
}
