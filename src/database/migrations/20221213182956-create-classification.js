module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("classification", {
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
    return queryInterface.dropTable("classification");
  },
};
