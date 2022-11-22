const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  name: {
    trim: true,
    isLength: {
      options: { min: 2 },
    },
    errorMessage: "Nome precisa ter pelo menos 2 caracteres",
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "E-mail Inválido",
  },
  password: {
    isLength: {
      options: {
        min: 2,
      },
    },
    errorMessage: "Senha precisa ter pelo menos 2 caracteres",
  },
  state: {
    isInt: true,
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um Estado"));
        }
        return true;
      },
    },
  },
});
