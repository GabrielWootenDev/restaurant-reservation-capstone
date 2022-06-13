import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import sortReservations from "../reservations/sortReservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
        const abortController = new AbortController();
        setReservationsError(null);
        try {
          const result = await listReservations(
            { date },
            abortController.signal
          );
          const sortedReservations = await sortReservations(result);
          setReservations(sortedReservations);
        } catch (error) {
          setReservationsError(error);
        }
        return () => abortController.abort();
      }
    loadDashboard()
  }, [date]);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        MAKE A TABLE WITH THIS FORMAT
        {reservations.map((reservation) => (
          <p>{reservation.first_name}</p>
        ))}
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
