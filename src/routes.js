const express = require("express");
const Auth = require("./middlewares/Auth");

const StateController = require("./app/controllers/StateController");
const { signupValidator } = require("./validators/AuthValidator");
const UserController = require("./app/controllers/UserController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ hello: "World" });
});
routes.get("/states", StateController.getStates);
routes.post("/signup", signupValidator, UserController.createUser);

module.exports = routes;
