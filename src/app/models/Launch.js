const { Model, DataTypes } = require("sequelize");

class Launch extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        date_launch: {
          type: DataTypes.DATE,
        },
        description: {
          type: DataTypes.STRING,
        },
        movement: {
          type: DataTypes.INTEGER,
        },
        category_id: {
          type: DataTypes.INTEGER,
        },
        classification_id: {
          type: DataTypes.INTEGER,
        },
        value: {
          type: DataTypes.FLOAT,
        },
        date_venciment: {
          type: DataTypes.DATE,
        },
        status_launch_id: {
          type: DataTypes.INTEGER,
        },
        bank_id: {
          type: DataTypes.INTEGER,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        tableName: "launch",
      }
    );
  }
}

module.exports = Launch;