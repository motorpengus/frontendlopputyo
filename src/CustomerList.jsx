import { useEffect, useState } from "react";
import { getCustomers } from "./customerApi";
import { CustomerTable } from "./CustomerTable";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  // Haetaan asiakastiedot kun komponentti latautuu
  useEffect(() => {
    getCustomers()
      .then(setCustomers) // Tallennetaan asiakkaat tilaan
      .catch(err => console.error("Virhe asiakastietojen haussa:", err)); // Tulostetaan virhe konsoliin
  }, []);

  // Näytetään asiakastaulukko
  return <CustomerTable customers={customers} />;
};

export default CustomerList;
