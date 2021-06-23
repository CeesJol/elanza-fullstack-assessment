// const { guid } = require("./util");

const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for POST requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { guid } = require("./util");

// One example care request
let careRequests = [
  {
    clientName: "Ada Lovelace",
    status: "OPEN",
    id: "test-id",
    kind: "medical",
    startDateTime: "24/06/2021 15:00",
    endDateTime: "24/06/2021 16:00",
    extraInfo: "",
  },
];

/**
 * Return the care requests.
 * Return only the requests where status equals "OPEN".
 * Return only relevant information for each care request
 *   to draw a preview for each care request.
 * Type: GET
 */
app.get("/api/open-requests", function (req, res) {
  // Filter to return only open care requests.
  let result = careRequests.filter((careReq) => careReq.status === "OPEN");
  // Return only relevant information to draw a preview for each care request.
  result = result.map((careReq) => {
    const { clientName, startDateTime, endDateTime, id } = careReq;
    return { clientName, startDateTime, endDateTime, id };
  });
  return res.json({
    careRequests: result,
  });
});

/**
 * Return details of a request
 * Type: GET
 */
app.get("/api/request/:id", function (req, res) {
  // Find request
  const careRequest = careRequests.filter(
    (careReq) => careReq.id === req.params.id
  )[0];
  console.log("careRequest:", careRequest);

  // Handle empty careRequest (careRequest with this id does not exist)
  if (!careRequest) {
    throw new Error("Cannot find careRequest with id", req.params.id);
  }

  return res.json({ careRequest });
});

/**
 * Add a new request.
 * Type: POST
 */
app.post("/api/new", (req, res) => {
  console.log(req.body);

  const careRequest = {
    ...req.body,
    status: "OPEN",
    id: guid(),
  };

  // Store careRequest
  careRequests.push(careRequest);

  // Return ok
  res.sendStatus(200);
});

/**
 * API that allows caregiver to apply to a request.
 * Type: GET
 */
app.get("/api/apply/:id", (req, res) => {
  console.log(req.body);

  // Find request and close it
  careRequests = careRequests.map((careReq) => {
    if (careReq.id === req.params.id) {
      return {
        ...careReq,
        status: "CLOSED",
      };
    }

    return careReq;
  });

  // Return ok
  res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);
