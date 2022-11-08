const express = require("express");
const routes = require("./routes");

require("./database/index");

const app = express();

app.use(express.json());
app.use(routes);

const port = 3001;

app.listen(port, () => {
  console.log(`Running server on localhost:${port}...`);
});
