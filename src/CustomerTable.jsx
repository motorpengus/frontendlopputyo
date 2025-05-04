import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";


ModuleRegistry.registerModules([AllCommunityModule]);

export function CustomerTable({ customers }) {
  // Määritellään sarakkeet muistissa, jotta niitä ei lasketa uudelleen jokaisella renderöinnillä
  const colDefs = useMemo(() => [
    { field: "firstname", headerName: "Etunimi", sortable: true, filter: true },
    { field: "lastname", headerName: "Sukunimi", sortable: true, filter: true },
    { field: "email", headerName: "Sähköposti", sortable: true, filter: true },
    { field: "phone", headerName: "Puhelin", sortable: true, filter: true },
    { field: "streetaddress", headerName: "Osoite", sortable: true, filter: true },
    { field: "postcode", headerName: "Postinumero",sortable: true, filter: true },
    { field: "city", headerName: "Kaupunki",sortable: true, filter: true },
  ], []);

  return (
    <Stack
      sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}
    >
      {/* Näytetään otsikko ja asiakasmäärä */}
      <Typography variant="h6">Asiakkaat ({customers.length})</Typography>

      {/* AG Grid -taulukko asiakkaista */}
      <Box className="ag-theme-alpine" sx={{ height: 600, width: "100%" }}>
        <AgGridReact rowData={customers} columnDefs={colDefs} />
      </Box>
    </Stack>
  );
}
