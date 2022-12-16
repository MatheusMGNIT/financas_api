const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  description: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite o Nome da Categoria",
  },

  date_launch: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Selecione uma Data Válida",
  },
  category_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione uma Categoria "));
        }
        return true;
      },
    },
    errorMessage: "Selecione um tipo válido",
  },
  classification_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione uma Classificação "));
        }
        return true;
      },
    },
    errorMessage: "Selecione uma Classificação",
  },
  value: {
    isFloat: {
      bail: true,
    },
    errorMessage: "Digite um Valor",
  },
  date_venciment: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Selecione uma Data Válida",
  },
  status_launch_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um Status"));
        }
        return true;
      },
    },
    errorMessage: "Selecione um Status",
  },
  bank_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um Banco"));
        }
        return true;
      },
    },
    errorMessage: "Selecione um Banco",
  },
});
