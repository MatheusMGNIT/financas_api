const { Model, DataTypes } = require("sequelize");

class UserType extends Model {
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
        tableName: "user_type",
      }
    );
  }
}

module.exports = UserType;
