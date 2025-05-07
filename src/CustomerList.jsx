import { useEffect, useState } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "./customerApi";
import { CustomerTable } from "./CustomerTable";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

const CustomerList = () => {
  // Asiakaslista tilassa
  const [customers, setCustomers] = useState([]);

  // Tila muokattavalle asiakkaalle (null = ei näytetä muokkausdialogia)
  const [editCustomerData, setEditCustomerData] = useState(null);

  // Asiakkaiden haku API:sta
  const loadCustomers = () => {
    getCustomers()
      .then(setCustomers)
      .catch(err => console.error("Virhe asiakastietojen haussa:", err));
  };

  // Ladataan asiakkaat heti kun komponentti renderöidään
  useEffect(() => {
    loadCustomers();
  }, []);

  // Asiakkaan lisäys
  const handleAddCustomer = async (customer) => {
    await addCustomer(customer);
    loadCustomers(); // Päivitetään lista lisäyksen jälkeen
  };

  // Asiakkaan muokkaus
  const handleUpdateCustomer = async (customer, link) => {
    await updateCustomer(link, customer);
    loadCustomers(); // Päivitetään lista muokkauksen jälkeen
  };

  // Asiakkaan poisto
  const handleDeleteCustomer = async (link) => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan?")) {
      await deleteCustomer(link);
      loadCustomers(); // Päivitetään lista poiston jälkeen
    }
  };

  return (
    <>
      {/* Uuden asiakkaan lisäys */}
      <AddCustomer addCustomer={handleAddCustomer} />

      {/* Asiakastaulukko + muokkaus- ja poistotoiminnot */}
      <CustomerTable
        customers={customers}
        onEdit={(customer) => setEditCustomerData(customer)} // Avaa muokkausdialogin
        onDelete={handleDeleteCustomer} // Poistaa asiakkaan
      />

      {/* Muokkausdialogi näkyy vain kun asiakas on valittu muokattavaksi */}
      {editCustomerData && (
        <EditCustomer
          customer={editCustomerData}
          onSave={handleUpdateCustomer}
          onClose={() => setEditCustomerData(null)} // Sulkee dialogin
        />
      )}
    </>
  );
};

export default CustomerList;
