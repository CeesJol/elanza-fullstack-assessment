// const { guid } = require("./util");

const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for POST requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is the in-memory database ;)
let counter = 0;

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
const requests = [
  {
    clientName: "John SOme",
    status: "OPEN",
    id: "test-id",
  },
];

app.get("/api/data", function (req, res) {
  counter++;
  return res.json({ name: "sunshine", counter: counter });
});

/**
 * Return the open requests.
 * Type: GET
 */
app.get("/api/open-requests", function (req, res) {
  // TODO: filter requests: return the 'open' ones only (simple property)
  // TODO dont return all details, just some important things for the overview page
  return res.json({ requests });
});

/**
 * Return details of a request
 * Type: GET
 */
app.get("/api/request/:id", function (req, res) {
  // TODO: filter requests: return the 'open' ones only (simple property)
  // TODO dont return all details, just some important things for the overview page
  const request = requests.filter((re) => re.id === req.params.id)[0];
  console.log("request:", request);
  // TODO handle empty request (request not found)
  return res.json({ request });
});

/**
 * Add a new request.
 * Type: POST
 */
app.post("/api/new", (req, res) => {
  console.log(req.body);

  const request = {
    ...req.body,
    status: "OPEN",
    id: guid(),
  };

  // Store request
  requests.push(request);

  // Return ok (probably a better way to do this ...)
  return res.json({ ok: "ok" });
});

app.listen(process.env.PORT || 8080);
