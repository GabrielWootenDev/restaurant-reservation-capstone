import React from "react";

function SearchForm({submitSearch, handleChange}) {

  return (
    <>
      <form className="form-group d-flex flex-column container-fluid justify-content-center col col-md-6" onSubmit={submitSearch}>
        <div className="m-2">
          <label htmlFor="mobile_search">
            <h2>Search</h2>
          </label>
          <input
            className="form-control"
            name="mobile_number"
            id="mobile_number"
            type="tel"
            min={10}
            onChange={handleChange}
            placeholder="Enter a customer's phone number"
            required
          />
        </div>
				<div className="text-center">
				<button type="submit" className="btn btn-success m-2 w-25">
          Find
        </button>
				</div>
      </form>
    </>
  );
}

export default SearchForm;
