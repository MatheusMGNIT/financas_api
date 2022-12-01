const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Insira um email válido",
  },
  password: {
    isString: true,
    notEmpty: { 
      bail: true
    },
    isLength: {
      options: {
        min: 2,
      },
    },
    errorMessage: "Insira uma senha válida",
  },
});
