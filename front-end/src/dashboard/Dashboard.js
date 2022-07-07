import React from "react";
import "./Dashboard.css";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "./ReservationsTable";
import DashboardNav from "./DashboardNav";
import SeatingTable from "./SeatingTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */


function Dashboard({ date, setDate, reservations, reservationsError, tables}) {

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
