import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "./ReservationsTable";
import DashboardNav from "./DashboardNav";
import SeatingTable from "./SeatingTable";
import {
  listReservations,
  listTables,
  unseatTable,
} from "../utils/api";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import sortReservations from "../reservations/sortReservations";
import { useHistory } from "react-router";
import { handleCancellation } from "../reservations/handleCancellation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const [date, setDate] = useState(today());
  const query = useQuery();
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    function checkQuery() {
      const dateQuery = query.get("date");
      dateQuery && setDate(dateQuery);
    }
    checkQuery();
  }, [query, date]);

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      const result = await listTables(abortController.signal);
      setTables(() => result);

      return () => abortController.abort();
    }

    loadTables();
  }, []);

  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError([]);
      try {
        const result = await listReservations({ date }, abortController.signal);
        const sortedReservations = await sortReservations(result);
        setReservations(() => sortedReservations);
      } catch (error) {
        setReservationsError(() => [error]);
      }
      return () => abortController.abort();
    }
    loadDashboard();
  }, [date, reservations.length]);

  async function finishTable(tableId) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await unseatTable(tableId);
      history.go(0);
    }
  }


  return (
    <main className="container-fluid p-0">
      <ErrorAlert error={reservationsError} />
      <h1 className="d-flex justify-content-center">Dashboard</h1>
      <DashboardNav history={history} date={date} />
      <div>
        {reservations.length !== 0 ? (
          <ReservationsTable
            reservations={reservations}
            handleCancellation={handleCancellation}
            history={history}
          />
        ) : (
          <h3 className="text-center">No Reservations Found</h3>
        )}
        <SeatingTable tables={tables} finishTable={finishTable} />
      </div>
    </main>
  );
}

export default Dashboard;
