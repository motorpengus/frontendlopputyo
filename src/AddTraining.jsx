// MUI-komponentit dialogia ja lomakekenttiä varten
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

// Komponentti, joka lisää uuden harjoituksen
export default function AddTraining({ customers, onAdd }) {
  // Dialogin aukiolo (true = näkyvissä)
  const [open, setOpen] = useState(false);

  // Harjoituksen tiedot tilassa
  const [training, setTraining] = useState({
    date: dayjs().toISOString(),  // Oletuksena nykyinen päivä ja aika
    duration: '',
    activity: '',
    customer: ''  // Täytetään asiakkaan href-linkillä
  });

  // Avaa dialogin
  const handleOpen = () => setOpen(true);

  // Sulkee dialogin
  const handleClose = () => setOpen(false);

  // Tallentaa uuden harjoituksen ja nollaa lomakkeen
  const handleSave = () => {
    onAdd(training); // Kutsutaan parent-komponentin tallennusfunktiota
    setTraining({ date: dayjs().toISOString(), duration: '', activity: '', customer: '' }); // Nollataan kentät
    handleClose(); // Suljetaan dialogi
  };

  return (
    <>
      {/* Painike, jolla lomake avataan */}
      <Button variant="contained" onClick={handleOpen}>Lisää harjoitus</Button>

      {/* Harjoituksen lisäyslomake dialogina */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi harjoitus</DialogTitle>

        <DialogContent>
          {/* Päivämäärän ja ajan syöttökenttä */}
          <TextField
            type="datetime-local"
            label="Päivämäärä ja aika"
            value={dayjs(training.date).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setTraining({ ...training, date: new Date(e.target.value).toISOString() })}
            fullWidth margin="dense"
          />

          {/* Kesto */}
          <TextField
            label="Kesto (min)"
            value={training.duration}
            onChange={(e) => setTraining({ ...training, duration: e.target.value })}
            fullWidth margin="dense"
          />

          {/* Aktiviteetti */}
          <TextField
            label="Aktiviteetti"
            value={training.activity}
            onChange={(e) => setTraining({ ...training, activity: e.target.value })}
            fullWidth margin="dense"
          />

          {/* Asiakkaan valinta dropdownista */}
          <TextField
            select
            label="Asiakas"
            value={training.customer}
            onChange={(e) => setTraining({ ...training, customer: e.target.value })}
            fullWidth margin="dense"
          >
            {customers.map((c, i) => (
              <MenuItem key={i} value={c._links.customer.href}>
                {c.firstname} {c.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        {/* Dialogin toimintonapit */}
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleSave} variant="contained">Tallenna</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
