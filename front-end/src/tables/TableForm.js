import React from "react";

function TableForm({ handleChange, handleCancel, handleSubmit }) {
  return (
    <>
      <div>
        <form
          className="form-group d-flex flex-column container fluid justify-content-center col-4"
          onSubmit={handleSubmit}
        >
          <label>
            <h3>Table Name:</h3>
          </label>
          <input
            className="form-control"
            name="table_name"
            id="table_name"
            type="text"
            min={2}
            onChange={handleChange}
            placeholder="Table Name"
            required
          />

          <label>
            <h3>Capacity:</h3>
          </label>
          <input
            className="form-control"
            name="capacity"
            id="capacity"
            type="number"
            min={1}
            placeholder={1}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default TableForm;
