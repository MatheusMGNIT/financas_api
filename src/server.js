const express = require("express");
const routes = require("./routes");
const cors = require("cors");

require("./database/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3001;

app.listen(port, () => {
  console.log(`Running server on localhost:${port}...`);
});
