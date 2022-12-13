module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("status_launch", {
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
    return queryInterface.dropTable("status_launch");
  },
};
