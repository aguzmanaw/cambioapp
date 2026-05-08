import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SelectField({
  id,
  name,
  label,
  defaultValue,
  options,
  required,
  ...props
}) {
  const [value, setValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState(defaultValue);

  if (Array.isArray(options)) {
    return (
      <>
        <Autocomplete
          options={options}
          autoHighlight
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              required={required}
              {...params}
              label={label}
              id={id}
              name={name}
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
          {...props}
        />
      </>
    );
  }
  return null;
}
