import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabsComponent({ tabValue, setTabValue }) {
  return (
    <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
      <Tab label="Customer" />
      <Tab label="Training" />
    </Tabs>
  );
}

export default TabsComponent;