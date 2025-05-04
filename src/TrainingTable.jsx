import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import dayjs from "dayjs";


ModuleRegistry.registerModules([AllCommunityModule]);

export function TrainingTable({ trainings, customers }) {
  const getCustomerName = (url) => {
    const id = url?.split('/').pop();
    const customer = customers.find(c => c.id.toString() === id);
    return customer ? `${customer.firstname} ${customer.lastname}` : '';
  };

  const colDefs = useMemo(() => [
    {
      field: "date",
      headerName: "Päivämäärä",
      valueFormatter: ({ value }) => dayjs(value).format("DD.MM.YYYY HH:mm"),
      sortable: true, filter: true,
    },
    { field: "activity", headerName: "Aktiviteetti", sortable: true, filter: true },
    { field: "duration", headerName: "Kesto (min)", sortable: true, filter: true },
    {
      headerName: "Asiakas",
      valueGetter: (params) => getCustomerName(params.data.customer),
    }
  ], [customers]);

  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Harjoitukset ({trainings.length})</Typography>
      <Box className="ag-theme-alpine" sx={{ height: 600, width: "100%" }}>
        <AgGridReact rowData={trainings} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}
