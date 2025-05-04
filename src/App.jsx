import { useState } from "react";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabsComponent from "./TabsComponent";
import CustomerList from "./CustomerList";
import TrainingList from "./TrainingList";

function App() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Trainer App</Typography>
        </Toolbar>
      </AppBar>

      <TabsComponent tabValue={tabValue} setTabValue={setTabValue} />

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {tabValue === 0 && <CustomerList />}
        {tabValue === 1 && <TrainingList />}
      </Box>
    </Box>
  );
}

export default App;
