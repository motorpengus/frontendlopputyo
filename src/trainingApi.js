const TRAINING_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings';

// Hae kaikki harjoitukset ja liitä mukaan asiakastiedot
export async function getTrainings() {
  const response = await fetch(TRAINING_URL);
  if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

  const data = await response.json();
  const trainings = data._embedded.trainings;

  // Käy jokainen harjoitus läpi ja hae sen asiakastiedot
  return await Promise.all(
    trainings.map(async (training) => {
      try {
        const res = await fetch(training._links.customer.href); // Asiakkaan URL
        const customer = await res.json(); // Asiakkaan tiedot
        return { ...training, customer }; // Yhdistetään harjoitus + asiakas
      } catch {
        return { ...training, customer: null }; // Jos asiakasta ei saada
      }
    })
  );
}

// Lisää uusi harjoitus
export async function addTraining(training) {
  const res = await fetch(TRAINING_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(training) // Lähetä harjoitustiedot JSON-muodossa
  });
  if (!res.ok) throw new Error(`Add failed: ${res.status}`);
}

// Poista harjoitus annetun URL:n perusteella
export async function deleteTraining(url) {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
}
