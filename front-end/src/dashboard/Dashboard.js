import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import sortReservations from "../reservations/sortReservations";
import ReservationsTable from "./ReservationsTable";
import DashboardNav from "./DashboardNav";
import SeatingTable from "./SeatingTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

//replace tables array after backend and database is created

function Dashboard({ date, setDate}) {
  const tables = [
    {
      table_id: 1,
      table_name: "Bar #1",
      table_status: "Available",
    },
  ];
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
  return (
    <main className="container-fluid p-0">
      <ErrorAlert error={reservationsError} />
      <h1 className="d-flex justify-content-center">Dashboard</h1>
      <DashboardNav date={date} setDate={setDate} />
      <div className="d-md-flex col-md p-0">
        <ReservationsTable reservations={reservations} />
        <SeatingTable tables={tables} />
      </div>
    </main>
  );
}

export default Dashboard;
