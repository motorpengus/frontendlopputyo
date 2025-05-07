// Materiaalikomponentit (dialogi, kentät, napit)
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function AddCustomer({ addCustomer }) {
  // Dialogin aukiolo (true = avoinna)
  const [open, setOpen] = useState(false);

  // Asiakkaan tiedot tilassa – lomakekenttien arvoina
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  });

  // Avaa dialogin
  const handleOpen = () => setOpen(true);
  
  // Sulkee dialogin
  const handleClose = () => setOpen(false);

  // Tallentaa uuden asiakkaan ja sulkee dialogin
  const handleSave = () => {
    addCustomer(customer);     // Kutsutaan parent-komponentin funktiota
    handleClose();             // Suljetaan lomake
  };

  return (
    <>
      {/* Painike, joka avaa lisäyslomakkeen */}
      <Button variant="contained" onClick={handleOpen}>Lisää asiakas</Button>

      {/* Dialogi (popup-lomake) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi asiakas</DialogTitle>

        {/* Lomakkeen sisältö: luodaan kenttä jokaista customer-olion kenttää varten */}
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(customer).map(([key, value]) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}  // Muotoillaan kentän otsikko
              value={value}
              onChange={(e) => setCustomer({ ...customer, [key]: e.target.value })} // Päivitetään kenttäkohtainen arvo
            />
          ))}
        </DialogContent>

        {/* Napit lomakkeen alareunassa */}
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleSave}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
