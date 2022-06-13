import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import sortReservations from "../reservations/sortReservations";
import ReservationsTable from "./ReservationsTable";
import { today, previous, next } from "../utils/date-time";
import "./Dashboard.css"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      try {
        const result = await listReservations({ date }, abortController.signal);
        const sortedReservations = await sortReservations(result);
        setReservations(sortedReservations);
      } catch (error) {
        setReservationsError(error);
      }
      return () => abortController.abort();
    }
    loadDashboard();
  }, [date]);
  // fix centering for mid-small view
  return (
    <main className="container-fluid p-0">
      <ErrorAlert error={reservationsError} />
      <h1 className="d-flex justify-content-center">Dashboard</h1>
      <div className="d-sm-flex col mb-3">
        <div className="col p-0">
        <h4 className="d-flex-fill mb-0 p-2 justify-content-sm-center-lg-left ">Reservations for {date}</h4>
        </div>
        <div className="d-flex-fill p-0 justify-content-end">
        <button
          type="button"
          className="btn btn-secondary mx-2"
          onClick={() => setDate(previous(date))}
        >
          Previous Day
        </button>
        <button
          type="button"
          className="btn btn-dark mx-2"
          onClick={() => setDate(next(date))}
        >
          Next Day
        </button>
        <button
          type="button"
          className="btn btn-info mx-2"
          onClick={() => setDate(today())}
        >
          Today
        </button>
        </div>
      </div>
      <ReservationsTable reservations={reservations} />
    </main>
  );
}

export default Dashboard;
