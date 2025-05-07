import { Button } from "@mui/material";

// Komponentti saa propina deleteCustomer-funktion, joka suorittaa varsinaisen poiston
export default function DeleteCustomer({ deleteCustomer }) {

  // Kun käyttäjä painaa nappia, kysytään varmistus ennen poistoa
  const handleDelete = () => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan?")) {
      deleteCustomer(); // Suoritetaan poisto, jos käyttäjä vahvistaa
    }
  };

  // Poista-nappi (pieni ja punainen väritykseltään)
  return (
    <Button size="small" color="error" onClick={handleDelete}>
      Poista
    </Button>
  );
}
