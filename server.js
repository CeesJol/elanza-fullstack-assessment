// const { guid } = require("./util");

const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for POST requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO put this in util!
// Create random ID
// Used to create a unique link for each request
// From: https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript/
let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

// TODO remove default request... that's just temporary
let careRequests = [
  {
    clientName: "John SOme",
    status: "OPEN",
    id: "test-id",
    kind: "medical",
    startDateTime: "oho",
    endDateTime: "ioj",
    extraInfo: "ij",
  },
];

/**
 * Return the care requests. Return only the requests where status equals "OPEN".
 * Type: GET
 */
app.get("/api/open-requests", function (req, res) {
  // TODO dont return all details, just some important things for the overview page
  return res.json({
    careRequests: careRequests.filter((careReq) => careReq.status === "OPEN"),
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

  // TODO handle empty careRequest (careRequest not found)
  // ...

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

  // Return ok (probably a better way to do this ...)
  return res.json({ ok: "ok" });
});

/**
 * API that allows caregiver to apply to a request.
 * Type: POST
 * TODO could just be get...? Not sure
 */
app.post("/api/apply/:id", (req, res) => {
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

  // TODO handle empty careRequest (careRequest not found)
  // ...

  // Return ok (probably a better way to do this ...)
  return res.json({ ok: "ok" });
});

app.listen(process.env.PORT || 8080);
