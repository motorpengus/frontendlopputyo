import { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Stack, Typography } from "@mui/material";
import { getTrainings } from "./trainingApi";
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings()
      .then(data => setTrainings(data))
      .catch(err => console.error("Training fetch failed", err));
  }, []);

  const colDefs = useMemo(() => [
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm")
    },
    { headerName: "Duration (min)", field: "duration" },
    { headerName: "Activity", field: "activity" },
    {
      headerName: "Customer",
      valueGetter: (params) => {
        const customer = params.data.customer;
        return customer ? `${customer.firstname} ${customer.lastname}` : "Unknown";
      }
    }
  ], []);

  return (
    <Stack sx={{ flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Trainings ({trainings.length})</Typography>
      <Box sx={{ flexGrow: 1, width: "100%", height: 500 }}>
        <AgGridReact rowData={trainings} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}
