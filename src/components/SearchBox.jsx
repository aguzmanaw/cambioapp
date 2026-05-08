import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchBox({ id, label, options, loading, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Autocomplete
        fullWidth
        label={label}
        id={id || "search-box"}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label || "Asynchronous"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        {...props}
      />
    </div>
  );
}
