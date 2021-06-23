import React, { useState } from "react";

const New = () => {
  const [kind, setKind] = useState("household");
  const [clientName, setClientName] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const handleChangeKind = (event) => {
    setKind(event.target.value);
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
    const data = await fetch(`/api/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kind, clientName, extraInfo }),
    });
    const json = await data.json();
    console.log("json:", json);

    // If success, clean up (clear form etc.)
    // ...
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
    </div>
  );
};

export default New;
