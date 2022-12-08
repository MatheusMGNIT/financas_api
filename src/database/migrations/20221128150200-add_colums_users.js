module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "id_user_type", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("users", "last_name", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "cpf", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "cnpj", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "phone", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("users", "phone_type", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("users", "person_type", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("users", "id_user_type"),
      queryInterface.removeColumn("users", "last_name"),
      queryInterface.removeColumn("users", "cpf"),
      queryInterface.removeColumn("users", "cnpj"),
      queryInterface.removeColumn("users", "phone"),
      queryInterface.removeColumn("users", "phone_type"),
      queryInterface.removeColumn("users", "person_type"),
    ]);
  },
};
