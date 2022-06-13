import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";


//submit button needs to be altered to show dashboard at the date of the new reservation

function NewReservation() {
  const [error, setError] = useState(null)

  return (
    <>
    <ErrorAlert error={error} />
    <h3 className="">Create a reservation</h3>
    <ReservationForm setError={setError} />
    </>
  );
}

export default NewReservation;
