import React, { useEffect, useState } from "react";
import RequestPreview from "./RequestPreview";

const OpenRequests = () => {
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    const response = await fetch("/api/open-requests");
    const result = await response.json();
    setRequests(result.requests);
  };
  useEffect(() => {
    // Request open requests on load
    fetchRequests();
  });
  return (
    <div>
      <h2>Overview of Open Requests</h2>
      {requests.length === 0 ? (
        <p>There are no requests.</p>
      ) : (
        requests.map((request) => <RequestPreview request={request} />)
      )}
    </div>
  );
};

export default OpenRequests;
