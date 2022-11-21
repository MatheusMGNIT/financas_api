const express = require("express");
const Auth = require("./middlewares/Auth");
const { validationHandler } = require("./middlewares/validationHandler");

const StateController = require("./app/controllers/StateController");
const LoginValidator = require("./validators/LoginValidator");
const SignupValidator = require("./validators/SignupValidator");
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");

const routes = express.Router();

routes.get("/", (req, res) => {});
routes.get("/states", StateController.getStates);
routes.post("/signup", SignupValidator, UserController.createUser);
routes.post("/signin", LoginValidator, validationHandler, AuthController.login);

module.exports = routes;
