import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { BillingsPayable } from "@/components/BIllings/BillingsPayable";
import { BillingsReceivable } from "@/components/BIllings/BillingsReceivable";
import { useState } from "react";
import { ActionType } from "@/utils/constants";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BillingsTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Cuentas por Cobrar" {...a11yProps(0)} />
          <Tab label="Cuentas por Pagar" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BillingsReceivable action={ActionType.LIST} params={{}} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BillingsPayable action={ActionType.LIST} params={{}} />
      </CustomTabPanel>
    </Box>
  );
}
