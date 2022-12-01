module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("user_type");
  },
};
