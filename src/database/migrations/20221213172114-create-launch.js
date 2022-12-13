module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("launch", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date_launch: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      movement: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      classification_id: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.FLOAT,
      },
      date_venciment: {
        type: Sequelize.DATE,
      },
      status_launch_id: {
        type: Sequelize.INTEGER,
      },
      bank_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("launch");
  },
};
