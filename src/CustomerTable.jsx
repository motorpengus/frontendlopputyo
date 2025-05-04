import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";


ModuleRegistry.registerModules([AllCommunityModule]);

export function CustomerTable({ customers }) {
  const colDefs = useMemo(() => [
    { field: "firstname", headerName: "Etunimi", sortable: true, filter: true },
    { field: "lastname", headerName: "Sukunimi", sortable: true, filter: true },
    { field: "email", headerName: "Sähköposti", sortable: true, filter: true },
    { field: "phone", headerName: "Puhelin", sortable: true, filter: true },
    { field: "streetaddress", headerName: "Osoite" },
    { field: "postcode", headerName: "Postinumero" },
    { field: "city", headerName: "Kaupunki" },
  ], []);

  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Asiakkaat ({customers.length})</Typography>
      <Box className="ag-theme-alpine" sx={{ height: 600, width: "100%" }}>
        <AgGridReact rowData={customers} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}
