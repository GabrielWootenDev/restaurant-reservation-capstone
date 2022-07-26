import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { createReservation, readReservation, updateReservation } from "../utils/api";
import { formatAsDate, formatAsTime } from "../utils/date-time";
import {
  isOpenHours,
  isDatePast,
  isTimePast,
  isTuesday,
} from "./reservationValidation";
import { today } from "../utils/date-time";

function CreateOrEditReservation() {
  const [error, setError] = useState(null);
  //sets reservation_id if it exists in params
  const { reservation_id } = useParams();

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

  useEffect(() => {
    if (reservation_id) {
      async function loadReservation() {
        const abortController = new AbortController();
        try {
          const result = await readReservation(
            reservation_id,
            abortController.signal
          );
          setFormData({
            first_name: result.first_name,
            last_name: result.last_name,
            mobile_number: result.mobile_number,
            reservation_date: formatAsDate(result.reservation_date),
            reservation_time: formatAsTime(result.reservation_time),
            people: result.people,
          });
        } catch (error) {
          console.log(error);
        }
        return () => abortController.abort();
      }

      loadReservation();
    }
  }, [reservation_id]);

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


  const handleSubmit = async (event) => {
    // creates a new reservation then renders the dashboard with useHistory
    event.preventDefault();
    const abortController = new AbortController();
    const day = today();
    const newErrors = [];
    newErrors.splice();
    //splicing newErrors this way and then setting errors to newErrors clears the errors at the beginning of every submit
    setError(() => [...newErrors]);
    //the mobile_number is reformated to remove all character that arent a number before submitting to allow inputs of xxx-xxx-xxx and xxxxxxxxx and (xxx) xxx-xxxx
    const mobileNumber = formData.mobile_number.replaceAll(/[^0-9]/g, "");
    //each validation is tested and if an error is returned it is added to newErrors to be rendered as a list of errors with the errors state
    try {
      isOpenHours(formData.reservation_time);
    } catch (err) {
      newErrors.push(err);
    }
    try {
      isDatePast(formData.reservation_date, formData.reservation_time, day);
    } catch (err) {
      newErrors.push(err);
    }
    try {
      isTimePast(formData.reservation_date, formData.reservation_time);
    } catch (err) {
      newErrors.push(err);
    }
    try {
      isTuesday(formData.reservation_date, formData.reservation_time);
    } catch (err) {
      newErrors.push(err);
    }
    //sets all validations errors into errors state
    setError(() => [...newErrors]);

    if (newErrors.length <= 0 && !reservation_id) {
      //if reservation_id doesn't exists this is a new reservations and createReservation is called
      try {
        await createReservation(
          {
            ...formData,
            mobile_number: `${mobileNumber[0]}${mobileNumber[1]}${mobileNumber[2]}-${mobileNumber[3]}${mobileNumber[4]}${mobileNumber[5]}-${mobileNumber[6]}${mobileNumber[7]}${mobileNumber[8]}${mobileNumber[9]}`,
          },
          abortController.signal
        );
        history.push(`/dashboard?date=${formatAsDate(formData.reservation_date)}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    }
    if (newErrors.length <= 0 && reservation_id) {
      //if reservation_id does exist this is an existing reservation and updateReservation is called
      try {
        await updateReservation(
          {
            ...formData,
            mobile_number: `${mobileNumber[0]}${mobileNumber[1]}${mobileNumber[2]}-${mobileNumber[3]}${mobileNumber[4]}${mobileNumber[5]}-${mobileNumber[6]}${mobileNumber[7]}${mobileNumber[8]}${mobileNumber[9]}`,
          },
          reservation_id,
          abortController.signal
        );
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    }
  };

  const handleCancel = (event) => {
    //sets formState back to default and returns to the previous page
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

export default CreateOrEditReservation;
