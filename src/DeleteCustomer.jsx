import { Button } from "@mui/material";

export default function DeleteCustomer({ deleteCustomer }) {
  const handleDelete = () => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan?")) {
      deleteCustomer();
    }
  };

  return <Button size="small" color="error" onClick={handleDelete}>Poista</Button>;
}
