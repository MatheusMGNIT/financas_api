module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("category", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("category");
  },
};
