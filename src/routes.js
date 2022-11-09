const express = require("express");
const Auth = require("./middlewares/Auth");

const StateController = require("./app/controllers/StateController");
const { signupValidator } = require("./validators/AuthValidator");
const { signinValidator } = require("./validators/AuthValidator");
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");

const routes = express.Router();

routes.get("/", (req, res) => {});
routes.get("/states", StateController.getStates);
routes.post("/signup", signupValidator, UserController.createUser);
routes.post("/signin", signinValidator, AuthController.login);

module.exports = routes;
