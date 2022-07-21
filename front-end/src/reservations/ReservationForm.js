import React from "react";

function ReservationForm({
  handleSubmit,
  handleChange,
  handleCancel,
  formData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name" className="formLabel mt-2">
          Enter First Name:
        </label>
        <input
          name="first_name"
          id="first_name"
          type="text"
          onChange={handleChange}
          defaultValue={formData.first_name}
          placeholder="First Name"
          className="form-control"
        />
        <label htmlFor="last_name" className="formLabel mt-2">
          Enter Last Name:
        </label>
        <input
          name="last_name"
          id="last_name"
          type="text"
          onChange={handleChange}
          defaultValue={formData.last_name}
          placeholder="Last Name"
          className="form-control"
        />
        <label htmlFor="mobile_number" className="formLabel mt-2">
          Enter Mobile Number:
        </label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="tel"
          onChange={handleChange}
          defaultValue={formData.mobile_number}
          placeholder="xxx-xxx-xxxx"
          className="form-control"
        />
        <label htmlFor="reservation_date" className="formLabel mt-2">
          Enter Reservation Date:
        </label>
        <input
          name="reservation_date"
          id="reservation_date"
          type="date"
          onChange={handleChange}
          defaultValue={formData.reservation_date}
          className="form-control"
        />
        <label htmlFor="reservation_time" className="formLabel mt-2">
          Enter Reservation Time:
        </label>
        <input
          name="reservation_time"
          id="reservation_time"
          type="time"
          onChange={handleChange}
          defaultValue={formData.reservation_time}
          className="form-control"
        />
        <label htmlFor="people" className="formLabel mt-2">
          Enter Party Size:
        </label>
        <input
          name="people"
          id="people"
          type="number"
          min={1}
          onChange={handleChange}
          defaultValue={formData.people}
          placeholder={1}
          className="form-control"
        ></input>
      </div>
      <button
        type="button"
        className="btn btn-danger mt-3 mr-1"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary mt-3 ml-1 float-right">
        Submit
      </button>
    </form>
  );
}

export default ReservationForm;
