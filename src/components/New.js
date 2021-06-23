import React, { useState } from "react";

const New = () => {
  const [kind, setKind] = useState("household");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [status, setStatus] = useState("");
  const handleChangeKind = (event) => {
    setKind(event.target.value);
  };
  const handleChangeStartDateTime = (event) => {
    setStartDateTime(event.target.value);
  };
  const handleChangeEndDateTime = (event) => {
    setEndDateTime(event.target.value);
  };
  const handleChangeClientName = (event) => {
    setClientName(event.target.value);
  };
  const handleChangeExtraInfo = (event) => {
    setExtraInfo(event.target.value);
  };
  const handleCreate = async () => {
    // Should validate input
    // ...

    // Post the request
    const careRequest = {
      kind,
      startDateTime,
      endDateTime,
      clientName,
      extraInfo,
    };
    const data = await fetch(`/api/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(careRequest),
    });
    const json = await data.json();
    console.log("json:", json);

    // Clean up all input
    setKind("household");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      (input) => (input.value = "")
    );

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
          id={kind}
          value={kind}
          onChange={handleChangeKind}
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
          value={startDateTime}
          onChange={handleChangeStartDateTime}
        />

        <label>End date and time: </label>
        <input
          type="text"
          id="endDateTime"
          name="endDateTime"
          value={endDateTime}
          onChange={handleChangeEndDateTime}
        />

        <label>Client name: </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={clientName}
          onChange={handleChangeClientName}
        />

        <label>Extra information: </label>
        <textarea
          type="extraInfo"
          id="extraInfo"
          name="extraInfo"
          value={extraInfo}
          onChange={handleChangeExtraInfo}
        />
      </form>

      <button onClick={handleCreate}>Post request</button>

      <p>{status}</p>
    </div>
  );
};

export default New;
