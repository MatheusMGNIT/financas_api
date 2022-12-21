module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("launch", "id_user", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("bank", "id_user", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("category", "id_user", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("launch", "id_user"),
      queryInterface.removeColumn("bank", "id_user"),
      queryInterface.removeColumn("category", "id_user"),
    ]);
  },
};
