import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function TableForm() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleCancel = (event) => {
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //await createReservation(formData);
    history.push(`/`);
  };

  return (
    <>
      <form  onSubmit={handleSubmit} >
        <label htmlFor="table_name" className="formLabel mt-2">
          Enter Table Name:
        </label>
        <input
          name="table_name"
          id="table_name"
          type="text"
          minLength="2"
          onChange={handleChange}
          value={formData.table_name}
          placeholder="Table Name"
          className="form-control"
          required
        />
        <label htmlFor="capacity" className="formLabel mt-2">
          Enter Capacity:
        </label>
        <input
          name="capacity"
          id="capacity"
          type="number"
          min="1"
          onChange={handleChange}
          value={formData.capacity}
          placeholder="1"
          className="form-control"
          required
        />

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

export default TableForm;
