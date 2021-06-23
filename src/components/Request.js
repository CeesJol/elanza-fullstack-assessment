import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Request = () => {
  const [careRequest, setCareRequest] = useState({});
  const { id } = useParams(); // TODO i hope this is defined before the useEffect call...
  const fetchRequest = async () => {
    // Fetch all request details using the ID
    const response = await fetch(`/api/request/${id}`);
    const result = await response.json();
    setCareRequest(result.careRequest);
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
      <h2>Request details</h2>
      <p>Client name: {careRequest.clientName}</p>
    </div>
  );
};

export default Request;
