import React, { useState } from "react";

const New = () => {
  const [clientName, setClientName] = useState("");
  const handleChangeClientName = (event) => {
    setClientName(event.target.value);
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
      body: JSON.stringify({ clientName }),
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
        <label>Client Name: </label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={clientName}
          onChange={handleChangeClientName}
          // placeholder="Client Name"
        />
      </form>

      <button onClick={handleCreate}>Post request</button>
    </div>
  );
};

export default New;
