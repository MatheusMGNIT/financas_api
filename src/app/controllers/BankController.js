const Bank = require("../models/Bank");
const User = require("../models/User");
module.exports = {
  async getBanks(req, res) {
    const uuid = req.headers.token;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    const bank = await Bank.findAll({
      where: { id_user: user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    try {
      return res.status(200).json(bank);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar Bancos. ${err}` });
    }
  },

  async getBank(req, res) {
    const { id } = req.params;
    const uuid = req.headers.token;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    const bank = await Bank.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    try {
      return res.status(200).json(bank);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar Banco. ${err}` });
    }
  },
  async insertBank(req, res) {
    const uuid = req.headers.token;
    const {
      cod_bank,
      name_bank,
      description,
      type_account,
      agency,
      n_account,
      date_invoice,
    } = req.body;

    const user = await User.findOne({
      where: {
        token: uuid,
      },
      attributes: {
        exclude: ["password_hash", "token", "createdAt", "updatedAt"],
      },
    });

    const bank = Bank.create({
      cod_bank,
      name_bank,
      description,
      type_account,
      agency,
      n_account,
      date_invoice,
      id_user: user.id,
    });

    try {
      return res.status(200).json(bank);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao cadastrar Banco. ${err}` });
    }
  },

  async updateBank(req, res) {
    const { id } = req.params;

    const {
      cod_bank,
      name_bank,
      description,
      type_account,
      agency,
      n_account,
      date_invoice,
    } = req.body;

    let bank = await Bank.findOne({
      where: {
        id: id,
      },
    });

    if (bank != null) {
      await bank.update({
        cod_bank,
        name_bank,
        description,
        type_account,
        agency,
        n_account,
        date_invoice,
      });
      bank = await Bank.findOne({ where: { id: id } });

      try {
        return res.status(200).json(bank);
      } catch (err) {
        return res.status(400).json({ msg: `Erro ao Atualizar Banco. ${err}` });
      }
    } else {
      return res.status(400).json({ msg: `Banco não Encontrado!` });
    }
  },

  async deleteBank(req, res) {
    const { id } = req.params;

    const bank = await Bank.findOne({
      where: {
        id: id,
      },
    });

    if (bank != null) {
      await bank.destroy({ where: { id } });
      return res.status(200).json(bank);
    }
    return res.status(400).json({ msg: `Erro ao Delatar Banco. ${err}` });
  },
};
