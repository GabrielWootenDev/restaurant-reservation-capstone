import React from "react";


function TableForm({handleChange, handleCancel, handleSubmit, formData}) {

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="table_name" className="formLabel mt-2">
          Enter Table Name:
        </label>
        <input
          name="table_name"
          id="table_name"
          type="text"
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
