module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("movement", [
      {
        id: 1,
        description: "Receita",
      },
      {
        id: 2,
        description: "Despesa",
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("movement", { id: [1, 2] }, {});
  },
};
