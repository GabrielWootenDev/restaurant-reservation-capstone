import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listOpenTables } from "../utils/api";

function SeatReservation() {
  const [openTables, setOpenTables] = useState([]);
  const reservationId = useParams().reservation_id;

  // create change handler and submit handler
  // create table from state for dashboard
  useEffect(() => {
    async function loadOpenTables() {
      const abortController = new AbortController();
      const result = await listOpenTables(abortController.signal);
      setOpenTables(result);
      return () => abortController.abort();
    }
    loadOpenTables();
  }, []);

  return (
    <>
      <form className="d-flex flex-column container fluid justify-content-center col-md-5">
        <div className="form-group">
          <h1 className="h1 text-center">
            Select Table for Reservation #{reservationId}
          </h1>
          <select className="form-control" name="table_id">
            <option>Choose a table...</option>
            {openTables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            ))}
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
