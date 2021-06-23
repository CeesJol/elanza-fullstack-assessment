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
    id: guid(),
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
  return res.json({ requests });
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
