import React, { useEffect, useState } from "react";
import RequestPreview from "./RequestPreview";

const OpenRequests = () => {
  const [careRequests, setCareRequests] = useState([]);
  const fetchRequests = async () => {
    const response = await fetch("/api/open-requests");
    const result = await response.json();
    setCareRequests(result.careRequests);
  };
  useEffect(() => {
    // Request open careRequests on load
    fetchRequests();
  }, []);
  return (
    <div>
      <h2>Overview of Open Care Requests</h2>
      {careRequests.length === 0 ? (
        <p>There are no care requests.</p>
      ) : (
        careRequests.map((careReq) => (
          <RequestPreview key={careReq.id} careRequest={careReq} />
        ))
      )}
    </div>
  );
};

export default OpenRequests;
