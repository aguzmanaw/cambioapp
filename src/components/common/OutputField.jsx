import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  ["& .outputfield__container"]: {
    margin: 0,
    padding: 0,
    alignItems: "start",
    ["& .MuiFormControlLabel-label"]: {
      fontWeight: 700,
    },
    ["& .MuiTypography-root"]: {},
  },
}));

export function OutputField({ defaultValue, label }) {
  /*const fieldType = typeof defaultValue;

  let textValue;

  if (fieldType === "number") {
    textValue = defaultValue.toString().slice(0, 21);
  } else if (fieldType === "string") {
    textValue = defaultValue.slice(0, 21);
  }
*/
  return (
    <StyledBox>
      <FormControlLabel
        className="outputfield__container"
        value="top"
        control={
          <Typography variant="subtitle1" gutterBottom>
            {defaultValue}
          </Typography>
        }
        label={label || ""}
        labelPlacement="top"
      />
    </StyledBox>
  );
}
