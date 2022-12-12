const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  name_bank: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite o Nome do Banco",
  },
  type_account: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Selecione Tipo de Conta",
  },
  agency: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite o Nº da Agencia",
  },
  n_account: {
    notEmpty: {
      bail: true,
    },
    errorMessage: "Digite o Nº da Conta",
  },
});
