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

function NewReservation() {
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
    const mobileNumber = formData.mobile_number.replaceAll(/[^0-9]/g, "");
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
            mobile_number: `${mobileNumber[0]}${mobileNumber[1]}${mobileNumber[2]}-${mobileNumber[3]}${mobileNumber[4]}${mobileNumber[5]}-${mobileNumber[6]}${mobileNumber[7]}${mobileNumber[8]}${mobileNumber[9]}`,
          },
          abortController.signal
        );
        history.push(`/dashboard?date=${reservationDate}`);
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
