import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";

export function SearchInput({ placeholder, ...rest }) {
  return (
    <Box
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
          borderRadius: "8px",
        },
        "& .MuiSvgIcon-root": {
          cursor: "pointer",
        },
      }}
    >
      <OutlinedInput
        autoFocus
        id="search"
        name="search"
        fullWidth
        placeholder={placeholder || "numero de orden"}
        size="small"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon aria-label="search item" type="submit" />
          </InputAdornment>
        }
        {...rest}
      />
    </Box>
  );
}
