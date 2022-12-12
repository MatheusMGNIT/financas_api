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

const routes = express.Router();

// ROUTES WITHOUT AUTH
// STATE
routes.get("/states", StateController.getStates);

//  USER TYPE
routes.get("/user-types", UserTypeController.getUserTypes);

// SIGN IN/UP
routes.post( "/signup", SignupValidator, validationHandler, UserController.createUser);
routes.post("/signin", LoginValidator, validationHandler, AuthController.login);

// ROUTES WITH AUTH
// USERS
routes.get("/users", Auth.private, UserController.getUsers);
routes.get("/user/:id", Auth.private, UserController.getUser);
routes.post("/user", Auth.private, SignupValidator, validationHandler, UserController.createUser);
routes.put("/user/:id", Auth.private, UserController.updateUser);
routes.delete("/user/:id", Auth.private, UserController.deleteUser);

module.exports = routes;
