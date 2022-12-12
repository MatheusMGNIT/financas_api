const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/User");
const State = require("../app/models/State");
const UserType = require("../app/models/UserType");
const Bank = require("../app/models/Bank");

const connection = new Sequelize(dbConfig);

User.init(connection);
State.init(connection);
UserType.init(connection);
Bank.init(connection);

module.exports = connection;
