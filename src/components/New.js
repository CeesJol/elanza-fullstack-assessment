import React, { useState } from "react";

const New = () => {
  const INITIAL_FIELDS = {
    kind: "household",
    startDateTime: "",
    endDateTime: "",
    clientName: "",
    extraInfo: "",
  };
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };
  const [status, setStatus] = useState("");
  const handleCreate = async () => {
    // Should validate input
    // ...

    // Post the request
    const data = await fetch(`/api/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const json = await data.json();
    console.log("json:", json);

    // Clean up all input
    setFields(INITIAL_FIELDS);

    // Show success message
    setStatus("Request posted successfully!");
  };
  return (
    <div>
      <h2>New Care Request</h2>
      <form>
        <label>Kind of care needed: </label>
        <select
          className="select-narrow"
          name={"kind"}
          id="kind"
          value={fields.kind}
          onChange={handleChange}
        >
          <option value="household">Household</option>
          <option value="medical">Medical</option>
        </select>

        {/* Would be better to use an NPM module for this, but
				wanted to keep it simple due to time constraints*/}
        <label>Start date and time: </label>
        <input
          type="text"
          id="startDateTime"
          name="startDateTime"
          value={fields.startDateTime}
          onChange={handleChange}
        />

        <label>End date and time: </label>
        <input
          type="text"
          id="endDateTime"
          name="endDateTime"
          value={fields.endDateTime}
          onChange={handleChange}
        />

        <label>Client name: </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={fields.clientName}
          onChange={handleChange}
        />

        <label>Extra information: </label>
        <textarea
          type="extraInfo"
          id="extraInfo"
          name="extraInfo"
          value={fields.extraInfo}
          onChange={handleChange}
        />
      </form>

      <button onClick={handleCreate}>Post request</button>

      <p>{status}</p>
    </div>
  );
};

export default New;
