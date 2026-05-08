import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import InputBase from "@mui/material/InputBase";
import SelectField from "../SelectField";
import { CheckField } from "../common/CheckField";

export default function CustomerCard({
  customer,
  title,
  disabledInputs,
  readOnlyInputs,
  countries = [],
  jobs = [],
}) {
  const theme = useTheme();
  const initialState = {
    id: "",
    dni: "",
    countryId: "1",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    jobId: "1",
    description: "",
    userId: "",
    creationAt: "",
    updatedAt: "",
  };
  const [values, setValues] = useState({ ...initialState, ...customer });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  let countriesOpitons;
  let defaultCountry;

  if (countries && countries.length) {
    countriesOpitons = countries.map((country) => country?.name);
    const defaultCountryId = values?.countryId || 11;
    defaultCountry = countries.find(
      (country) => country.id == defaultCountryId
    )?.name;
  }

  let jobsOpitons;
  let defaultJob;

  if (jobs && jobs.length) {
    jobsOpitons = jobs.map((job) => job?.name);
    const defaultJobId = values?.jobId || 91;
    defaultJob = jobs.find((job) => job.id == defaultJobId)?.name;
  }

  const props = disabledInputs ? { disabled: true } : {};
  const inputProps = readOnlyInputs ? { readOnly: true } : {};

  return (
    <Paper
      sx={{
        maxWidth: "400px",
        "& .MuiTextField-root": {
          m: 0.8,
        },
        "& .MuiTextField-root input:invalid": {
          borderBottom: `2px solid ${theme.palette.error.dark}`,
          color: theme.palette.error.dark,
        },
      }}
    >
      <Box component="header" sx={{ paddingTop: 1 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Stack>
        <Divider />
      </Box>
      <Box
        sx={{
          padding: "8px 21px 8px 8px",
        }}
      >
        <InputBase
          id="id"
          name="id"
          value={values?.id || ""}
          type="hidden"
          sx={{ display: "none" }}
        />
        <InputBase
          id="userId"
          name="userId"
          value={values?.id || ""}
          type="hidden"
          sx={{ display: "none" }}
        />
        <TextField
          required
          fullWidth
          id="dni"
          name="dni"
          placeholder="DNI"
          type="number"
          variant="outlined"
          size="small"
          label={"DNI"}
          value={values?.dni || ""}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            max: 999999999,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="firstname"
          name="firstname"
          label="Nombre"
          variant="outlined"
          size="small"
          value={values?.firstname}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 20,
            minLength: 1,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="lastname"
          name="lastname"
          label="Apellido"
          variant="outlined"
          size="small"
          value={values?.lastname}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 15,
          }}
          {...props}
        />
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

        <TextField
          fullWidth
          required
          id="phone"
          name="phone"
          type="tel"
          label="Telefono"
          variant="outlined"
          size="small"
          value={values?.phone}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            regex: /^(\+?[0-9]{3}) [0-9]{3} [0-9]{4}$/,
            maxLength: 15,
            minLength: 1,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="E-Mail"
          type="email"
          variant="outlined"
          size="small"
          value={values?.email}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 255,
            minLength: 3,
          }}
          {...props}
        />
        <TextField
          fullWidth
          required
          id="address"
          name="address"
          label="Dirección"
          variant="outlined"
          size="small"
          multiline
          value={values?.address}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 255,
          }}
          {...props}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Descripción"
          variant="outlined"
          size="small"
          multiline
          maxRows={3}
          value={values?.description}
          onChange={handleChange}
          inputProps={{
            ...inputProps,
            maxLength: 255,
          }}
          {...props}
        />
        {jobsOpitons && jobsOpitons.length && (
          <>
            <SelectField
              required
              id={"jobName"}
              name={"jobName"}
              label={"Trabajo"}
              size="small"
              defaultValue={defaultJob}
              options={jobsOpitons}
              {...inputProps}
              {...props}
            />
          </>
        )}
        <CheckField
          label="Proveedor"
          id="partnerType"
          name="partnerType"
          defaultValue={false}
          labelPlacement={"end"}
          sx={{ marginLeft: 0 }}
        />
      </Box>
    </Paper>
  );
}
