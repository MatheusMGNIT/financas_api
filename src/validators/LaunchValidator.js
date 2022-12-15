const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  description: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite o Nome da Categoria",
  },
});
