const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  name: {
    trim: true,
    isString: true,
    notEmpty: { 
      bail: true,
    },
    errorMessage: "Insira um nome válido",
    isLength: {
      options: { min: 3 },
      errorMessage: "Usuario precisa ter pelo menos 2 caracteres",
    },
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Insira um email válido",
  },
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
  state: {
    isInt: true,
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um estado válido"));
        }
        return true;
      },
    },
  },
});
