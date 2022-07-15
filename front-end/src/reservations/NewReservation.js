import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import { formatAsDate, formatAsTime } from "../utils/date-time";
import {
  isOpenHours,
  isDatePast,
  isTimePast,
  isTuesday,
} from "./reservationValidation";
import { today } from "../utils/date-time";

function NewReservation({ setDate }) {
  const [error, setError] = useState([]);

  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  //when anything is input into either field the value is stored in formData state and that input value changes to the same as the form with the based on the target key.

  const handleChange = ({ target }) => {
    const { type, value, name } = target;
    setFormData({
      ...formData,
      ...(type === "number" && { [name]: Number(value) }),
      ...(type === "date" &&
        name === "reservation_date" && { [name]: formatAsDate(value) }),
      ...(type === "time" &&
        name === "reservation_time" && { [name]: formatAsTime(value) }),
      ...((type === "text" || type === "tel") && { [name]: value }),
    });
  };
  //handleSubmit this will create a new reservation then render the dashboard with useHistory,

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const day = today();
    const newErrors = [];
    newErrors.splice();
    setError(() => [...newErrors]);
    const reservationDate = formatAsDate(formData.reservation_date);
    const reservationTime = formatAsTime(formData.reservation_time);
    try {
      isOpenHours(reservationTime);
    } catch (err) {
      newErrors.push(err);
    }
    try {
      isDatePast(reservationDate, reservationTime, day);
    } catch (err) {
      newErrors.push(err);
    }
    try {
      isTimePast(reservationDate, reservationTime);
    } catch (err) {
      newErrors.push(err);
    }
    try {
      isTuesday(reservationDate, reservationTime);
    } catch (err) {
      newErrors.push(err);
    }
    setError(() => [...newErrors]);

    if (newErrors.length <= 0) {
      try {
        await createReservation(
          {
            ...formData,
            mobile_number: `${formData.mobile_number[0]}${formData.mobile_number[1]}${formData.mobile_number[2]}-${formData.mobile_number[3]}${formData.mobile_number[4]}${formData.mobile_number[5]}-${formData.mobile_number[6]}${formData.mobile_number[7]}${formData.mobile_number[8]}${formData.mobile_number[9]}`,
          },
          abortController.signal
        );
        setDate(formData.reservation_date);
        history.push(`/`);
      } catch (err) {
        setError(() => [error]);
      }
    }
  };

  const handleCancel = (event) => {
    setFormData({ ...initialFormState });
    history.goBack();
  };

  return (
    <>
      <div>
        <ErrorAlert error={error} />
      </div>
      <div>
        <h3>Create a reservation</h3>
        <ReservationForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCancel={handleCancel}
          formData={formData}
        />
      </div>
    </>
  );
}

export default NewReservation;
