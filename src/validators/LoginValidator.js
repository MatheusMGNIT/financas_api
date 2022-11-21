const { checkSchema } = require("express-validator");

module.exports = checkSchema({
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
      errorMessage: "Senha precisa ter pelo menos 2 caracteres",
    },
  },
});
