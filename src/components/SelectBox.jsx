import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//import NativeSelect from "@mui/material/NativeSelect";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// filled" | 'outlined' | 'standard'

/*
export function SelectBox({ id, name, label, options, defaultValue, ...rest }) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id}>{label || ""}</InputLabel>
      <NativeSelect
        defaultValue={defaultValue}
        inputProps={{
          name: name,
          id: id,
        }}
        variant="outlined"
        {...rest}
      >
        {Object.keys(options).map((key, index) => {
          return (
            <option key={index} value={key}>
              {options?.[key]}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
}
*/

export function SelectBox({
  id = "select-box",
  name,
  label,
  options,
  defaultValue,
  ...rest
}) {
  const { size, ...props } = rest;

  const menuOptions = options ? Object.keys(options) : [];

  return (
    <>
      {Array.isArray(menuOptions) && (
        <FormControl fullWidth size={size}>
          <InputLabel id={id}>{label || ""}</InputLabel>
          <Select
            label={label}
            labelId={id}
            id={id}
            defaultValue={defaultValue || ""}
            name={name}
            {...props}
          >
            {menuOptions.map((key, index) => {
              return (
                <MenuItem key={index} value={key}>
                  {options?.[key]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
}
