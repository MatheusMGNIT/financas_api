const Bank = require("../models/Bank");
module.exports = {
  async getBanks(req, res) {
    const bank = await Bank.findAll({
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
    const {
      cod_bank,
      name_bank,
      description,
      type_account,
      agency,
      n_account,
    } = req.body;

    const bank = Bank.create({
      cod_bank,
      name_bank,
      description,
      type_account,
      agency,
      n_account,
    });

    try {
      return res.status(200).json(bank);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao cadastrar Banco. ${err}` });
    }
  },
};
