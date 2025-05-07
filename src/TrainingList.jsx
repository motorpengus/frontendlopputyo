import { useEffect, useState } from "react";
import { getTrainings, addTraining, deleteTraining } from "./trainingApi";
import { getCustomers } from "./customerApi"; 
import AddTraining from "./AddTraining";
import { TrainingTable } from "./TrainingTable"; 

export default function TrainingList() {
  // 💡 Käytämme kahta tilaa: yksi treenien ja toinen asiakkaiden tallentamiseen
  const [trainings, setTrainings] = useState([]); // Harjoitusten tilaa
  const [customers, setCustomers] = useState([]); // Asiakkaiden tilaa

  // 💡 Funktio datan hakemiseksi
  const loadData = () => {
    // Haetaan sekä harjoitukset että asiakkaat API:sta
    getTrainings()
      .then(setTrainings) // Tallennetaan treenit tilaan
      .catch(console.error); // Virheenkäsittely
    getCustomers()
      .then(setCustomers) // Tallennetaan asiakkaat tilaan
      .catch(console.error); // Virheenkäsittely
  };

  // 💡 useEffect hook, joka lataa datan komponentin ensimmäisen renderöinnin jälkeen
  useEffect(() => {
    loadData(); // Lataa treenit ja asiakkaat
  }, []); // Tyhjä taulukko tarkoittaa, että tämä ajetaan vain kerran, kun komponentti ladattu

  // 💡 Funktio uuden harjoituksen lisäämiseksi
  const handleAddTraining = async (training) => {
    await addTraining(training); // Lisätään uusi harjoitus
    loadData(); // Päivitetään harjoitusten lista
  };

  // 💡 Funktio harjoituksen poistamiseksi
  const handleDeleteTraining = async (url) => {
    await deleteTraining(url); // Poistetaan harjoitus
    loadData(); // Päivitetään harjoitusten lista
  };

  return (
    <>
      {/* Lisää uusi harjoitus */}
      <AddTraining customers={customers} onAdd={handleAddTraining} />
      
      {/* Näytetään harjoitusten taulukko */}
      <TrainingTable trainings={trainings} onDelete={handleDeleteTraining} />
    </>
  );
}
