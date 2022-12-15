const express = require("express");
const Auth = require("./middlewares/Auth");
const { validationHandler } = require("./middlewares/validationHandler");

const StateController = require("./app/controllers/StateController");
const LoginValidator = require("./validators/LoginValidator");
const SignupValidator = require("./validators/SignupValidator");
const UserController = require("./app/controllers/UserController");
const AuthController = require("./app/controllers/AuthController");
const UserTypeController = require("./app/controllers/UserTypeController");
const UserEditValidator = require("./validators/UserEditValidator");
const BankController = require("./app/controllers/BankController");
const BankValidator = require("./validators/BankValidator");
const LaunchController = require("./app/controllers/LaunchController");
const CategoryController = require("./app/controllers/CategoryController");
const ClassificationController = require("./app/controllers/ClassificationController");
const MovementController = require("./app/controllers/MovementController");
const StatusLaunchController = require("./app/controllers/StatusLaunchController");

const routes = express.Router();

// ROUTES WITHOUT AUTH
// STATE
routes.get("/states", StateController.getStates);

//  USER TYPE
routes.get("/user-types", UserTypeController.getUserTypes);

// SIGN IN/UP
routes.post(
  "/signup",
  SignupValidator,
  validationHandler,
  UserController.createUser
);
routes.post("/signin", LoginValidator, validationHandler, AuthController.login);

// ROUTES WITH AUTH
// USERS
routes.get("/users", Auth.private, UserController.getUsers);
routes.get("/user-profile", Auth.private, UserController.getUserProfile);
routes.get("/user/:id", Auth.private, UserController.getUser);
routes.post(
  "/user",
  Auth.private,
  SignupValidator,
  validationHandler,
  UserController.createUser
);
routes.put("/user/:id", Auth.private, UserController.updateUser);
routes.delete("/user/:id", Auth.private, UserController.deleteUser);

// LAUNCHS
routes.get("/launchs", Auth.private, LaunchController.getLaunchs);

// CATEGORYS
routes.get("/categorys", Auth.private, CategoryController.getCategors);

//CLASSIFICATIONS
routes.get(
  "/classifications",
  Auth.private,
  ClassificationController.getClassifications
);
// MOVEMENTS
routes.get("/movements", Auth.private, MovementController.getMovements);

//STATUS LAUNCHS
routes.get(
  "/status-launchs",
  Auth.private,
  StatusLaunchController.getStatusLaunchs
);

//BANK
routes.get("/bank", Auth.private, BankController.getBanks);
routes.get("/bank/:id", Auth.private, BankController.getBank);
routes.post(
  "/bank",
  Auth.private,
  BankValidator,
  validationHandler,
  BankValidator,
  validationHandler,
  BankController.insertBank
);
routes.put("/bank/:id", Auth.private, BankController.updateBank);
routes.delete("/bank/:id", Auth.private, BankController.deleteBank);

module.exports = routes;
