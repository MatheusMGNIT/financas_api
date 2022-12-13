const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/User");
const State = require("../app/models/State");
const UserType = require("../app/models/UserType");
const Bank = require("../app/models/Bank");
const Launch = require("../app/models/Launch");
const Category = require("../app/models/Category");
const Classification = require("../app/models/Classification");
const Movement = require("../app/models/Movement");
const StatusLaunch = require("../app/models/StatusLaunch");

const connection = new Sequelize(dbConfig);

User.init(connection);
State.init(connection);
UserType.init(connection);
Bank.init(connection);
Launch.init(connection);
Category.init(connection);
Classification.init(connection);
Movement.init(connection);
StatusLaunch.init(connection);

module.exports = connection;
