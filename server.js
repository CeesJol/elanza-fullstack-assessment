const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Middleware for POST requests

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is the in-memory database ;)
let counter = 0;

app.get("/api/data", function (req, res) {
  counter++;
  return res.json({ name: "sunshine", counter: counter });
});

app.post("/api/new", (req, res) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  console.log(req.body);

  // Return ok (probably a better way to do this ...)
  return res.json({ ok: "ok" });
});

app.listen(process.env.PORT || 8080);
