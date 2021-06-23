import React, { useEffect, useState } from "react";
import RequestPreview from "./RequestPreview";

const OpenRequests = () => {
  const [careRequests, setCareRequests] = useState([]);
  const [status, setStatus] = useState("Loading care requests...");
  const fetchRequests = async () => {
    try {
      // Fetch care requests
      const response = await fetch("/api/open-requests");
      const result = await response.json();
      setCareRequests(result.careRequests);

      if (result.careRequests.length > 0) {
        setStatus("");
      } else {
        setStatus("There are no care requests yet.");
      }
    } catch (e) {
      setStatus("Something went wrong loading the care requests.");
      console.error(e);
    }
  };
  useEffect(() => {
    // Request open care requests on load
    fetchRequests();
  }, []);
  return (
    <div>
      <h2>Overview of Open Care Requests</h2>
      {status}
      {careRequests.map((careReq) => (
        <RequestPreview key={careReq.id} careRequest={careReq} />
      ))}
    </div>
  );
};

export default OpenRequests;
