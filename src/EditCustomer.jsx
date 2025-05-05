import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function EditCustomer({ customer, onSave, onClose }) {
  const [edited, setEdited] = useState({ ...customer });

  useEffect(() => {
    setEdited({ ...customer });
  }, [customer]);

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const url = customer._links.customer.href;
    onSave(url, edited);
    onClose();
  };

  return (
    <Dialog open={Boolean(customer)} onClose={onClose}>
      <DialogTitle>Muokkaa asiakasta</DialogTitle>
      <DialogContent>
        <TextField name="firstname" label="Etunimi" value={edited.firstname || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="lastname" label="Sukunimi" value={edited.lastname || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="email" label="Sähköposti" value={edited.email || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="phone" label="Puhelin" value={edited.phone || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="streetaddress" label="Osoite" value={edited.streetaddress || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="postcode" label="Postinumero" value={edited.postcode || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="city" label="Kaupunki" value={edited.city || ''} onChange={handleChange} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Peruuta</Button>
        <Button onClick={handleSave} variant="contained">Tallenna</Button>
      </DialogActions>
    </Dialog>
  );
}
