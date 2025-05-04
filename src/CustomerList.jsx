import { useEffect, useState } from "react";
import { getCustomers } from "./customerApi";
import { CustomerTable } from "./CustomerTable";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(err => console.error("Virhe asiakastietojen haussa:", err));
  }, []);

  return <CustomerTable customers={customers} />;
};

export default CustomerList;
