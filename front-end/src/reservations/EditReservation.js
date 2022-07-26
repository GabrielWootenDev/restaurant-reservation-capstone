import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../utils/api";

function EditReservation() {
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      try {
        const result = await readReservation(reservation_id, abortController.signal);
        setReservation(() => result);
      } catch (error) {
        console.log(error);
      }
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservation_id]);

  return (
    <>
      <p>{reservation.reservation_id}</p>
      <p>{reservation.first_name}</p>
    </>
  );
}

export default EditReservation;
