const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const UserType = require("../models/UserType");

module.exports = {
  getUsers: async (req, res) => {
    const users = await User.findAll({
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    try {
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ msg: ` Usuários não encontrados .${err}` });
    }
  },

  getUserProfile: async (req, res) => {
    const { uuid } = req.headers.token;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "createdAt", "updatedAt"],
      },
    });

    if (user === null) {
      return res.status(200).json({ msg: `Usuário não encontrado.` });
    }

    try {
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ msg: `Usuário não encontrado. ${err}` });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    if (user === null) {
      return res.status(200).json({ msg: `Usuário não encontrado.` });
    }

    try {
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ msg: `Usuário não encontrado. ${err}` });
    }
  },
  
  createUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.mapped() });
      // return;
    }

    const {
      id_user_type,
      name,
      last_name,
      email,
      state,
      password,
      confirmPassword,
      cpf,
      cnpj,
      phone_type,
      phone,
      person_type,
    } = req.body;
    const data = matchedData(req);

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      res.status(400).json({
        error: { email: { mgs: "E-mail já existe" } },
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = User.create({
      name: name,
      last_name: last_name,
      email: email,
      password_hash: passwordHash,
      token,
      state: state,
      id_user_type,
      cpf: cpf,
      cnpj: cnpj,
      phone: phone,
      phone_type: phone_type,
      person_type: person_type,
    });

    (await newUser).save;

    res.status(200).json({ token });
  },

  updateUser: async (req, res) => {
    const { id } = req.params;

    const {
      id_user_type,
      name,
      last_name,
      email,
      state,
      cpf,
      cnpj,
      phone_type,
      phone,
      person_type,
    } = req.body;

    let user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (user != null) {
      // SE FOR ADMIN
      await user.update({
        id_user_type,
        name,
        last_name,
        email,
        state,
        cpf,
        cnpj,
        phone_type,
        phone,
        person_type,
      });
      user = await User.findOne({ where: { id: id } });
      return res.status(200).json({
        user,
      });
    }
    return res.status(404).json({ msg: "Usuário nao encontrado." });
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (user != null) {
      await user.destroy({
        where: { id },
        include: [{ model: UserType }],
        attributes: { exclude: ["password_hash"] },
      });
      return res.status(200).json(user);
    }
    return res.status(404).json({ msg: "Usuário nao encontrado." });
  },
};
