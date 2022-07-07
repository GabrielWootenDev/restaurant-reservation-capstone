import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listOpenTables, readReservation } from "../utils/api";

function SeatReservation() {
  const [openTables, setOpenTables] = useState([]);
  const [reservation, setReservation] = useState([]);
  const initialFormState = {
    table_id: null,
  };
  const [formData, setFormData] = useState(initialFormState);

  const reservationId = useParams().reservation_id;

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      const result = await readReservation(reservationId);
      setReservation(result);
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservationId]);

  //submit handler
  useEffect(() => {
    async function loadOpenTables() {
      const abortController = new AbortController();
      const result = await listOpenTables(abortController.signal);
      setOpenTables(result);
      return () => abortController.abort();
    }
    loadOpenTables();
  }, []);

  const changeHandler = ({ target }) => {
    const { value, name } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const tableList = openTables.map((table) => {
    const overCapacity = Number(table.capacity) < Number(reservation.people);
    return (
      <option
        disabled={overCapacity}
        key={table.table_id}
        value={table.table_id}
      >
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <>
      <form className="d-flex flex-column container fluid justify-content-center col-md-5">
        <div className="form-group">
          <h1 className="h1 text-center">
            Select Table for {reservation.last_name} party of {reservation.people}
          </h1>
          <select
            className="form-control"
            name="table_id"
            onChange={changeHandler}
          >
            <option>Choose a table...</option>
            {tableList}
          </select>
        </div>
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <button type="button" className="btn btn-secondary m-2">
          Cancel
        </button>
      </form>
    </>
  );
}

export default SeatReservation;
