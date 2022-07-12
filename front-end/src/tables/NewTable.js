import React, { useState } from "react";
import { useHistory } from "react-router";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const [error, setError] = useState([]);
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
    try {
    await createTable(formData);
    history.push(`/`);
    } catch (err) {
      setError(() => [err])
    }
  };

  return (
    <>
      <h3>Create a table</h3>
      <ErrorAlert error={error}/>
			<TableForm handleChange={handleChange} handleCancel={handleCancel} handleSubmit={handleSubmit} formData={formData}/>
    </>
  );
}

export default NewTable;
