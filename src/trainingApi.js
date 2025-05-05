const TRAINING_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings';

export async function getTrainings() {
  const response = await fetch(TRAINING_URL);
  if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
  const data = await response.json();
  const trainings = data._embedded.trainings;

  return await Promise.all(
    trainings.map(async (training) => {
      try {
        const res = await fetch(training._links.customer.href);
        const customer = await res.json();
        return { ...training, customer };
      } catch {
        return { ...training, customer: null };
      }
    })
  );
}

export async function addTraining(training) {
  const res = await fetch(TRAINING_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(training)
  });
  if (!res.ok) throw new Error(`Add failed: ${res.status}`);
}

export async function deleteTraining(url) {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
}
