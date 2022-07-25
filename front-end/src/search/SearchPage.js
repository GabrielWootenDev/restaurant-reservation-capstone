import React, { useState } from "react";
import ReservationsTable from "../dashboard/ReservationsTable";
import SearchForm from "./SearchForm";
import { listReservations } from "../utils/api";

function SearchPage() {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [foundReservations, setFoundReservations] = useState(null);

  const handleChange = ({ target }) => {
    const { value } = target;
    setMobileNumber({ mobile_number: value });
  };

  const submitSearch = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const results = await listReservations(
        mobileNumber,
        abortController.signal
      );
      setFoundReservations(results);
    } catch (error) {
      console.log(error);
    }

    return () => abortController.abort();
  };

  return (
    <>
      <SearchForm handleChange={handleChange} submitSearch={submitSearch} />
      {foundReservations && foundReservations.length > 0 && (
        <ReservationsTable reservations={foundReservations} />
      )}
      {foundReservations && foundReservations.length === 0 && (
        <h3 className="text-center">"No reservations found"</h3>
      )}
    </>
  );
}

export default SearchPage;
