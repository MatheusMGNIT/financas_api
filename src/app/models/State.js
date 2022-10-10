const { Sequelize, Model } = require("sequelize");

class State extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "states",
      }
    );
  }
}

module.exports = State;
