const readme = require("readmeio");

require("dotenv").config();

const app = express();

if (!process.env.README_API_KEY) {
  console.error("Missing `README_API_KEY` enviorment variable");
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
