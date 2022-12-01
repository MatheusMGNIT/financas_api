const State = require("../models/State");

module.exports = {
  async getStates(req, res) {
    const state = await State.findAll({ attributes: ["id", "name"] });

    try {
      return res.status(200).json(state);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao carregar dados. ${err}` });
    }
  },

  async insertState(req, res) {
    const { name } = req.body;
    const state = await State.create({ name });

    try {
      return res.status(200).json(state);
    } catch (err) {
      return res.status(400).json({ msg: `Erro ao fazer cadastro. ${err}` });
    }
  },
};
