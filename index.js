const express = require("express");
const readme = require("readmeio");

const app = express();

const port = process.env.PORT || 8000;

require("dotenv").config();

if (!process.env.README_API_KEY) {
  console.error("Missing `README_API_KEY` enviornment variable");
  process.exit(1);
}

app.use((req, res, next) => {
  readme.log(process.env.README_API_KEY, req, res, {
    apiKey: "owlbert-api-key",
    label: "Owlbert",
    email: "owlbert@example.com",
  });
  next();
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(
    "Example app listening at http://%s:%s",
    server.address().address,
    port
  );
});
