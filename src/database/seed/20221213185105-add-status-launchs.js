module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("status_launch", [
      {
        id: 1,
        description: "Aberto",
      },
      {
        id: 2,
        description: "Pedente",
      },
      {
        id: 3,
        description: "Pago",
      },
      {
        id: 4,
        description: "Atrasado",
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("status_launch", { id: [1, 2, 3, 4] }, {});
  },
};
