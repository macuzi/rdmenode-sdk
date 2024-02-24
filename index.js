const express = require("express");
const readme = require("readmeio");

const app = express();
const port = process.env.PORT || 8000;
const fortune = require("./lib/fortune");

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

app.get("/", (req, res) => {
  res.json({ message: " hello world" });
});

app.post("/", express.json(), (req, res) => {
  res.status(200).send();
});

app.get("/page/fortune", (req, res) => {
  res.json({ fortune: fortune.getFortune() });
});

app.post(
  "/webhook",
  express.json({ type: "application/json" }),
  () => (req, res) => {
    const signature = req.headers["readme-signature"];
    console.log(signature);
    try {
      readme.verifyWebhook(req.body, signature, process.env.SECRET);
    } catch (e) {
      return res.status(401).json({ error: e.message });
    }

    return res.json({
      petsore_auth: "default-key",
      basic_auth: { user: "user", pass: "pass" },
    });
  }
);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(
    "Example app listening at http://%s:%s",
    server.address().address,
    port
  );
});
