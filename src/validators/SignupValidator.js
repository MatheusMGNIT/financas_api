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
  // password: {
  //   isLength: {
  //     options: {
  //       min: 2,
  //     },
  //   },
  //   errorMessage: "Senha precisa ter pelo menos 2 caracteres",
  // },
  // state: {
  //   notEmpty: true,
  //   errorMessage: "Estado não Selecionado",
  // },
  password: {
    notEmpty: {
      bail: true,
    },
    errorMessage: 'Insira uma senha válida.',
    isString: true,
    isLength: {
      options: [{ min: 5 }],
      errorMessage: 'Digite uma senha que contenha pelo menos 5 caracteres',
    },
  },
  confirmPassword: {
    notEmpty: {
      bail: true,
    },
    isString: true,
    errorMessage: 'Insira uma senha válida.',
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject(new Error('As senhas não coincidem'));
        }
        return true;
      },
    },
  },
});
