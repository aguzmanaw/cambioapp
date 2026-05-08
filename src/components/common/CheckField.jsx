import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

export function CheckField({
  label,
  labelPlacement = "start",
  defaultValue,
  ...props
}) {
  const [checked, setChecked] = useState(defaultValue);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <FormControlLabel
      value="start"
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={label || ""}
      labelPlacement={labelPlacement}
      {...props}
    />
  );
}
