export async function getTrainings() {
    const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    const trainings = data._embedded.trainings;
  
    const enrichedTrainings = await Promise.all(
      trainings.map(async (training) => {
        const customerUrl = training._links.customer.href;
        try {
          const res = await fetch(customerUrl);
          if (!res.ok) throw new Error(`Customer fetch failed: ${res.status}`);
          const customerData = await res.json();
          return { ...training, customer: customerData };
        } catch (error) {
          console.error("Failed to fetch customer", error);
          return { ...training, customer: null };
        }
      })
    );
  
    return enrichedTrainings;
  }
  