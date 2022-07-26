import React, { useState } from "react";
import { useHistory } from "react-router";
import ReservationsTable from "../dashboard/ReservationsTable";
import SearchForm from "./SearchForm";
import { listReservations } from "../utils/api";
import { handleCancellation } from "../reservations/handleCancellation";
import ErrorAlert from "../layout/ErrorAlert";

function SearchPage() {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [foundReservations, setFoundReservations] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { value } = target;
    setMobileNumber({ mobile_number: value });
  };

  const submitSearch = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    //when submitted this form fetchs reservations from the API with mobile_numbers matching the number enterered;
    try {
      const results = await listReservations(
        mobileNumber,
        abortController.signal
      );
      //sets the results of the API fetch as foundReservations in state
      setFoundReservations(results);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }

    return () => abortController.abort();
  };

  return (
    <>
      <SearchForm handleChange={handleChange} submitSearch={submitSearch} />
      <ErrorAlert error={error} />
      {foundReservations && foundReservations.length > 0 && (
        <ReservationsTable
          reservations={foundReservations}
          handleCancellation={handleCancellation}
          history={history}
        />
      )}
      {
        //if foundReservations is not null (not initial page render) and it's array is empty this is displayed, only displayed after a search
        foundReservations && foundReservations.length === 0 && (
          <h3 className="text-center">"No reservations found"</h3>
        )
      }
    </>
  );
}

export default SearchPage;
