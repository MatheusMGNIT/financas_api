const { Model, DataTypes } = require("sequelize");

class Classification extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: "classification",
      }
    );
  }
}

module.exports = Classification;
