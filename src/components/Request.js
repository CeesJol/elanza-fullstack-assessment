import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Request = () => {
  const [careRequest, setCareRequest] = useState({});
  const { id } = useParams();
  const [applyStatus, setApplyStatus] = useState("");
  const [status, setStatus] = useState("LOADING");
  const fetchRequest = async () => {
    // Fetch all request details using the care request id
    try {
      const response = await fetch(`/api/request/${id}`);
      const result = await response.json();
      setCareRequest(result.careRequest);
      setStatus("SUCCESS");

      // Prevent user from applying if request is not open.
      if (result.careRequest.status !== "OPEN") {
        setApplyStatus("This request is closed. You cannot apply to it.");
      }
    } catch (e) {
      setStatus("Something went wrong loading the care request.");
      console.error(e);
    }
  };
  const handleApply = async (event) => {
    // Prevent page from updating
    event.preventDefault();

    try {
      setApplyStatus("Applying...");
      const response = await fetch(`/api/apply/${id}`);
      await response.json();
      setApplyStatus("Applied successfully! The care request has been closed.");
    } catch (e) {
      setApplyStatus("Something went wrong with applying.");
      console.error(e);
    }
  };
  useEffect(() => {
    // Request open care requests on load
    fetchRequest();
  }, []);
  if (status !== "SUCCESS") {
    // Loading, or an error occurred.
    return status;
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
        {applyStatus === "" && careRequest.status === "OPEN" && (
          <form>
            <label>You can apply to this request using this button.</label>
            <button onClick={handleApply}>Apply</button>
          </form>
        )}
        {applyStatus}
      </div>
    </div>
  );
};

export default Request;
