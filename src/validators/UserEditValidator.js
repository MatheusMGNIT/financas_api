const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  id_user_type: {
    optional: true,
    isInt: true,
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um Tipo válido "));
        }
        return true;
      },
    },
    errorMessage: "Selecione um tipo válido",
  },
  name: {
    optional: true,
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
    optional: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Insira um email válido",
    custom: {
      options: async (value, { req }) => {
        if (
          (await User.findOne({
            where: {
              email: req.body.email,
            },
          })) !== null
        ) {
          return Promise.reject(new Error("Esse email já está cadastrado."));
        }
        return true;
      },
    },
  },

  state: {
    optional: true,
    isInt: true,
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um Estado válido"));
        }
        return true;
      },
    },
    errorMessage: "Selecione um Estado válido",
  },
  phone: {
    optional: true,
    notEmpty: {
      bail: true,
    },
    isString: true,
    errorMessage: "Digite um Telefone",
  },
  phone_type: {
    optional: true,
    isInt: true,
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(new Error("Selecione um Tipo válido "));
        }
        return true;
      },
    },
    errorMessage: "Selecione um tipo válido",
  },
  person_type: {
    optional: true,
    isInt: true,
    custom: {
      options: async (value) => {
        if (value == -1) {
          return Promise.reject(
            new Error("Selecione um Tipo de Pessoa válido ")
          );
        }
        return true;
      },
    },
    errorMessage: "Selecione um tipo de Pessoa válido",
  },
  cpf: {
    isString: {
      bail: true,
    },
    errorMessage: "Digite um CPF válido",
    custom: {
      options: async (value, { req }) => {
        if (
          (await User.findOne({
            where: {
              cpf: req.body.cpf,
            },
          })) !== null
        ) {
          return Promise.reject(new Error("Esse CPF já está cadastrado."));
        }
        return true;
      },
      errorMessage: "Esse CPF já está cadastrado.",
    },
    optional: { options: { nullable: true, checkFalsy: true } },
  },
  cnpj: {
    isString: {
      bail: true,
    },
    errorMessage: "Digite um CNPJválido",
    custom: {
      options: async (value, { req }) => {
        if (
          (await User.findOne({
            where: {
              cnpj: req.body.cnpj,
            },
          })) !== null
        ) {
          return Promise.reject(new Error("Esse CNPJ já está cadastrado."));
        }
        return true;
      },
      errorMessage: "Esse CNPJ já está cadastrado.",
    },
    optional: { options: { nullable: true, checkFalsy: true } },
  },
});
