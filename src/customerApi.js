const API_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers';

// 1. Hae kaikki asiakkaat
export async function getCustomers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data._embedded.customers;
}

// 2. Lisää uusi asiakas
export async function addCustomer(customer) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  if (!response.ok) {
    throw new Error(`Add failed: ${response.status}`);
  }
}

// 3. Päivitä asiakas (ottaa asiakkaan urlin mukaan)
export async function updateCustomer(url, customer) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  if (!response.ok) {
    throw new Error(`Update failed: ${response.status}`);
  }
}

// 4. Poista asiakas
export async function deleteCustomer(url) {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
}
