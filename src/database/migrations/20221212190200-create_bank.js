module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("bank", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cod_bank: {
        type: Sequelize.STRING,
      },
      name_bank: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      type_account: {
        type: Sequelize.STRING,
      },

      agency: {
        type: Sequelize.STRING,
      },
      n_account: {
        type: Sequelize.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("bank");
  },
};
