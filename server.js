const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for POST requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is the in-memory database ;)
let counter = 0;

const requests = [];

app.get("/api/data", function (req, res) {
  counter++;
  return res.json({ name: "sunshine", counter: counter });
});

/**
 * Return the open requests.
 * Type: GET
 */
app.get("/api/open-requests", function (req, res) {
  return res.json({ requests });
});

/**
 * Add a new request.
 * Type: POST
 */
app.post("/api/new", (req, res) => {
  console.log(req.body);

  // Store request
  requests.push(req.body);

  // Return ok (probably a better way to do this ...)
  return res.json({ ok: "ok" });
});

app.listen(process.env.PORT || 8080);
