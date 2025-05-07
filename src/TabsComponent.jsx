import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// TabsComponent hallinnoi välilehtien valintaa
function TabsComponent({ tabValue, setTabValue }) {
  return (
    // Tabs-komponentti näyttää aktiivisen välilehden arvon ja vaihtaa sitä setTabValue-funktiolla
    <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
      {/* Välilehdet: asiakas- ja harjoitusnäkymät */}
      <Tab label="Customer" />
      <Tab label="Training" />
    </Tabs>
  );
}

export default TabsComponent;
