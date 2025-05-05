import { useEffect, useState } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "./customerApi";
import { CustomerTable } from "./CustomerTable";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomerData, setEditCustomerData] = useState(null);

  const loadCustomers = () => {
    getCustomers()
      .then(setCustomers)
      .catch(err => console.error("Virhe asiakastietojen haussa:", err));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAddCustomer = async (customer) => {
    await addCustomer(customer);
    loadCustomers();
  };

  const handleUpdateCustomer = async (customer, link) => {
    await updateCustomer(customer, link);
    loadCustomers();
  };

  const handleDeleteCustomer = async (link) => {
    if (window.confirm("Haluatko varmasti poistaa asiakkaan?")) {
      await deleteCustomer(link);
      loadCustomers();
    }
  };

  return (
    <>
      <AddCustomer addCustomer={handleAddCustomer} />
      <CustomerTable
        customers={customers}
        onEdit={(customer) => setEditCustomerData(customer)}
        onDelete={handleDeleteCustomer}
      />
      {editCustomerData && (
        <EditCustomer
          customer={editCustomerData}
          onSave={handleUpdateCustomer}
          onClose={() => setEditCustomerData(null)}
        />
      )}
    </>
  );
};

export default CustomerList;
