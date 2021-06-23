import React from "react";
import { Link } from "react-router-dom";

const RequestPreview = ({ request }) => {
  return (
    <div>
      <Link to="/new">
        <h3>{request.clientName}</h3>
      </Link>
    </div>
  );
};

export default RequestPreview;
