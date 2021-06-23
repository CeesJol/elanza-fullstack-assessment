import React, { useEffect, useState } from "react";

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
      {requests.map((request) => (
        <p>{request.clientName}</p>
      ))}
    </div>
  );
};

export default OpenRequests;
