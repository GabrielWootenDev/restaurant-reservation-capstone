import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listOpenTables, readReservation, seatTable} from "../utils/api";

function SeatReservation() {
  const [openTables, setOpenTables] = useState([]);
  const [reservation, setReservation] = useState([]);
  const history = useHistory();
  const initialFormState = {
    table_id: null,
    reservation_id: null,
    status: "seated"
  };
  const [formData, setFormData] = useState(initialFormState);

  const reservationId = useParams().reservation_id;

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      const result = await readReservation(
        reservationId,
        abortController.signal
      );
      setReservation(result);
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservationId]);

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
      reservation_id: reservationId,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    await seatTable(formData, abortController.signal);
    history.push("/reservations");
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
      <form
        className="d-flex flex-column container fluid justify-content-center col-md-5"
        onSubmit={submitHandler}
      >
        <div className="form-group">
          <h1 className="h1 text-center">
            Select Table for {reservation.last_name} party of{" "}
            {reservation.people}
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
