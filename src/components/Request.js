import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Request = () => {
  const [careRequest, setCareRequest] = useState({});
  const { id } = useParams(); // TODO i hope this is defined before the useEffect call...
  const [applyState, setApplyState] = useState("");
  const fetchRequest = async () => {
    // Fetch all request details using the ID
    const response = await fetch(`/api/request/${id}`);
    const result = await response.json();
    setCareRequest(result.careRequest);
  };
  const handleApply = async () => {
    setApplyState("LOADING");
    const data = await fetch(`/api/apply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const json = await data.json();
    console.log("json:", json);
    setApplyState("SUCCESS");
  };
  useEffect(() => {
    // Request open care requests on load
    fetchRequest();
  }, []);
  if (!careRequest || !careRequest.clientName) {
    // Loading
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="request-info">
        <h2>Request details</h2>
        <p>
          Kind of care needed:
          <br /> <b>{careRequest.kind}</b>
        </p>
        <p>
          Start date and time: <br />
          <b>{careRequest.startDateTime}</b>
        </p>
        <p>
          End date and time: <br />
          <b>{careRequest.endDateTime}</b>
        </p>
        <p>
          Client name: <br />
          <b>{careRequest.clientName}</b>
        </p>
        <p>
          Status: <br />
          <b>{careRequest.status}</b>
        </p>
      </div>

      <hr />

      <div className="actions">
        <h2>Apply</h2>
        {applyState === "" && careRequest.status === "OPEN" && (
          <form>
            <label>You can apply to this request using this button.</label>
            <button onClick={handleApply}>Apply</button>
          </form>
        )}
        {applyState === "" && careRequest.status === "CLOSED" && (
          <p>This request is closed. You cannot apply to it.</p>
        )}
        {applyState === "LOADING" && <p>Applying...</p>}
        {applyState === "SUCCESS" && (
          <p>Applied successfully! The care request has been closed.</p>
        )}
      </div>
    </div>
  );
};

export default Request;
