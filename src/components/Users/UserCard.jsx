import TextField from "@mui/material/TextField";
import { SelectBox } from "../SelectBox";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import SelectField from "../SelectField";
import Grid from "@mui/material/Grid";
import { GroupBox } from "../GroupBox";

const StyledBox = styled(Box)(() => ({
  padding: "0px 12px 0px 12px ",
  minWidth: 600,
  width: 400,

  position: "relative",
  ["& .usercard__tabinfo--active"]: {
    height: "auto",
  },
  ["& .usercard__tabinfo--hidden"]: {},
}));

const StyledSubBox = styled(Box)(() => ({
  paddingTop: 8,
  position: "relative",
  ["& .MuiInputBase-root, MuiTextField-root"]: {},
  ["& .MuiInputBase-root input:invalid, .MuiTextField-root input:invalid"]: {
    borderBottom: "1px solid red",
    color: "red",
  },
}));

export function UserCard({ user, countries, disabledInputs, readOnlyInputs }) {
  let countriesOpitons;
  let defaultCountry;

  if (countries && countries.length) {
    countriesOpitons = countries.map((country) => country?.name);
    const defaultCountryId = user?.countryId || 11;
    defaultCountry = countries.find(
      (country) => country.id == defaultCountryId
    )?.name;
  }

  const props = disabledInputs ? { disabled: true } : {};
  const inputProps = readOnlyInputs ? { readOnly: true } : {};

  function Account() {
    return (
      <StyledSubBox>
        <GroupBox label={"Cuenta"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__email"
                required
                fullWidth
                id="email"
                name="email"
                label="Correo"
                type="email"
                placeholder="Correo"
                variant="outlined"
                size="small"
                defaultValue={user?.email || ""}
                inputProps={{
                  ...inputProps,
                  maxLength: 36,
                }}
                {...props}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectBox
                className="usercard__role"
                id={"role"}
                name={"role"}
                options={{ user: "user", admin: "admin" }}
                label={"Rol"}
                size="small"
                defaultValue={user?.role ?? "user"}
                inputProps={{
                  ...inputProps,
                }}
                {...props}
              />
            </Grid>
            {!(disabledInputs || readOnlyInputs) && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="usercard__password"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Contraseña"
                    type={"password"}
                    placeholder="Contraseña"
                    variant="outlined"
                    size="small"
                    defaultValue={user?.password || ""}
                    inputProps={{
                      minLength: 6,
                      maxLength: 20,
                      ...inputProps,
                    }}
                    {...props}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="usercard__password"
                    required
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Repetir contraseña"
                    type={"password"}
                    placeholder="Repetir contraseña"
                    variant="outlined"
                    size="small"
                    defaultValue={user?.confirmPassword || ""}
                    inputProps={{
                      minLength: 6,
                      maxLength: 20,
                      ...inputProps,
                    }}
                    {...props}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </GroupBox>
      </StyledSubBox>
    );
  }

  function Personal() {
    return (
      <StyledSubBox>
        <GroupBox label={"Personal"}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__dni"
                required
                fullWidth
                id="dni"
                name="dni"
                label="DNI"
                placeholder="DNI"
                variant="outlined"
                size="small"
                defaultValue={user?.dni || ""}
                inputProps={{
                  minLength: 8,
                  ...inputProps,
                  maxLength: 36,
                }}
                {...props}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__firstname"
                required
                fullWidth
                id="firstname"
                name="firstname"
                label="Nombre"
                placeholder="Nombre"
                variant="outlined"
                size="small"
                defaultValue={user?.firstname || ""}
                inputProps={{
                  minLength: 3,
                  ...inputProps,
                  maxLength: 36,
                }}
                {...props}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__lastname"
                required
                fullWidth
                id="lastname"
                name="lastname"
                label="Apellido"
                placeholder="Apellido"
                variant="outlined"
                size="small"
                defaultValue={user?.lastname || ""}
                inputProps={{
                  minLength: 3,
                  ...inputProps,
                  maxLength: 36,
                }}
                {...props}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__description"
                required
                fullWidth
                id="description"
                name="description"
                label="Descripción"
                placeholder="Descripción"
                variant="outlined"
                size="small"
                defaultValue={user?.description || ""}
                inputProps={{
                  minLength: 3,
                  ...inputProps,
                  maxLength: 36,
                }}
                {...props}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {countriesOpitons && defaultCountry && (
                <SelectField
                  required
                  id={"countryName"}
                  name={"countryName"}
                  label={"Pais"}
                  size="small"
                  defaultValue={defaultCountry}
                  options={countriesOpitons}
                  {...inputProps}
                  {...props}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__phone"
                required
                fullWidth
                id="phone"
                name="phone"
                label="Teléfono"
                placeholder="Teléfono"
                variant="outlined"
                size="small"
                defaultValue={user?.phone || ""}
                inputProps={{
                  regex: /^(\+?[0-9]{3}) [0-9]{3} [0-9]{4}$/,
                  maxLength: 15,
                  minLength: 1,
                  ...inputProps,
                }}
                {...props}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className="usercard__address"
                required
                fullWidth
                id="address"
                name="address"
                label="Dirección"
                placeholder="Dirección"
                variant="outlined"
                size="small"
                defaultValue={user?.address || ""}
                inputProps={{
                  minLength: 3,
                  maxLength: 36,
                  ...inputProps,
                }}
                {...props}
              />
            </Grid>
          </Grid>
        </GroupBox>
      </StyledSubBox>
    );
  }

  return (
    <>
      <StyledBox
        component="section"
        className={"usercard__container"}
        {...props}
      >
        <Account />
        <Personal />
      </StyledBox>
    </>
  );
}
