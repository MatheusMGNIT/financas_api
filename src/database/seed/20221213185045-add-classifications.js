module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("classification", [
      {
        id: 1,
        description: "Despesa Fixa",
      },
      {
        id: 2,
        description: "Despesa Variável",
      },
      {
        id: 3,
        description: "Receita Fixa",
      },
      {
        id: 4,
        description: "Receita Variável",
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete(
      "classification",
      { id: [1, 2, 3, 4] },
      {}
    );
  },
};
