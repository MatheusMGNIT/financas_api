module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("user_type", [
      {
        id: 1,
        description: "Admin",
      },
      {
        id: 2,
        description: "User",
      },
      {
        id: 3,
        description: "Client",
      },
      {
        id: 4,
        description: "Manager",
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("user_type", { id: [1, 2, 3, 4] }, {});
  },
};
