import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useMemo } from "react";
import dayjs from "dayjs";

ModuleRegistry.registerModules([AllCommunityModule]);

export function TrainingTable({ trainings, onDelete }) {
  const colDefs = useMemo(() => [
    {
      headerName: "Päivämäärä",
      field: "date",
      valueFormatter: ({ value }) => dayjs(value).format("DD.MM.YYYY HH:mm"),
      sortable: true,
      filter: true
    },
    {
      headerName: "Kesto (min)",
      field: "duration",
      sortable: true,
      filter: true
    },
    {
      headerName: "Aktiviteetti",
      field: "activity",
      sortable: true,
      filter: true
    },
    {
      headerName: "Asiakas",
      valueGetter: ({ data }) => data.customer ? `${data.customer.firstname} ${data.customer.lastname}` : '',
      sortable: true,
      filter: true
    },
    {
      headerName: "Toiminnot",
      cellRenderer: (params) => (
        <Button size="small" color="error" onClick={() => onDelete(params.data._links.training.href)}>Poista</Button>
      )
    }
  ], [onDelete]);

  return (
    <Stack sx={{ flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Harjoitukset ({trainings.length})</Typography>
      <Box className="ag-theme-alpine" sx={{ height: 600, width: "100%" }}>
        <AgGridReact rowData={trainings} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}
