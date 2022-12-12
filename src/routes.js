const express = require("express");
const Auth = require("./middlewares/Auth");
const { validationHandler } = require("./middlewares/validationHandler");

const StateController = require("./app/controllers/StateController");
const LoginValidator = require("./validators/LoginValidator");
const SignupValidator = require("./validators/SignupValidator");
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");
const UserTypeController = require("./app/controllers/UserTypeController");
const BankController = require("./app/controllers/BankController");
const BankValidator = require("./validators/BankValidator");

const routes = express.Router();

// ROUTES WITHOUT AUTH
routes.get("/states", StateController.getStates);
routes.get("/user-types", UserTypeController.getUserTypes);
routes.post(
  "/signup",
  SignupValidator,
  validationHandler,
  UserController.createUser
);
routes.post("/signin", LoginValidator, validationHandler, AuthController.login);

// ROUTES WITH AUTH

routes.get("/users", Auth.private, UserController.getUsers);
routes.get("/user/:id", Auth.private, UserController.getUser);

//BANK
routes.get("/bank", Auth.private, BankController.getBanks);
routes.get("/bank/:id", Auth.private, BankController.getBank);

routes.post(
  "/bank",
  Auth.private,
  BankValidator,
  validationHandler,
  BankController.insertBank
);

module.exports = routes;
