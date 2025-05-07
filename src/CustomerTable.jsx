import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useMemo } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

// Komponentti saa propsit: customers (taulukko), onEdit (funktio), onDelete (funktio)
export function CustomerTable({ customers, onEdit, onDelete }) {

  // Sarakkeiden määrittely muistissa (useMemo parantaa suorituskykyä)
  const colDefs = useMemo(() => [
    { field: "firstname", headerName: "Etunimi", sortable: true, filter: true },
    { field: "lastname", headerName: "Sukunimi", sortable: true, filter: true },
    { field: "email", headerName: "Sähköposti", sortable: true, filter: true },
    { field: "phone", headerName: "Puhelin", sortable: true, filter: true },
    { field: "streetaddress", headerName: "Osoite", sortable: true, filter: true },
    { field: "postcode", headerName: "Postinumero", sortable: true, filter: true },
    { field: "city", headerName: "Kaupunki", sortable: true, filter: true },

    // Toimintapainikkeet (muokkaa ja poista)
    {
      headerName: "Toiminnot",
      cellRenderer: (params) => (
        <>
          <Button size="small" onClick={() => onEdit(params.data)}>Muokkaa</Button>
          <Button
            size="small"
            color="error"
            onClick={() => onDelete(params.data._links.customer.href)}
          >
            Poista
          </Button>
        </>
      )
    }
  ], [onEdit, onDelete]); // riippuvuudet: päivittyy vain jos funktiot vaihtuvat

  return (
    <Stack sx={{ flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      {/* Otsikko ja asiakkaiden määrä */}
      <Typography variant="h6">Asiakkaat ({customers.length})</Typography>

      {/* AG Grid -taulukko */}
      <Box className="ag-theme-alpine" sx={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={customers} // rivit
          columnDefs={colDefs} // sarakkeet
        />
      </Box>
    </Stack>
  );
}
