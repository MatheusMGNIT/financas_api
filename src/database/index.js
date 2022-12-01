const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/User");
const State = require("../app/models/State");

const connection = new Sequelize(dbConfig);

User.init(connection);
State.init(connection);

module.exports = connection;
