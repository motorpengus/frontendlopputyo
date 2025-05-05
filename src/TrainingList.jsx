import { useEffect, useState } from "react";
import { getTrainings, addTraining, deleteTraining } from "./trainingApi";
import { getCustomers } from "./customerApi";
import AddTraining from "./AddTraining";
import { TrainingTable } from "./TrainingTable";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);

  const loadData = () => {
    getTrainings().then(setTrainings).catch(console.error);
    getCustomers().then(setCustomers).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTraining = async (training) => {
    await addTraining(training);
    loadData();
  };

  const handleDeleteTraining = async (url) => {
    await deleteTraining(url);
    loadData();
  };

  return (
    <>
      <AddTraining customers={customers} onAdd={handleAddTraining} />
      <TrainingTable trainings={trainings} onDelete={handleDeleteTraining} />
    </>
  );
}
