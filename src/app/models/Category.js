const { Model, DataTypes } = require("sequelize");

class Category extends Model {
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
        id_user: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: "category",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Launch, {
      foreignKey: "id",
    });
  }
}

module.exports = Category;
