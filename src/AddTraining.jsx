import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

export default function AddTraining({ customers, onAdd }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: dayjs().toISOString(),
    duration: '',
    activity: '',
    customer: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    onAdd(training);
    setTraining({ date: dayjs().toISOString(), duration: '', activity: '', customer: '' });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>Lisää harjoitus</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi harjoitus</DialogTitle>
        <DialogContent>
          <TextField
            type="datetime-local"
            label="Päivämäärä ja aika"
            value={dayjs(training.date).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setTraining({ ...training, date: new Date(e.target.value).toISOString() })}
            fullWidth margin="dense"
          />
          <TextField
            label="Kesto (min)"
            value={training.duration}
            onChange={(e) => setTraining({ ...training, duration: e.target.value })}
            fullWidth margin="dense"
          />
          <TextField
            label="Aktiviteetti"
            value={training.activity}
            onChange={(e) => setTraining({ ...training, activity: e.target.value })}
            fullWidth margin="dense"
          />
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
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleSave} variant="contained">Tallenna</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
