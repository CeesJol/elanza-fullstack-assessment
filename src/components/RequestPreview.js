import React from "react";
import { Link } from "react-router-dom";

/**
 * Care request preview component.
 * Shows a small preview of the care request on the home page.
 */
const RequestPreview = ({ careRequest }) => {
  return (
    <div className="request-preview">
      <h3>Client name: {careRequest.clientName}</h3>
      <p>Start date and time: {careRequest.startDateTime}</p>
      <p>End date and time: {careRequest.endDateTime}</p>

      <Link to={`/requests/${careRequest.id}`}>View details or apply</Link>
    </div>
  );
};

export default RequestPreview;
