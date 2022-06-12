import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//visual api error notifaction to do (check dashboard implementation)

function NewReservation() {
  const history = useHistory();
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservaton_time: "",
    people: null,
  };
  const [formData, setFormData] = useState(initialFormState);

  //when anything is input into either field the value is stored in formData state and that input value changes to the same as the form with the based on the target key.
  const handleChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
    console.log(formData);
  };

  //handleSubmit this will create a new reservation then render the dashboard with useHistory,

  const handleSubmit = async (event) => {
    event.preventDefault();
    //insert api call function here for update reservations
    history.push(`/reservations`);
    history.go(0);
  };

  const handleCancel = (event) => {
    history.goBack();
  };

  return (
    <>
      <h3 className="">Create a reservation</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name" className="formLabel mt-2">
          Enter First Name:
        </label>
        <input
          name="first_name"
          id="first_name"
          type="text"
          onChange={handleChange}
          value={formData.first_name}
          placeholder="First Name"
          className="form-control"
          required
        />
        <label htmlFor="last_name" className="formLabel mt-2">
          Enter Last Name:
        </label>
        <input
          name="last_name"
          id="last_name"
          type="text"
          onChange={handleChange}
          value={formData.last_name}
          placeholder="Last Name"
          className="form-control"
          required
        />
        <label htmlFor="mobile_number" className="formLabel mt-2">
          Enter Mobile Number:
        </label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="tel"
          onChange={handleChange}
          value={formData.mobile_number}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="xxx-xxx-xxxx"
          className="form-control"
          required
        />
        <label htmlFor="reservation_date" className="formLabel mt-2">
          Enter Reservation Date:
        </label>
        <input
          name="reservation_date"
          id="reservation_date"
          type="date"
          onChange={handleChange}
          value={formData.reservation_date}
          className="form-control"
          required
        />
        <label htmlFor="reservaton_time" className="formLabel mt-2">
          Enter Reservation Time:
        </label>
        <input
          name="reservaton_time"
          id="reservaton_time"
          type="time"
          onChange={handleChange}
          value={formData.reservaton_time}
          className="form-control"
          required
        />
        <label htmlFor="people" className="formLabel mt-2">
          Enter Party Size:
        </label>
        <input
          name="people"
          id="people"
          type="number"
          min="1"
          onChange={handleChange}
          value={formData.people}
          placeholder="1"
          className="form-control"
          required
        ></input>
        <button
          className="btn btn-danger mt-3 mr-1"
          type="reset"
          onClick={() => handleCancel()}
        >
          {" "}
          Cancel{" "}
        </button>
        <button className="btn btn-primary mt-3 ml-1 float-right" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default NewReservation;
