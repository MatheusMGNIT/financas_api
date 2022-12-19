const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  description: {
    isString: {
      bail: true,
    },
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite um nome válido",
  },

  date_launch: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Selecione uma data válida",
  },

  category_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione uma Categoria"));
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
    errorMessage: "Selecione uma classificação válida",
  },

  value: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite um valor válido",
  },

  date_venciment: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Selecione uma data válida",
  },

  status_launch_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um status válido"));
        }
        return true;
      },
    },
    errorMessage: "Selecione um status válido",
  },

  bank_id: {
    isInt: {
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um banco válido"));
        }
        return true;
      },
    },
    errorMessage: "Selecione um banco válido",
  },
});
