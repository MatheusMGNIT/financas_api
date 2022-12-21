const { Model, DataTypes } = require("sequelize");

class Bank extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cod_bank: {
          type: DataTypes.STRING,
        },
        name_bank: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        type_account: {
          type: DataTypes.STRING,
        },
        agency: {
          type: DataTypes.STRING,
        },
        n_account: {
          type: DataTypes.STRING,
        },
        date_invoice: {
          type: DataTypes.DATE,
        },
        id_user: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: "bank",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Launch, {
      foreignKey: "id",
    });
  }
}

module.exports = Bank;
