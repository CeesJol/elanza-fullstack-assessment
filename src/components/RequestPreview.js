import React from "react";
import { Link } from "react-router-dom";

const RequestPreview = ({ careRequest }) => {
  return (
    <div>
      <Link to={`/requests/${careRequest.id}`}>
        <h3>{careRequest.clientName}</h3>
      </Link>
    </div>
  );
};

export default RequestPreview;
