import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";


function NewReservation({setDate}) {
  const [error, setError] = useState(null)

  return (
    <>
    <ErrorAlert error={error} />
    <h3>Create a reservation</h3>
    <ReservationForm setDate={setDate} setError={setError} />
    </>
  );
}

export default NewReservation;
