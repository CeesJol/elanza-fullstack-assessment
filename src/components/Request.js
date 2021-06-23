import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Request = () => {
  const [request, setRequest] = useState({});
  const { id } = useParams(); // TODO i hope this is defined before the useEffect call...
  const fetchRequest = async () => {
    // Fetch all request details using the ID
    const response = await fetch(`/api/request/${id}`);
    const result = await response.json();
    setRequest(result.request);
  };
  useEffect(() => {
    // Request open requests on load
    fetchRequest();
  }, []);
  if (!request || !request.clientName) {
    // Loading
    return <div>Loading...</div>;
  }
  return <div>hello world</div>;
};

export default Request;
